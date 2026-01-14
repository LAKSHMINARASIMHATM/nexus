(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/landing-new/Search3DBackground.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Search3DBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Search3DBackground() {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Search3DBackground.useEffect": ()=>{
            if (!containerRef.current) return;
            const container = containerRef.current;
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            // Fog for depth
            scene.fog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FogExp2"](0x000000, 0.03);
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](75, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.set(0, 5, 10);
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                alpha: true,
                antialias: true
            });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);
            // --- Grid Effect ---
            const gridHelper = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GridHelper"](100, 50, 0x4f46e5, 0x222222);
            gridHelper.position.y = -5;
            scene.add(gridHelper);
            // --- Neural Effect (Connected Particles) ---
            const particleCount = 100; // Reduced count for performance with lines
            const particlesGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const positions = new Float32Array(particleCount * 3);
            const velocities = [];
            for(let i = 0; i < particleCount; i++){
                positions[i * 3] = (Math.random() - 0.5) * 30;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
                velocities.push({
                    x: (Math.random() - 0.5) * 0.05,
                    y: (Math.random() - 0.5) * 0.05,
                    z: (Math.random() - 0.5) * 0.05
                });
            }
            particlesGeometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
            const particlesMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                size: 0.15,
                color: 0x8b5cf6,
                transparent: true,
                opacity: 0.8
            });
            const particlesMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);
            // Lines for connections
            const linesMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                color: 0x6366f1,
                transparent: true,
                opacity: 0.15
            });
            const linesGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const linesMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSegments"](linesGeometry, linesMaterial);
            scene.add(linesMesh);
            // --- Background Dust (Orbitals) ---
            const dustCount = 1000;
            const dustGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const dustPositions = new Float32Array(dustCount * 3);
            for(let i = 0; i < dustCount * 3; i++){
                dustPositions[i] = (Math.random() - 0.5) * 100;
            }
            dustGeometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](dustPositions, 3));
            const dustMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                size: 0.05,
                color: 0xffffff,
                transparent: true,
                opacity: 0.2
            });
            const dustMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](dustGeometry, dustMaterial);
            scene.add(dustMesh);
            // Mouse interaction
            let mouseX = 0;
            let mouseY = 0;
            const handleMouseMove = {
                "Search3DBackground.useEffect.handleMouseMove": (event)=>{
                    mouseX = event.clientX / window.innerWidth * 2 - 1;
                    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
                }
            }["Search3DBackground.useEffect.handleMouseMove"];
            window.addEventListener("mousemove", handleMouseMove);
            // Animation Loop
            const animate = {
                "Search3DBackground.useEffect.animate": ()=>{
                    requestAnimationFrame(animate);
                    // Rotate Grid and Dust
                    gridHelper.rotation.y += 0.001;
                    dustMesh.rotation.y -= 0.0005;
                    // Update Neural Particles
                    const positions = particlesMesh.geometry.attributes.position.array;
                    for(let i = 0; i < particleCount; i++){
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
                    const linePositions = [];
                    const connectDistance = 5;
                    for(let i = 0; i < particleCount; i++){
                        for(let j = i + 1; j < particleCount; j++){
                            const dx = positions[i * 3] - positions[j * 3];
                            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                            if (dist < connectDistance) {
                                linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2], positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
                            }
                        }
                    }
                    linesMesh.geometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](linePositions, 3));
                    // Orbital Camera Movement
                    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
                    camera.position.y += (mouseY * 2 + 5 - camera.position.y) * 0.05;
                    camera.lookAt(0, 0, 0);
                    renderer.render(scene, camera);
                }
            }["Search3DBackground.useEffect.animate"];
            animate();
            // Resize handler
            const handleResize = {
                "Search3DBackground.useEffect.handleResize": ()=>{
                    if (!container) return;
                    camera.aspect = container.clientWidth / container.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(container.clientWidth, container.clientHeight);
                }
            }["Search3DBackground.useEffect.handleResize"];
            window.addEventListener("resize", handleResize);
            return ({
                "Search3DBackground.useEffect": ()=>{
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
                }
            })["Search3DBackground.useEffect"];
        }
    }["Search3DBackground.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "absolute inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none",
        style: {
            background: 'transparent'
        }
    }, void 0, false, {
        fileName: "[project]/components/landing-new/Search3DBackground.tsx",
        lineNumber: 181,
        columnNumber: 9
    }, this);
}
_s(Search3DBackground, "8puyVO4ts1RhCfXUmci3vLI3Njw=");
_c = Search3DBackground;
var _c;
__turbopack_context__.k.register(_c, "Search3DBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing-new/Search3DBackground.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/landing-new/Search3DBackground.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_landing-new_Search3DBackground_tsx_37812ba6._.js.map