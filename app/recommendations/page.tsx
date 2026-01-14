/**
 * Demo page for AI Recommendations
 * 
 * This page showcases the RecommendationClient integration
 */

import { RecommendationDemo } from '@/components/RecommendationDemo';

export default function RecommendationsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <RecommendationDemo />
        </div>
    );
}
