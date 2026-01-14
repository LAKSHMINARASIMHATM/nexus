// import { kafkaService } from '@/lib/services/kafka-service';
// import { elasticsearchService } from '@/lib/services/elasticsearch-service';
// import { indexingCounter, indexingLatency } from '@/lib/metrics/prometheus';

async function startIndexingWorker() {
    console.log('Starting indexing worker... (Disabled for No-Docker)');

    /*
    const consumer = kafkaService.createConsumer('indexing-worker-group');
    await consumer.connect();
    await consumer.subscribe({ topic: 'index-updates', fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const startTime = Date.now();

            try {
                const event = JSON.parse(message.value?.toString() || '{}');
                const { doc_id, operation, document } = event;

                if (operation === 'create' || operation === 'update') {
                    await elasticsearchService.indexDocument(document);
                    indexingCounter.inc({ status: 'success' });
                    console.log(`Indexed document: ${doc_id}`);
                }

                indexingLatency.observe((Date.now() - startTime) / 1000);
            } catch (error) {
                console.error('Indexing error:', error);
                indexingCounter.inc({ status: 'error' });
            }
        },
    });
    */

    console.log('Indexing worker started (Mocked)');
}

// Start worker if running as standalone process
if (require.main === module) {
    startIndexingWorker().catch(console.error);
}

export { startIndexingWorker };
