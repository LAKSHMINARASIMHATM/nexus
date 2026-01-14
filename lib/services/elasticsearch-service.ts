// stubbed for free tier (no-dependency)
export interface ElasticsearchConfig {
    node: string;
    auth: {
        apiKey: string;
    };
    tls: {
        rejectUnauthorized: boolean;
    };
}

class ElasticsearchService {
    private readonly indexName = 'search-index-v1';

    constructor() {
        // stubbed
    }

    async healthCheck(): Promise<boolean> {
        return false;
    }

    async createIndex(): Promise<void> {
        console.log('Elasticsearch disabled (free tier)');
    }

    async indexDocument(document: any): Promise<void> {
        // stubbed
    }

    async bulkIndex(docs: any[]): Promise<any> {
        // stubbed
        return { errors: false, items: [] };
    }

    async search(query: string, options: any = {}): Promise<any> {
        return { hits: [], total: 0 };
    }

    async deleteDocument(docId: string): Promise<void> {
        // stubbed
    }

    async getStats(): Promise<any> {
        return { message: 'Elasticsearch disabled' };
    }
}

export const elasticsearchService = new ElasticsearchService();

