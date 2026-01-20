import { localRecommendationService } from "@/lib/services/local-recommendation-service";
import SearchResultsClient from "@/components/search/SearchResultsClient";

export default async function SearchPage() {
    // Prefetch popular documents for the sidebar recommendations widget
    const initialRecommendations = await localRecommendationService.getPopularDocuments({ limit: 5 });

    return <SearchResultsClient initialRecommendations={initialRecommendations} />;
}
