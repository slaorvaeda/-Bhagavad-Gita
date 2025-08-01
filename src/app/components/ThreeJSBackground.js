'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingParticles({ count = 1000 }) {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = Math.random() * 20 + 10;
      const speed = Math.random() * 0.01;
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const points = useMemo(() => {
    const positions = new Float32Array(particles.length * 3);
    const colors = new Float32Array(particles.length * 3);
    
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.x;
      positions[i * 3 + 1] = particle.y;
      positions[i * 3 + 2] = particle.z;
      
      // Sacred colors: orange, red, yellow, gold
      const color = new THREE.Color();
      const hue = Math.random() * 0.1 + 0.05; // Orange to red range
      const saturation = 0.8;
      const lightness = 0.6;
      color.setHSL(hue, saturation, lightness);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    });
    
    return { positions, colors };
  }, [particles]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    particles.forEach((particle, i) => {
      const { factor, speed, x, y, z } = particle;
      const t = (time + factor) * speed;
      
      const positions = mesh.current.geometry.attributes.position.array;
      positions[i * 3] = x + Math.cos(t) * 50;
      positions[i * 3 + 1] = y + Math.sin(t) * 50;
      positions[i * 3 + 2] = z + Math.sin(t * 0.5) * 30;
    });
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate the entire particle system
    mesh.current.rotation.y = time * 0.1;
    mesh.current.rotation.x = time * 0.05;
  });

  return (
    <group>
      <Points ref={mesh} positions={points.positions} colors={points.colors}>
        <PointMaterial
          transparent
          vertexColors
          size={2}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      <ambientLight intensity={0.5} />
      <directionalLight ref={light} position={[10, 10, 5]} intensity={1} />
    </group>
  );
}

function SacredGeometry() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.x = time * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -100]}>
      <torusKnotGeometry args={[50, 10, 100, 16]} />
      <meshBasicMaterial color="#ff6b35" wireframe opacity={0.1} transparent />
    </mesh>
  );
}

export default function ThreeJSBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1000], fov: 75 }}>
        <FloatingParticles count={500} />
        <SacredGeometry />
      </Canvas>
    </div>
  );
} 