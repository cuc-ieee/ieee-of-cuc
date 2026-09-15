"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLOBE_WHITE_DOTS, GLOBE_BLUE_DOTS } from "@/data/globeDots";

export function TechGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 480;
    let height = container.clientHeight || 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 245;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    // Tilt globe slightly for realistic planetary axial tilt (~23.5 degrees)
    globeGroup.rotation.z = 0.22;
    scene.add(globeGroup);

    const radius = 78;

    // Procedural anti-aliased circular orb texture
    const createOrbTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.35, "rgba(255, 255, 255, 0.95)");
      gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.4)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      return new THREE.CanvasTexture(canvas);
    };

    const orbTexture = createOrbTexture();

    // 1. Dark Inner Core (blocks rear hemisphere dots from visually cluttering the front)
    const coreGeometry = new THREE.SphereGeometry(radius * 0.985, 36, 36);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x030712, // Deep void background
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreMesh);

    // 2. Blue Dots for Oceans (All areas not covered by white dots)
    const bluePositions = new Float32Array(GLOBE_BLUE_DOTS.length * 3);
    for (let i = 0; i < GLOBE_BLUE_DOTS.length; i++) {
      const [ux, uy, uz] = GLOBE_BLUE_DOTS[i];
      bluePositions[i * 3] = ux * radius;
      bluePositions[i * 3 + 1] = uy * radius;
      bluePositions[i * 3 + 2] = uz * radius;
    }

    const blueGeometry = new THREE.BufferGeometry();
    blueGeometry.setAttribute("position", new THREE.BufferAttribute(bluePositions, 3));

    const blueMaterial = new THREE.PointsMaterial({
      size: 2.3,
      color: 0x38bdf8, // Brilliant glowing cyan-blue for oceans
      map: orbTexture || undefined,
      transparent: true,
      opacity: 0.85,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const bluePoints = new THREE.Points(blueGeometry, blueMaterial);
    globeGroup.add(bluePoints);

    // 3. White Orbs / Dots for World Map Continents
    const whitePositions = new Float32Array(GLOBE_WHITE_DOTS.length * 3);
    for (let i = 0; i < GLOBE_WHITE_DOTS.length; i++) {
      const [ux, uy, uz] = GLOBE_WHITE_DOTS[i];
      whitePositions[i * 3] = ux * radius;
      whitePositions[i * 3 + 1] = uy * radius;
      whitePositions[i * 3 + 2] = uz * radius;
    }

    const whiteGeometry = new THREE.BufferGeometry();
    whiteGeometry.setAttribute("position", new THREE.BufferAttribute(whitePositions, 3));

    const whiteMaterial = new THREE.PointsMaterial({
      size: 2.9,
      color: 0xffffff,
      map: orbTexture || undefined,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const whitePoints = new THREE.Points(whiteGeometry, whiteMaterial);
    globeGroup.add(whitePoints);

    // Initial orientation: Rotate so Sri Lanka, South Asia and Indian Ocean face front-and-center
    let currentRotationX = 0.12;
    let currentRotationY = -1.35;
    let targetRotationX = 0.12;
    let targetRotationY = -1.35;

    // Interaction handling (drag & smooth inertia)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        // Subtle hover tilt
        const rect = container.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationY += normX * 0.0006;
        targetRotationX += normY * 0.0006;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for mobile devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Responsive resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Gentle continuous planetary rotation when not manually dragging
      if (!isDragging) {
        targetRotationY += 0.0016;
      }

      // Smooth damping interpolation
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      globeGroup.rotation.x = currentRotationX;
      globeGroup.rotation.y = currentRotationY;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      // Clean up Three.js allocations
      whiteGeometry.dispose();
      whiteMaterial.dispose();
      blueGeometry.dispose();
      blueMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      if (orbTexture) orbTexture.dispose();
      renderer.dispose();

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] md:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      {/* Radiant atmospheric ambient glow behind the globe */}
      <div className="absolute w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] rounded-full bg-sky-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full bg-primary/25 blur-[60px] pointer-events-none" />
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
