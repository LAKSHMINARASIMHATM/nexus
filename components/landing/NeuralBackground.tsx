"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function NeuralBackground() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current
        const scene = new THREE.Scene()

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 100

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        container.appendChild(renderer.domElement)

        // Particles
        const particleCount = 100
        const particles = new THREE.BufferGeometry()
        const positions = new Float32Array(particleCount * 3)
        const velocities: { x: number; y: number; z: number }[] = []

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 150
            positions[i * 3 + 1] = (Math.random() - 0.5) * 150
            positions[i * 3 + 2] = (Math.random() - 0.5) * 150

            velocities.push({
                x: (Math.random() - 0.5) * 0.2,
                y: (Math.random() - 0.5) * 0.2,
                z: (Math.random() - 0.5) * 0.2,
            })
        }

        particles.setAttribute("position", new THREE.BufferAttribute(positions, 3))

        // Material for dots
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x8b5cf6, // Violet-500
            size: 1.5,
            transparent: true,
            opacity: 0.8,
        })

        const particleSystem = new THREE.Points(particles, particleMaterial)
        scene.add(particleSystem)

        // Lines (Connections)
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x6366f1, // Indigo-500
            transparent: true,
            opacity: 0.15,
        })

        const linesGeometry = new THREE.BufferGeometry()
        const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial)
        scene.add(linesMesh)

        // Mouse interaction
        const mouse = new THREE.Vector2()
        const target = new THREE.Vector2()
        const windowHalfX = window.innerWidth / 2
        const windowHalfY = window.innerHeight / 2

        const onDocumentMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX - windowHalfX)
            mouse.y = (event.clientY - windowHalfY)
        }

        document.addEventListener('mousemove', onDocumentMouseMove)

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate)

            target.x = (1 - mouse.x) * 0.002
            target.y = (1 - mouse.y) * 0.002

            camera.rotation.x += 0.05 * (target.y - camera.rotation.x)
            camera.rotation.y += 0.05 * (target.x - camera.rotation.y)

            const positions = particleSystem.geometry.attributes.position.array as Float32Array

            // Update particles
            for (let i = 0; i < particleCount; i++) {
                // Move
                positions[i * 3] += velocities[i].x
                positions[i * 3 + 1] += velocities[i].y
                positions[i * 3 + 2] += velocities[i].z

                // Bounce off boundaries
                if (Math.abs(positions[i * 3]) > 80) velocities[i].x *= -1
                if (Math.abs(positions[i * 3 + 1]) > 80) velocities[i].y *= -1
                if (Math.abs(positions[i * 3 + 2]) > 80) velocities[i].z *= -1
            }
            particleSystem.geometry.attributes.position.needsUpdate = true

            // Update Lines
            const linePositions: number[] = []
            const connectDistance = 35

            for (let i = 0; i < particleCount; i++) {
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = positions[i * 3] - positions[j * 3]
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

                    if (dist < connectDistance) {
                        linePositions.push(
                            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                        )
                    }
                }
            }

            linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))

            renderer.render(scene, camera)
        }

        animate()

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            document.removeEventListener('mousemove', onDocumentMouseMove)
            window.removeEventListener("resize", handleResize)
            container.removeChild(renderer.domElement)
            particles.dispose()
            particleMaterial.dispose()
            linesGeometry.dispose()
            lineMaterial.dispose()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"
        />
    )
}
