"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ParticleBackground() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current
        const scene = new THREE.Scene()
        // Light background color
        scene.background = new THREE.Color(0xf8fafc) // Slate-50

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        container.appendChild(renderer.domElement)

        // Particles
        const geometry = new THREE.BufferGeometry()
        const count = 1000
        const positions = new Float32Array(count * 3)
        const speeds = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20
            speeds[i] = Math.random() * 0.002 + 0.001
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        const material = new THREE.PointsMaterial({
            size: 0.03,
            color: 0x64748b, // Slate-500
            transparent: true,
            opacity: 0.6,
        })

        const points = new THREE.Points(geometry, material)
        scene.add(points)

        // Animation
        const animate = () => {
            requestAnimationFrame(animate)

            const positions = points.geometry.attributes.position.array as Float32Array

            for (let i = 0; i < count; i++) {
                // Float upwards
                positions[i * 3 + 1] += speeds[i]

                // Reset if too high
                if (positions[i * 3 + 1] > 10) {
                    positions[i * 3 + 1] = -10
                }
            }
            points.geometry.attributes.position.needsUpdate = true

            // Gentle rotation
            points.rotation.y += 0.0005

            renderer.render(scene, camera)
        }

        animate()

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            container.removeChild(renderer.domElement)
            geometry.dispose()
            material.dispose()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    )
}
