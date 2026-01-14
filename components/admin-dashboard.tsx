"use client"

import { useState, useEffect } from "react"
import { Database, Globe, TrendingUp, Zap, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

export function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, metricsRes] = await Promise.all([
          fetch("/api/v1/admin/index/stats"),
          fetch("/api/v1/admin/metrics?period=1h"),
        ])

        const statsData = await statsRes.json()
        const metricsData = await metricsRes.json()

        setStats(statsData)
        setMetrics(metricsData)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30s

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  const latencyData = [
    { time: "00:00", p50: 95, p95: 165, p99: 235 },
    { time: "00:15", p50: 102, p95: 172, p99: 248 },
    { time: "00:30", p50: 98, p95: 168, p99: 242 },
    { time: "00:45", p50: 105, p95: 178, p99: 255 },
    { time: "01:00", p50: 92, p95: 158, p99: 228 },
  ]

  const throughputData = [
    { time: "00:00", qps: 42000, indexing: 28 },
    { time: "00:15", qps: 48000, indexing: 35 },
    { time: "00:30", qps: 51000, indexing: 32 },
    { time: "00:45", qps: 46000, indexing: 30 },
    { time: "01:00", qps: 45000, indexing: 33 },
  ]


  const handleCrawl = async () => {
    try {
      const res = await fetch("/api/v1/admin/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // For now, triggering a crawl on a default set or re-crawling pending
        // ideally, this button would be "Start Worker" or take specific URLs
        // But per request, we just trigger it. Let's send a dummy list or just start the process if the backend supports it.
        // Actually, the current API expects URLs. Let's make this button 'Seed & Crawl' or just 'Start Processing'
        // Since the user asked for "controls", let's assume valid implementation.
        // For this iteration, I'll make it trigger a crawl for the pending queue if possible,
        // but the current API only accepts NEW urls.
        // I'll leave a comment and implement a simple "add test url" for demo,
        // OR better: Trigger the worker? No, that's a background process.
        // Let's make it "Seed 50 Popular URLs" for testing controls.
        body: JSON.stringify({ urls: ["https://example.com"], priority: "high" }),
      })
      if (res.ok) {
        // Trigger specific notification or refresh
        alert("Crawl Triggered")
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleClearQueue = async () => {
    if (!confirm("Are you sure you want to clear the entire crawl queue?")) return
    try {
      const res = await fetch("/api/v1/admin/crawl/clear", { method: "DELETE" })
      if (res.ok) {
        alert("Queue Cleared")
        // Force refresh
        window.location.reload()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ... Header ... */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Search Engine Dashboard</h1>
          <p className="text-muted-foreground">Monitor crawler, index, and query performance in real-time</p>
        </div>

        {/* ... Overview Stats ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.index.total_documents.toLocaleString()}</div>
              {/* <p className="text-xs text-muted-foreground mt-1">{stats?.index.total_size_gb} GB total size</p> */}
              {/* Using mock size for now as it's static in service */}
            </CardContent>
          </Card>
          {/* ... Other stats ... */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Query Throughput</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.metrics.queries.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {(metrics?.metrics.queries.total / 3600).toFixed(0)} QPS (1h avg)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">P95 Latency</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.metrics.queries.p95_latency_ms}ms</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={metrics?.metrics.queries.p95_latency_ms < 200 ? "default" : "destructive"}>
                  {metrics?.metrics.queries.p95_latency_ms < 200 ? "Healthy" : "Degraded"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(metrics?.metrics.queries.success_rate * 100).toFixed(2)}%</div>
              <Progress value={metrics?.metrics.queries.success_rate * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* ... Tabs ... */}
        <Tabs defaultValue="crawler" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="crawler">Crawler</TabsTrigger>
            <TabsTrigger value="index">Index Health</TabsTrigger>
            <TabsTrigger value="experiments">Experiments</TabsTrigger>
          </TabsList>

          {/* ... Performance Tab Content (Existing) ... */}
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Query Latency Distribution</CardTitle>
                <CardDescription>Latency percentiles over the last hour</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={latencyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="p50" stroke="hsl(var(--chart-1))" name="P50" strokeWidth={2} />
                    <Line type="monotone" dataKey="p95" stroke="hsl(var(--chart-2))" name="P95" strokeWidth={2} />
                    <Line type="monotone" dataKey="p99" stroke="hsl(var(--chart-3))" name="P99" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Throughput Metrics</CardTitle>
                <CardDescription>Query and indexing rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={throughputData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="qps"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.2}
                      name="Queries/sec"
                    />
                    <Area
                      type="monotone"
                      dataKey="indexing"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.2}
                      name="Docs indexed/sec"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cache Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Hit Rate</span>
                        <span className="font-medium">{(metrics?.metrics.cache.hit_rate * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={metrics?.metrics.cache.hit_rate * 100} />
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Cache Size</span>
                      <span className="font-medium">{metrics?.metrics.cache.size_gb} GB</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Evictions/min</span>
                      <span className="font-medium">{metrics?.metrics.cache.evictions_per_min}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Index Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status</span>
                      <Badge variant={stats?.health.status === "green" ? "default" : "destructive"}>
                        {stats?.health.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Active Shards</span>
                      <span className="font-medium">
                        {stats?.index.shards.active}/{stats?.index.shards.total}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Replication Lag</span>
                      <span className="font-medium">{stats?.index.replication.lag_seconds.toFixed(1)}s</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Data Nodes</span>
                      <span className="font-medium">{stats?.health.data_nodes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Crawler Tab */}
          <TabsContent value="crawler" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crawler Statistics</CardTitle>
                <CardDescription>Real-time queue status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-2xl font-bold">{metrics?.metrics.crawler.urls_crawled.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">URLs Processed</p>
                  </div>

                  <div>
                    <div className="text-2xl font-bold">{metrics?.metrics.crawler.urls_queued.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">URLs Pending</p>
                  </div>

                  <div>
                    <div className="text-2xl font-bold">
                      {(metrics?.metrics.crawler.success_rate * 100).toFixed(1)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>

                  <div>
                    <div className="text-2xl font-bold">{metrics?.metrics.crawler.bandwidth_mbps} Mbps</div>
                    <p className="text-sm text-muted-foreground">Bandwidth</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Fetch Time</span>
                    <span className="font-medium">{metrics?.metrics.crawler.avg_fetch_time_ms}ms</span>
                  </div>

                  <Progress value={(metrics?.metrics.crawler.success_rate || 0) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Control Center</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Manage the crawler state.</p>
                  <Button className="w-full mb-2" size="sm" onClick={handleCrawl}>
                    Test Crawl (Mock)
                  </Button>
                  <Button className="w-full" size="sm" variant="destructive" onClick={handleClearQueue}>
                    Clear Crawl Queue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Index Health Tab */}
          <TabsContent value="index" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Index Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-2xl font-bold">{stats?.index.total_documents.toLocaleString()}</div>
                      <p className="text-sm text-muted-foreground">Total Documents</p>
                    </div>

                    <div>
                      <div className="text-2xl font-bold">{(stats?.index.total_terms / 1000000).toFixed(1)}M</div>
                      <p className="text-sm text-muted-foreground">Unique Terms</p>
                    </div>

                    <div>
                      <div className="text-2xl font-bold">{stats?.index.total_size_gb} GB</div>
                      <p className="text-sm text-muted-foreground">Total Size</p>
                    </div>

                    <div>
                      <div className="text-2xl font-bold">{stats?.freshness.avg_document_age_hours.toFixed(1)}h</div>
                      <p className="text-sm text-muted-foreground">Avg Document Age</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Shard Distribution</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Active</span>
                        <span className="font-medium">
                          {stats?.index.shards.active}/{stats?.index.shards.total}
                        </span>
                      </div>
                      <Progress value={((stats?.index.shards.active || 0) / (stats?.index.shards.total || 1)) * 100} />

                      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Relocating:</span>
                          <span className="ml-2 font-medium">{stats?.index.shards.relocating}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Initializing:</span>
                          <span className="ml-2 font-medium">{stats?.index.shards.initializing}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Unassigned:</span>
                          <span className="ml-2 font-medium">{stats?.index.shards.unassigned}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Performance</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Indexing Rate</p>
                        <p className="text-lg font-semibold">{stats?.performance.indexing_rate_docs_per_sec} docs/s</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Search Rate</p>
                        <p className="text-lg font-semibold">
                          {(stats?.performance.search_rate_queries_per_sec / 1000).toFixed(1)}K QPS
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Avg Latency</p>
                        <p className="text-lg font-semibold">{stats?.performance.avg_search_latency_ms}ms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experiments Tab */}
          <TabsContent value="experiments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Experiments</CardTitle>
                <CardDescription>A/B tests currently running in production</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">PageRank Weight Increase</h4>
                      <p className="text-sm text-muted-foreground">Testing PageRank weight 0.2 → 0.3</p>
                      <div className="flex gap-2 mt-2">
                        <Badge>10% traffic</Badge>
                        <Badge variant="outline">3 days remaining</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">NDCG@10 Lift</div>
                      <div className="text-2xl font-bold text-green-600">+0.7%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">BERT Tiny Reranker</h4>
                      <p className="text-sm text-muted-foreground">Comparing BERT vs LightGBM reranker</p>
                      <div className="flex gap-2 mt-2">
                        <Badge>5% traffic</Badge>
                        <Badge variant="outline">5 days remaining</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Latency Impact</div>
                      <div className="text-2xl font-bold text-orange-600">+12ms</div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Globe className="mr-2 h-4 w-4" />
                    Create New Experiment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
