"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { NeuralBackground } from "@/components/landing/NeuralBackground";
import ImmersiveHero from "@/components/landing-new/ImmersiveHero";
import Manifesto from "@/components/landing-new/Manifesto";
import Features from "@/components/landing-new/Features";
import Stats from "@/components/landing-new/Stats";
import Testimonials from "@/components/landing-new/Testimonials";
import CTA from "@/components/landing-new/CTA";
import FAQ from "@/components/landing-new/FAQ";
import { UserMenu } from "@/components/auth/user-menu";
import { RecommendationsWidget } from "@/components/RecommendationsWidget";
import PopularCategories from "@/components/landing-new/PopularCategories";

export default function LandingPage() {
  const router = useRouter();

  const handleSearch = useCallback(
    (q: string) => {
      const query = q.trim();
      if (!query) return;
      router.push(`/search?q=${encodeURIComponent(query)}`);
    },
    [router]
  );

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <NeuralBackground />

      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <button
            className="font-display font-black text-2xl tracking-tighter text-white"
            onClick={() => router.push("/")}
            type="button"
          >
            NEXUS
          </button>
          <div className="hidden md:flex items-center gap-6 font-body font-bold text-sm text-white/80">
            <a href="#features" className="hover:text-white transition-colors">
              FEATURES
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              ABOUT
            </a>
            <button
              className="hover:text-white transition-colors"
              type="button"
              onClick={() => router.push("/discovery")}
            >
              DISCOVER
            </button>
            <button
              className="hover:text-white transition-colors"
              type="button"
              onClick={() => router.push("/admin")}
            >
              DASHBOARD
            </button>
          </div>
        </div>
        <UserMenu landingPageMode />
      </nav>

      <main className="pt-16">
        <section id="top" className="relative">
          <ImmersiveHero onSearch={handleSearch} />
        </section>

        <section id="about">
          <Manifesto />
          <Stats />
        </section>

        {/* Recommendations Section */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter mb-4">
                DISCOVER CONTENT
              </h2>
              <p className="font-body text-lg text-foreground/70 max-w-2xl mx-auto">
                Explore popular and trending documents from our index
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <RecommendationsWidget />
            </div>
          </div>
        </section>

        <PopularCategories />

        <section id="features">
          <Features />
          <Testimonials />
          <CTA />
          <FAQ />
        </section>
      </main>

      <footer className="py-8 text-center text-white/60 font-mono text-sm border-t border-white/10 bg-black/20 backdrop-blur-md">
        <p>&copy; 2025 NEXUS SEARCH. Built on principles. Powered by truth.</p>
      </footer>
    </div>
  );
}
