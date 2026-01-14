// Kafka Service Mock (Free Tier)
class KafkaService {
    constructor() {
        console.log('KafkaService initialized (Mocked)');
    }

    async initialize() {
        // Mocked
    }

    async publishCrawlEvent(event: any) {
        // Mocked
    }

    async publishIndexUpdate(doc: any) {
        // Mocked
    }

    async publishClickEvent(event: any) {
        // Mocked
    }

    async createConsumer(groupId: string): Promise<any> {
        return {
            connect: async () => { },
            subscribe: async () => { },
            run: async () => { },
            disconnect: async () => { },
        };
    }

    async disconnect() {
        // Mocked
    }
}


export const kafkaService = new KafkaService();
