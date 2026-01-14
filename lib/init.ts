import { kafkaService } from './services/kafka-service';
import { elasticsearchService } from './services/elasticsearch-service';

let initialized = false;

export async function initializeServices() {
    if (initialized) return;

    try {
        console.log('Initializing services...');

        // Initialize Kafka
        // await kafkaService.initialize();
        // console.log('✓ Kafka initialized');

        // Initialize Elasticsearch
        // await elasticsearchService.createIndex();
        // console.log('✓ Elasticsearch initialized');

        initialized = true;
        console.log('All services initialized successfully (Mocked for No-Docker)');
    } catch (error) {
        console.error('Failed to initialize services:', error);
        // Don't throw - allow app to start even if some services fail
    }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully...');
    await kafkaService.disconnect();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully...');
    await kafkaService.disconnect();
    process.exit(0);
});
