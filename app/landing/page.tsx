"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import * as THREE from "three";

export default function LandingPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [backgroundType, setBackgroundType] = useState<'neural' | 'grid' | 'orbital' | 'particle' | 'none'>('neural');

  const handleSearch = useCallback(
    (q: string) => {
      const query = q.trim();
      if (!query) return;
      router.push(`/search?q=${encodeURIComponent(query)}`);
    },
    [router]
  );

  const cycleBackground = () => {
    const types: Array<'neural' | 'grid' | 'orbital' | 'particle' | 'none'> = ['neural', 'grid', 'orbital', 'particle', 'none'];
    const currentIndex = types.indexOf(backgroundType);
    const nextIndex = (currentIndex + 1) % types.length;
    setBackgroundType(types[nextIndex]);
    console.log('🔄 Switching to:', types[nextIndex]);
  };

  const getBackgroundInfo = () => {
    const info = {
      neural: { name: 'Neural', icon: '🧠', color: 'from-violet-500 to-indigo-500' },
      grid: { name: 'Grid', icon: '🌐', color: 'from-cyan-500 to-pink-500' },
      orbital: { name: 'Orbital', icon: '🪐', color: 'from-sky-400 to-indigo-400' },
      particle: { name: 'Particle', icon: '✨', color: 'from-slate-400 to-slate-600' },
      none: { name: 'None', icon: '⭕', color: 'from-gray-500 to-gray-700' },
    };
    return info[backgroundType];
  };

  // Dynamic background renderer
  useEffect(() => {
    if (!canvasRef.current || backgroundType === 'none') {
      console.log('⏭️ Skipping background render');
      return;
    }

    console.log('🎨 Initializing', backgroundType, 'background...');
    const container = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    let animationId: number;

    // Neural Network Background
    if (backgroundType === 'neural') {
      scene.background = new THREE.Color(0x0f172a);
      camera.position.z = 100;

      const particleCount = 100;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities: Array<{ x: number, y: number, z: number }> = [];

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 150;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 150;
        velocities.push({
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2,
          z: (Math.random() - 0.5) * 0.2,
        });
      }

      particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x8b5cf6,
        size: 1.5,
        transparent: true,
        opacity: 0.8,
      });
      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);

      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.15 });
      const linesGeometry = new THREE.BufferGeometry();
      const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
      scene.add(linesMesh);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const positions = particleSystem.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += velocities[i].x;
          positions[i * 3 + 1] += velocities[i].y;
          positions[i * 3 + 2] += velocities[i].z;

          if (Math.abs(positions[i * 3]) > 80) velocities[i].x *= -1;
          if (Math.abs(positions[i * 3 + 1]) > 80) velocities[i].y *= -1;
          if (Math.abs(positions[i * 3 + 2]) > 80) velocities[i].z *= -1;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;

        const linePositions: number[] = [];
        const connectDistance = 35;
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < connectDistance) {
              linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
            }
          }
        }
        linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        renderer.render(scene, camera);
      };
      animate();
    }

    // Grid Background
    else if (backgroundType === 'grid') {
      scene.background = new THREE.Color(0x020617);
      scene.fog = new THREE.FogExp2(0x020617, 0.15);
      camera.position.z = 5;
      camera.position.y = 1;

      const gridHelper = new THREE.GridHelper(100, 100, 0x06b6d4, 0xec4899);
      scene.add(gridHelper);

      const geometry = new THREE.PlaneGeometry(100, 100, 40, 40);
      const material = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.15 });
      const plane = new THREE.Mesh(geometry, material);
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = -0.5;
      scene.add(plane);

      let time = 0;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        time += 0.01;
        plane.position.z = time % 2;
        gridHelper.position.z = time % 1;
        camera.position.x = Math.sin(time * 0.5) * 0.5;
        renderer.render(scene, camera);
      };
      animate();
    }

    // Orbital Background
    else if (backgroundType === 'orbital') {
      scene.background = new THREE.Color(0x0f172a);
      camera.position.z = 30;

      const geometry = new THREE.IcosahedronGeometry(10, 2);
      const material = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.3 });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      const innerGeometry = new THREE.IcosahedronGeometry(5, 1);
      const innerMaterial = new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true, transparent: true, opacity: 0.5 });
      const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
      scene.add(innerSphere);

      const particlesGeom = new THREE.BufferGeometry();
      const particlesCount = 500;
      const posArray = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 15 + Math.random() * 5;
        posArray[i * 3] = Math.cos(angle) * radius;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 2;
        posArray[i * 3 + 2] = Math.sin(angle) * radius;
      }
      particlesGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particlesMat = new THREE.PointsMaterial({ size: 0.1, color: 0xffffff, transparent: true, opacity: 0.6 });
      const ring = new THREE.Points(particlesGeom, particlesMat);
      scene.add(ring);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        sphere.rotation.y += 0.002;
        sphere.rotation.x += 0.001;
        innerSphere.rotation.y -= 0.005;
        innerSphere.rotation.x -= 0.002;
        ring.rotation.y += 0.001;
        ring.rotation.z += 0.0005;
        renderer.render(scene, camera);
      };
      animate();
    }

    // Particle Background
    else if (backgroundType === 'particle') {
      scene.background = new THREE.Color(0xf8fafc);
      camera.position.z = 5;

      const geometry = new THREE.BufferGeometry();
      const count = 1000;
      const positions = new Float32Array(count * 3);
      const speeds = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        speeds[i] = Math.random() * 0.002 + 0.001;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ size: 0.03, color: 0x64748b, transparent: true, opacity: 0.6 });
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const positions = points.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
          positions[i * 3 + 1] += speeds[i];
          if (positions[i * 3 + 1] > 10) {
            positions[i * 3 + 1] = -10;
          }
        }
        points.geometry.attributes.position.needsUpdate = true;
        points.rotation.y += 0.0005;
        renderer.render(scene, camera);
      };
      animate();
    }

    console.log('✅ Background rendered');

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      console.log('🧹 Cleaning up', backgroundType, 'background...');
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [backgroundType]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Direct background - embedded in page */}
      <div
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{ zIndex: -10 }}
      />

      {/* Background text overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
        <section id="top" className="relative bg-transparent">
          <ImmersiveHero onSearch={handleSearch} />
        </section>

        <section id="about" className="bg-white/80 backdrop-blur-sm">
          <Manifesto />
          <Stats />
        </section>

        {/* Recommendations Section */}
        <section className="py-16 px-6 bg-white/80 backdrop-blur-sm">
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
        <section className="py-16 px-6 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="mt-20 pt-16 border-t border-gray-200">
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-10 text-center">
                Popular Categories
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <a className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200 bg-white/80 group hover:border-gray-400 transition-colors" href="#">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined scale-125">language</span>
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-gray-800">All</span>
                </a>
                <a className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200 bg-white/80 group hover:border-gray-400 transition-colors" href="#">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined scale-125">computer</span>
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-gray-800">Tech</span>
                </a>
                <a className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200 bg-white/80 group hover:border-gray-400 transition-colors" href="#">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined scale-125">biotech</span>
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-gray-800">Science</span>
                </a>
                <a className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200 bg-white/80 group hover:border-gray-400 transition-colors" href="#">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined scale-125">business</span>
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-gray-800">Business</span>
                </a>
                <a className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200 bg-white/80 group hover:border-gray-400 transition-colors" href="#">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined scale-125">medical_services</span>
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-gray-800">Health</span>
                </a>
                <a className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200 bg-white/80 group hover:border-gray-400 transition-colors" href="#">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined scale-125">school</span>
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-gray-800">Education</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-white/80 backdrop-blur-sm">
          <Features />
          <Testimonials />
          <CTA />
          <FAQ />
        </section>
      </main>


      <footer className="py-8 text-center text-gray-500 font-mono text-sm border-t border-gray-200 bg-white/90 backdrop-blur-sm relative z-10">
        <p>&copy; 2025 NEXUS SEARCH. Built on principles. Powered by truth.</p>
      </footer>

      {/* Background Switcher Button */}
      <button
        onClick={cycleBackground}
        className="fixed bottom-6 right-6 z-50 glass-panel px-5 py-4 rounded-xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
        title={`Current: ${getBackgroundInfo().name} - Click to cycle`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getBackgroundInfo().icon}</span>
          <div className="flex flex-col items-start">
            <span className="text-xs font-medium opacity-60">Background</span>
            <span className="text-sm font-bold">{getBackgroundInfo().name}</span>
          </div>
        </div>
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br ${getBackgroundInfo().color} animate-pulse shadow-lg`} />
      </button>
    </div>
  );
}
