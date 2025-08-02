'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function MahabharataAnimation() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Particle system (stars)
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
      
      colors[i] = Math.random() * 0.5 + 0.5;
      colors[i + 1] = Math.random() * 0.5 + 0.5;
      colors[i + 2] = 1;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Sacred symbols
    const symbols = [];
    const symbolGeometry = new THREE.TorusGeometry(0.3, 0.1, 8, 16);
    const symbolMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9
    });

    for (let i = 0; i < 5; i++) {
      const symbol = new THREE.Mesh(symbolGeometry, symbolMaterial);
      symbol.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      symbol.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      symbols.push(symbol);
      scene.add(symbol);
    }

    // Energy waves
    const waveGeometry = new THREE.RingGeometry(1, 1.2, 32);
    const waveMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });

    const waves = [];
    for (let i = 0; i < 3; i++) {
      const wave = new THREE.Mesh(waveGeometry, waveMaterial);
      wave.position.z = -2;
      wave.scale.setScalar(1 + i * 0.5);
      waves.push(wave);
      scene.add(wave);
    }

    // Floating text particles
    const textParticles = [];
    const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 50; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      textParticles.push(particle);
      scene.add(particle);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate stars
      stars.rotation.y += 0.001;
      stars.rotation.x += 0.0005;

      // Animate symbols
      symbols.forEach((symbol, index) => {
        symbol.rotation.x += 0.01 + index * 0.002;
        symbol.rotation.y += 0.008 + index * 0.001;
        symbol.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
      });

      // Animate waves
      waves.forEach((wave, index) => {
        wave.rotation.z += 0.02 + index * 0.01;
        wave.material.opacity = 0.3 + Math.sin(Date.now() * 0.002 + index) * 0.2;
      });

      // Animate text particles
      textParticles.forEach((particle, index) => {
        particle.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        particle.position.x += Math.cos(Date.now() * 0.001 + index) * 0.001;
        particle.material.opacity = 0.5 + Math.sin(Date.now() * 0.003 + index) * 0.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    // GSAP animations
    gsap.to(camera.position, {
      x: 2,
      y: 1,
      z: 3,
      duration: 8,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });

    gsap.to(symbols, {
      rotationY: Math.PI * 2,
      duration: 10,
      ease: "none",
      repeat: -1,
      stagger: 0.5
    });

    gsap.to(stars.rotation, {
      y: Math.PI * 2,
      duration: 20,
      ease: "none",
      repeat: -1
    });

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-96 sm:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
      <div 
        ref={containerRef} 
        className="w-full h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white z-10">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-shadow-lg">
            महाभारत
          </h3>
          <p className="text-sm sm:text-base opacity-90 text-shadow">
            The Great Epic of Dharma
          </p>
        </div>
      </div>
    </div>
  );
} 