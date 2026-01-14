"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function OrbitalBackground() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x0f172a) // Slate-900

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 30

        const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        container.appendChild(renderer.domElement)

        // Abstract Shapes
        const geometry = new THREE.IcosahedronGeometry(10, 2)
        const material = new THREE.MeshBasicMaterial({
            color: 0x38bdf8, // Sky-400
            wireframe: true,
            transparent: true,
            opacity: 0.3
        })
        const sphere = new THREE.Mesh(geometry, material)
        scene.add(sphere)

        const innerGeometry = new THREE.IcosahedronGeometry(5, 1)
        const innerMaterial = new THREE.MeshBasicMaterial({
            color: 0x818cf8, // Indigo-400
            wireframe: true,
            transparent: true,
            opacity: 0.5
        })
        const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial)
        scene.add(innerSphere)

        // Particles Ring
        const particlesGeom = new THREE.BufferGeometry()
        const particlesCount = 500
        const posArray = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount; i++) {
            const angle = Math.random() * Math.PI * 2
            const radius = 15 + Math.random() * 5
            posArray[i * 3] = Math.cos(angle) * radius
            posArray[i * 3 + 1] = (Math.random() - 0.5) * 2
            posArray[i * 3 + 2] = Math.sin(angle) * radius
        }

        particlesGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
        const particlesMat = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xffffff,
            transparent: true,
            opacity: 0.6
        })
        const ring = new THREE.Points(particlesGeom, particlesMat)
        scene.add(ring)

        // Animation
        const animate = () => {
            requestAnimationFrame(animate)

            sphere.rotation.y += 0.002
            sphere.rotation.x += 0.001

            innerSphere.rotation.y -= 0.005
            innerSphere.rotation.x -= 0.002

            ring.rotation.y += 0.001
            ring.rotation.z += 0.0005

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
            innerGeometry.dispose()
            particlesGeom.dispose()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    )
}
