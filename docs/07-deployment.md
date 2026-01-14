# Deployment Architecture

## Cloud Infrastructure (Kubernetes)

### Cluster Configuration

\`\`\`yaml
# k8s/cluster-config.yaml

apiVersion: v1
kind: Namespace
metadata:
  name: search-engine

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: search-config
  namespace: search-engine
data:
  ELASTICSEARCH_URL: "http://elasticsearch:9200"
  REDIS_HOST: "redis-cluster"
  REDIS_PORT: "6379"
  KAFKA_BROKERS: "kafka-0:9092,kafka-1:9092,kafka-2:9092"
  POSTGRES_HOST: "postgres-primary"
  POSTGRES_PORT: "5432"
  LOG_LEVEL: "info"
\`\`\`

### Crawler Deployment

\`\`\`yaml
# k8s/crawler-deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: crawler
  namespace: search-engine
spec:
  replicas: 1000
  selector:
    matchLabels:
      app: crawler
  template:
    metadata:
      labels:
        app: crawler
    spec:
      containers:
      - name: crawler
        image: search-engine/crawler:latest
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        env:
        - name: WORKER_ID
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: KAFKA_BROKERS
          valueFrom:
            configMapKeyRef:
              name: search-config
              key: KAFKA_BROKERS
        - name: REDIS_HOST
          valueFrom:
            configMapKeyRef:
              name: search-config
              key: REDIS_HOST
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - crawler
              topologyKey: kubernetes.io/hostname

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: crawler-hpa
  namespace: search-engine
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: crawler
  minReplicas: 500
  maxReplicas: 2000
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Pods
    pods:
      metric:
        name: crawler_queue_depth
      target:
        type: AverageValue
        averageValue: "1000"
\`\`\`

### Query Service Deployment

\`\`\`yaml
# k8s/query-service-deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: query-service
  namespace: search-engine
spec:
  replicas: 50
  selector:
    matchLabels:
      app: query-service
  template:
    metadata:
      labels:
        app: query-service
    spec:
      containers:
      - name: query-service
        image: search-engine/query-service:latest
        ports:
        - containerPort: 8080
          name: http
        - containerPort: 9090
          name: metrics
        resources:
          requests:
            memory: "1Gi"
            cpu: "1000m"
          limits:
            memory: "2Gi"
            cpu: "2000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5
        env:
        - name: ELASTICSEARCH_URL
          valueFrom:
            configMapKeyRef:
              name: search-config
              key: ELASTICSEARCH_URL
        - name: REDIS_HOST
          valueFrom:
            configMapKeyRef:
              name: search-config
              key: REDIS_HOST

---
apiVersion: v1
kind: Service
metadata:
  name: query-service
  namespace: search-engine
spec:
  selector:
    app: query-service
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: query-service-hpa
  namespace: search-engine
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: query-service
  minReplicas: 20
  maxReplicas: 200
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 60
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "1000"
\`\`\`

### Elasticsearch StatefulSet

\`\`\`yaml
# k8s/elasticsearch-statefulset.yaml

apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: elasticsearch
  namespace: search-engine
spec:
  serviceName: elasticsearch
  replicas: 21  # For 64 shards with 3x replication
  selector:
    matchLabels:
      app: elasticsearch
  template:
    metadata:
      labels:
        app: elasticsearch
    spec:
      containers:
      - name: elasticsearch
        image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
        ports:
        - containerPort: 9200
          name: http
        - containerPort: 9300
          name: transport
        resources:
          requests:
            memory: "16Gi"
            cpu: "4000m"
          limits:
            memory: "32Gi"
            cpu: "8000m"
        env:
        - name: cluster.name
          value: "search-cluster"
        - name: node.name
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: discovery.seed_hosts
          value: "elasticsearch-0,elasticsearch-1,elasticsearch-2"
        - name: cluster.initial_master_nodes
          value: "elasticsearch-0,elasticsearch-1,elasticsearch-2"
        - name: ES_JAVA_OPTS
          value: "-Xms16g -Xmx16g"
        volumeMounts:
        - name: data
          mountPath: /usr/share/elasticsearch/data
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: "fast-ssd"
      resources:
        requests:
          storage: 2Ti

---
apiVersion: v1
kind: Service
metadata:
  name: elasticsearch
  namespace: search-engine
spec:
  selector:
    app: elasticsearch
  clusterIP: None
  ports:
  - port: 9200
    name: http
  - port: 9300
    name: transport
\`\`\`

### Ingress Configuration

\`\`\`yaml
# k8s/ingress.yaml

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: search-engine-ingress
  namespace: search-engine
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/rate-limit: "1000"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - api.search-engine.com
    secretName: search-engine-tls
  rules:
  - host: api.search-engine.com
    http:
      paths:
      - path: /api/v1/search
        pathType: Prefix
        backend:
          service:
            name: query-service
            port:
              number: 80
      - path: /api/v1/admin
        pathType: Prefix
        backend:
          service:
            name: admin-service
            port:
              number: 80
\`\`\`

## Multi-Region Deployment

### Geographic Distribution

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Global Load Balancer                  │
│                    (GeoDNS / Cloudflare)                │
└──────────────┬──────────────────────────────────────────┘
               │
     ┌─────────┴─────────┬──────────────┬─────────────┐
     │                   │              │             │
     ▼                   ▼              ▼             ▼
┌─────────┐        ┌─────────┐    ┌─────────┐  ┌─────────┐
│ US-East │        │ US-West │    │ EU-West │  │ AP-East │
│ (Primary│        │         │    │         │  │         │
│  Region)│        │         │    │         │  │         │
└─────────┘        └─────────┘    └─────────┘  └─────────┘
\`\`\`

**Replication Strategy:**
- Full index replication in each region
- Cross-region sync for crawler queue (eventual consistency)
- Read-local, write-global for index updates

## Monitoring Setup

\`\`\`yaml
# k8s/monitoring.yaml

apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: search-engine
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    
    scrape_configs:
    - job_name: 'query-service'
      kubernetes_sd_configs:
      - role: pod
        namespaces:
          names:
          - search-engine
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app]
        action: keep
        regex: query-service
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: instance
    
    - job_name: 'crawler'
      kubernetes_sd_configs:
      - role: pod
        namespaces:
          names:
          - search-engine
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app]
        action: keep
        regex: crawler
    
    - job_name: 'elasticsearch'
      static_configs:
      - targets:
        - elasticsearch:9200

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: search-engine
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      containers:
      - name: prometheus
        image: prom/prometheus:latest
        ports:
        - containerPort: 9090
        volumeMounts:
        - name: config
          mountPath: /etc/prometheus
        - name: data
          mountPath: /prometheus
      volumes:
      - name: config
        configMap:
          name: prometheus-config
      - name: data
        emptyDir: {}
\`\`\`

## Capacity Planning

### Resource Requirements

**Per 10M Documents:**

| Component | CPU | Memory | Storage | Count |
|-----------|-----|--------|---------|-------|
| Crawler Workers | 100m | 256Mi | - | 1000 |
| Query Servers | 1 core | 1Gi | - | 50 |
| Index Nodes (ES) | 4 cores | 16Gi | 2Ti SSD | 21 |
| Redis Cache | 2 cores | 16Gi | 100Gi | 3 |
| Kafka Brokers | 2 cores | 8Gi | 500Gi | 3 |
| ML Serving | 4 cores | 8Gi | 50Gi | 5 |
| **Total** | **~150 cores** | **~500Gi** | **~50Ti** | **~1100 pods** |

### Scaling Calculations

**To support 50K QPS:**
\`\`\`
Query servers needed = 50,000 QPS / 1,000 QPS per server = 50 servers
With 2x headroom = 100 servers
With HPA (min 20, max 200) = adequate
\`\`\`

**To crawl 10M pages/day:**
\`\`\`
Pages per second = 10,000,000 / 86,400 = 116 pages/sec
Avg fetch time = 1 second
Workers needed = 116 × 1 = 116 workers
With overhead & failures = 200-300 workers minimum
With re-crawls & prioritization = 1,000 workers
\`\`\`

### Cost Estimation (AWS)

**Monthly Infrastructure Costs:**

| Component | Instance Type | Count | Cost/Month |
|-----------|---------------|-------|------------|
| Crawlers | t3.small | 1000 | $15,000 |
| Query Servers | c5.xlarge | 50 | $7,500 |
| Elasticsearch | r5.4xlarge | 21 | $40,000 |
| Redis | r5.xlarge | 3 | $1,500 |
| Kafka | m5.large | 3 | $500 |
| ML Serving | g4dn.xlarge | 5 | $2,500 |
| Load Balancers | ALB | 4 | $100 |
| Data Transfer | - | - | $5,000 |
| **Total** | | | **~$72,000/month** |

*Costs can be optimized with:*
- Reserved instances (40-60% savings)
- Spot instances for crawlers (70% savings)
- S3 for cold storage
- CDN for cached responses
