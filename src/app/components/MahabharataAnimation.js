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

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particle system for stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 20;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      starColors[i * 3] = Math.random() * 0.5 + 0.5; // Orange to red
      starColors[i * 3 + 1] = Math.random() * 0.3 + 0.2; // Yellow
      starColors[i * 3 + 2] = Math.random() * 0.2; // Red
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create sacred symbols
    const createSacredSymbol = (x, y, z, type) => {
      let geometry, material, mesh;

      switch (type) {
        case 'om':
          // Create OM symbol using custom geometry
          geometry = new THREE.RingGeometry(0.3, 0.5, 32);
          material = new THREE.MeshBasicMaterial({ 
            color: 0xff6b35, 
            transparent: true, 
            opacity: 0.7,
            side: THREE.DoubleSide
          });
          mesh = new THREE.Mesh(geometry, material);
          break;
        
        case 'chakra':
          // Create chakra (wheel)
          geometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 8);
          material = new THREE.MeshBasicMaterial({ 
            color: 0xffd700, 
            transparent: true, 
            opacity: 0.8,
            side: THREE.DoubleSide
          });
          mesh = new THREE.Mesh(geometry, material);
          break;
        
        case 'lotus':
          // Create lotus flower
          geometry = new THREE.SphereGeometry(0.3, 8, 6);
          material = new THREE.MeshBasicMaterial({ 
            color: 0xff69b4, 
            transparent: true, 
            opacity: 0.6,
            side: THREE.DoubleSide
          });
          mesh = new THREE.Mesh(geometry, material);
          break;
        
        default:
          geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
          material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00, 
            transparent: true, 
            opacity: 0.7 
          });
          mesh = new THREE.Mesh(geometry, material);
      }

      mesh.position.set(x, y, z);
      // Set initial scale to 0 for animation
      mesh.scale.set(0, 0, 0);
      scene.add(mesh);
      return mesh;
    };

    // Create multiple sacred symbols
    const symbols = [
      createSacredSymbol(-2, 1, 0, 'om'),
      createSacredSymbol(2, -1, 0, 'chakra'),
      createSacredSymbol(0, 2, 0, 'lotus'),
      createSacredSymbol(-1, -2, 0, 'om'),
      createSacredSymbol(1.5, 1.5, 0, 'chakra'),
    ];

    // Create energy waves
    const waveGeometry = new THREE.RingGeometry(0.5, 2, 32);
    const waveMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b35,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    scene.add(wave);

    // Create floating text particles
    const textParticles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.SphereGeometry(0.02, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.05, 1, 0.5),
        transparent: true,
        opacity: 0.6
      });
      const particle = new THREE.Mesh(geometry, material);
      
      particle.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      particle.userData = {
        originalY: particle.position.y,
        speed: Math.random() * 0.02 + 0.01,
        amplitude: Math.random() * 0.5 + 0.2
      };
      
      scene.add(particle);
      textParticles.push(particle);
    }

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      // Rotate stars
      stars.rotation.y += 0.001;
      stars.rotation.x += 0.0005;

      // Animate symbols
      symbols.forEach((symbol, index) => {
        symbol.rotation.y += 0.01;
        symbol.rotation.x += 0.005;
        symbol.position.y = Math.sin(time + index) * 0.3;
      });

      // Animate wave
      wave.scale.x = 1 + Math.sin(time * 2) * 0.3;
      wave.scale.y = 1 + Math.sin(time * 2) * 0.3;
      wave.rotation.z += 0.01;

      // Animate text particles
      textParticles.forEach((particle) => {
        particle.position.y = particle.userData.originalY + 
          Math.sin(time * particle.userData.speed) * particle.userData.amplitude;
        particle.rotation.y += 0.02;
        particle.rotation.x += 0.01;
      });

      // Camera movement
      camera.position.x = Math.sin(time * 0.5) * 0.5;
      camera.position.y = Math.cos(time * 0.3) * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // GSAP animations
    gsap.fromTo(camera.position, 
      { z: 10 }, 
      { z: 5, duration: 2, ease: "power2.out" }
    );

    // Animate symbols scale using GSAP
    symbols.forEach((symbol, index) => {
      gsap.fromTo(symbol.scale, 
        { x: 0, y: 0, z: 0 }, 
        { 
          x: 1, 
          y: 1, 
          z: 1, 
          duration: 1.5, 
          delay: index * 0.2, 
          ease: "back.out(1.7)" 
        }
      );
      
      gsap.fromTo(symbol.material, 
        { opacity: 0 }, 
        { 
          opacity: symbol.material.opacity, 
          duration: 1.5, 
          delay: index * 0.2, 
          ease: "power2.out" 
        }
      );
    });

    gsap.fromTo(stars.material, 
      { opacity: 0 }, 
      { opacity: 0.8, duration: 2, ease: "power2.out" }
    );

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
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