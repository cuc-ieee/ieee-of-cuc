"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function TechGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 450;
    let height = container.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Globe Particles (Points on sphere surface)
    const particleCount = 1400;
    const radius = 75;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color("#0284c7"); // Deep IEEE blue
    const color2 = new THREE.Color("#38bdf8"); // Cyan highlight
    const colorWhite = new THREE.Color("#ffffff");

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution for uniform dispersion
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color variation
      const rand = Math.random();
      const vertexColor = rand > 0.85 ? colorWhite : rand > 0.4 ? color2 : color1;
      colors[i * 3] = vertexColor.r;
      colors[i * 3 + 1] = vertexColor.g;
      colors[i * 3 + 2] = vertexColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    globeGroup.add(particles);

    // 2. Inner atmospheric core glow
    const coreGeometry = new THREE.SphereGeometry(radius * 0.94, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x0369a1,
      transparent: true,
      opacity: 0.12,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreMesh);

    // 3. Connecting network arcs
    const createArc = (start: THREE.Vector3, end: THREE.Vector3) => {
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      mid.normalize().multiplyScalar(radius + distance * 0.35);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(32);
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const arcMaterial = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.55,
      });
      return new THREE.Line(arcGeometry, arcMaterial);
    };

    // Sample connections between coordinates
    const hubCoords = [
      new THREE.Vector3(radius * 0.7, radius * 0.5, radius * 0.5),
      new THREE.Vector3(-radius * 0.6, radius * 0.3, radius * 0.7),
      new THREE.Vector3(radius * 0.2, -radius * 0.7, radius * 0.6),
      new THREE.Vector3(-radius * 0.5, -radius * 0.5, -radius * 0.7),
      new THREE.Vector3(radius * 0.8, -radius * 0.2, -radius * 0.5),
    ];

    for (let i = 0; i < hubCoords.length - 1; i++) {
      const arc = createArc(hubCoords[i], hubCoords[i + 1]);
      globeGroup.add(arc);
    }
    globeGroup.add(createArc(hubCoords[hubCoords.length - 1], hubCoords[0]));

    // Hub node dots
    const hubGeometry = new THREE.SphereGeometry(2, 16, 16);
    const hubMaterial = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    hubCoords.forEach((coord) => {
      const hubMesh = new THREE.Mesh(hubGeometry, hubMaterial);
      hubMesh.position.copy(coord);
      globeGroup.add(hubMesh);
    });

    // Interaction handling (drag & mouse parallax)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let currentRotationX = 0.2;
    let currentRotationY = 0;

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
        targetRotationY += normX * 0.0008;
        targetRotationX += normY * 0.0008;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for mobile
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

      // Auto rotation
      targetRotationY += 0.002;

      // Smooth damping
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      globeGroup.rotation.x = currentRotationX;
      globeGroup.rotation.y = currentRotationY;

      // Pulse particle size slightly
      const time = Date.now() * 0.0015;
      particleMaterial.size = 2.2 + Math.sin(time) * 0.3;

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

      // Cleanup three objects
      particleGeometry.dispose();
      particleMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      hubGeometry.dispose();
      hubMaterial.dispose();
      renderer.dispose();

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] md:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      {/* Glow aura behind globe */}
      <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full bg-primary/20 blur-[90px] pointer-events-none" />
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
