"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeBackground() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        container.appendChild(renderer.domElement)

        // Particles
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 2000 // Number of particles
        const posArray = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15 // Spread
        }

        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

        const material = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x4f46e5, // Indigo-600
            transparent: true,
            opacity: 0.8,
        })

        const particlesMesh = new THREE.Points(particlesGeometry, material)
        scene.add(particlesMesh)

        camera.position.z = 3

        // Mouse interaction
        let mouseX = 0
        let mouseY = 0

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX / window.innerWidth - 0.5
            mouseY = event.clientY / window.innerHeight - 0.5
        }

        window.addEventListener("mousemove", handleMouseMove)

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate)

            particlesMesh.rotation.y += 0.001
            particlesMesh.rotation.x += 0.001

            // Mouse parallax
            particlesMesh.rotation.y += 0.05 * (mouseX - particlesMesh.rotation.y) * 0.1
            particlesMesh.rotation.x += 0.05 * (mouseY - particlesMesh.rotation.x) * 0.1

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
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("resize", handleResize)
            container.removeChild(renderer.domElement)
            particlesGeometry.dispose()
            material.dispose()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-background to-background/50 pointer-events-none"
        />
    )
}
