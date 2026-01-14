"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Search3DBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        // Fog for depth
        scene.fog = new THREE.FogExp2(0x000000, 0.03);

        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 5, 10);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // --- Grid Effect ---
        const gridHelper = new THREE.GridHelper(100, 50, 0x4f46e5, 0x222222);
        gridHelper.position.y = -5;
        scene.add(gridHelper);

        // --- Neural Effect (Connected Particles) ---
        const particleCount = 100; // Reduced count for performance with lines
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities: { x: number; y: number; z: number }[] = [];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

            velocities.push({
                x: (Math.random() - 0.5) * 0.05,
                y: (Math.random() - 0.5) * 0.05,
                z: (Math.random() - 0.5) * 0.05,
            });
        }

        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.15,
            color: 0x8b5cf6, // Violet
            transparent: true,
            opacity: 0.8,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Lines for connections
        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0x6366f1, // Indigo
            transparent: true,
            opacity: 0.15,
        });
        const linesGeometry = new THREE.BufferGeometry();
        const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
        scene.add(linesMesh);

        // --- Background Dust (Orbitals) ---
        const dustCount = 1000;
        const dustGeometry = new THREE.BufferGeometry();
        const dustPositions = new Float32Array(dustCount * 3);

        for (let i = 0; i < dustCount * 3; i++) {
            dustPositions[i] = (Math.random() - 0.5) * 100;
        }
        dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
        const dustMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xffffff,
            transparent: true,
            opacity: 0.2,
        });
        const dustMesh = new THREE.Points(dustGeometry, dustMaterial);
        scene.add(dustMesh);


        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate Grid and Dust
            gridHelper.rotation.y += 0.001;
            dustMesh.rotation.y -= 0.0005;

            // Update Neural Particles
            const positions = particlesMesh.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += velocities[i].x;
                positions[i * 3 + 1] += velocities[i].y;
                positions[i * 3 + 2] += velocities[i].z;

                // Bounce
                if (Math.abs(positions[i * 3]) > 15) velocities[i].x *= -1;
                if (Math.abs(positions[i * 3 + 1]) > 10) velocities[i].y *= -1;
                if (Math.abs(positions[i * 3 + 2]) > 15) velocities[i].z *= -1;
            }
            particlesMesh.geometry.attributes.position.needsUpdate = true;

            // Update Lines
            const linePositions: number[] = [];
            const connectDistance = 5;

            for (let i = 0; i < particleCount; i++) {
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < connectDistance) {
                        linePositions.push(
                            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                        );
                    }
                }
            }
            linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

            // Orbital Camera Movement
            camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 2 + 5 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };

        animate();

        // Resize handler
        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            linesGeometry.dispose();
            linesMaterial.dispose();
            gridHelper.dispose();
            dustGeometry.dispose();
            dustMaterial.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none"
            style={{ background: 'transparent' }}
        />
    );
}
