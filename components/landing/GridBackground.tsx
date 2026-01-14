"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function GridBackground() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x020617) // Slate-950
        scene.fog = new THREE.FogExp2(0x020617, 0.15)

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 5
        camera.position.y = 1

        const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        container.appendChild(renderer.domElement)

        // Grid
        const gridHelper = new THREE.GridHelper(100, 100, 0x06b6d4, 0xec4899) // Cyan & Pink
        scene.add(gridHelper)

        // Moving Plane (Terrain effect)
        const geometry = new THREE.PlaneGeometry(100, 100, 40, 40)
        const material = new THREE.MeshBasicMaterial({
            color: 0x6366f1, // Indigo
            wireframe: true,
            transparent: true,
            opacity: 0.15
        })
        const plane = new THREE.Mesh(geometry, material)
        plane.rotation.x = -Math.PI / 2
        plane.position.y = -0.5
        scene.add(plane)

        // Animation
        let time = 0
        const animate = () => {
            requestAnimationFrame(animate)
            time += 0.01

            // Move grid effect
            plane.position.z = (time % 2)
            gridHelper.position.z = (time % 1)

            // Camera sway
            camera.position.x = Math.sin(time * 0.5) * 0.5

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
