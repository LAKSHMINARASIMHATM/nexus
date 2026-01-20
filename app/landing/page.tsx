"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import ImmersiveHero from "@/components/landing-new/ImmersiveHero";
import Manifesto from "@/components/landing-new/Manifesto";
import Features from "@/components/landing-new/Features";
import Stats from "@/components/landing-new/Stats";
import Testimonials from "@/components/landing-new/Testimonials";
import CTA from "@/components/landing-new/CTA";
import FAQ from "@/components/landing-new/FAQ";
import { UserMenu } from "@/components/auth/user-menu";
import { RecommendationsWidget } from "@/components/RecommendationsWidget";

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
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
      {/* Background text overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-extrabold uppercase text-gray-200 opacity-15 whitespace-nowrap select-none rotate-[-8deg]">
          UNFILTERED SEARCH
        </div>
        <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-extrabold uppercase text-gray-200 opacity-10 whitespace-nowrap select-none rotate-[6deg]">
          HARD TRUTH RESULTS
        </div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <button
            className="font-display font-black text-2xl tracking-tighter text-black"
            onClick={() => router.push("/")}
            type="button"
          >
            NEXUS
          </button>
          <div className="hidden md:flex items-center gap-6 font-body font-bold text-sm text-gray-600">
            <a href="#features" className="hover:text-black transition-colors">
              FEATURES
            </a>
            <a href="#about" className="hover:text-black transition-colors">
              ABOUT
            </a>
            <button
              className="hover:text-black transition-colors"
              type="button"
              onClick={() => router.push("/discovery")}
            >
              DISCOVER
            </button>
          </div>
        </div>
        <UserMenu landingPageMode />
      </nav>

      <main className="pt-16 relative z-10">
        <section id="top" className="relative">
          <ImmersiveHero onSearch={handleSearch} />
        </section>

        <section id="about" className="bg-white">
          <Manifesto />
          <Stats />
        </section>

        {/* Recommendations Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter mb-4 text-black">
                DISCOVER CONTENT
              </h2>
              <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
                Explore popular and trending documents from our index
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <RecommendationsWidget />
            </div>
          </div>
        </section>

        {/* Popular Categories Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mt-20 pt-16 border-t border-gray-200">
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-10 text-center">
                Popular Categories
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <a className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200 bg-white group hover:border-gray-400 transition-colors" href="#">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined scale-125">language</span>
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-gray-800">All</span>
                </a>
                <a className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200 bg-white group hover:border-gray-400 transition-colors" href="#">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined scale-125">computer</span>
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-gray-800">Tech</span>
                </a>
                <a className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200 bg-white group hover:border-gray-400 transition-colors" href="#">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined scale-125">biotech</span>
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-gray-800">Science</span>
                </a>
                <a className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200 bg-white group hover:border-gray-400 transition-colors" href="#">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined scale-125">business</span>
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-gray-800">Business</span>
                </a>
                <a className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200 bg-white group hover:border-gray-400 transition-colors" href="#">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined scale-125">medical_services</span>
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-gray-800">Health</span>
                </a>
                <a className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200 bg-white group hover:border-gray-400 transition-colors" href="#">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined scale-125">school</span>
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-gray-800">Education</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-white">
          <Features />
          <Testimonials />
          <CTA />
          <FAQ />
        </section>
      </main>

      <footer className="py-8 text-center text-gray-500 font-mono text-sm border-t border-gray-200 bg-white">
        <p>&copy; 2025 NEXUS SEARCH. Built on principles. Powered by truth.</p>
      </footer>
    </div>
  );
}
