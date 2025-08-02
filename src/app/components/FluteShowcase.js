"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Html } from "@react-three/drei"
import { useRef, useState, useEffect, Suspense } from "react"
import * as THREE from "three"

// Loading component
function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        <span className="ml-3 text-amber-800 font-medium">Loading Sacred Flute...</span>
      </div>
    </Html>
  )
}

function PerfectFlute() {
  const fluteGroupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (fluteGroupRef.current) {
      // Only update every other frame for better performance
      if (state.clock.elapsedTime % 0.032 > 0.016) return;
      
      // Gentle floating animation
      fluteGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.03 // Slower and smaller

      // Continuous slow rotation for 360-degree view
      if (!hovered) {
        fluteGroupRef.current.rotation.y += 0.003 // Slower rotation
      }

      // Gentle breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.005 // Slower and smaller
      fluteGroupRef.current.scale.setScalar(scale)
    }
  })

  // Authentic flute dimensions
  const fluteLength = 4.0
  const fluteRadius = 0.08
  const holeRadius = 0.025
  const holeDepth = 0.08

  // Traditional Krishna flute hole positions (along the length)
  const holePositions = [
    { z: -1.6, name: "Embouchure (Blow hole)" },
    { z: -1.0, name: "Sa (Do)" },
    { z: -0.6, name: "Re (Re)" },
    { z: -0.2, name: "Ga (Mi)" },
    { z: 0.2, name: "Ma (Fa)" },
    { z: 0.6, name: "Pa (Sol)" },
    { z: 1.0, name: "Dha (La)" },
    { z: 1.4, name: "Ni (Ti)" },
  ]

  return (
    <group
      ref={fluteGroupRef}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]} // Keep flute horizontal - no rotation
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main flute body - Horizontal cylinder */}
      <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[fluteRadius, fluteRadius, fluteLength, 64]} />
        <meshPhysicalMaterial
          color="#DAA520"
          metalness={0.7}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={0.9}
          transmission={0.1}
          thickness={0.5}
          ior={1.5}
        />
      </mesh>

      {/* Finger holes - Properly aligned with horizontal flute */}
      {holePositions.map((hole, i) => (
        <group key={`hole-group-${i}`}>
          {/* Main hole cavity - perpendicular to flute surface */}
          <mesh position={[hole.z, fluteRadius - holeDepth / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[holeRadius, holeRadius, holeDepth, 16]} />
            <meshBasicMaterial color="#000000" />
          </mesh>

          {/* Inner hole shadow for depth */}
          <mesh position={[hole.z, fluteRadius - holeDepth / 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[holeRadius * 0.8, holeRadius * 0.8, holeDepth / 2, 16]} />
            <meshBasicMaterial color="#1a0a00" />
          </mesh>

          {/* Hole rim - raised golden ring around each hole */}
          <mesh position={[hole.z, fluteRadius + 0.005, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[holeRadius + 0.01, holeRadius + 0.01, 0.01, 16]} />
            <meshPhysicalMaterial
              color="#FFD700"
              metalness={0.9}
              roughness={0.1}
              emissive="#B8860B"
              emissiveIntensity={0.1}
            />
          </mesh>

          {/* Hole labels for educational purpose */}
          <Html position={[hole.z, fluteRadius + 0.15, 0]} center>
            <div className="text-xs text-amber-800 bg-white/80 px-2 py-1 rounded shadow-sm pointer-events-none">
              {hole.name}
            </div>
          </Html>
        </group>
      ))}

      {/* Bamboo segments - Traditional nodes along the flute */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={`segment-${i}`} position={[-1.5 + i * 0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[fluteRadius + 0.012, fluteRadius + 0.012, 0.08, 32]} />
          <meshPhysicalMaterial color="#CD7F32" metalness={0.8} roughness={0.2} clearcoat={0.8} />
        </mesh>
      ))}

      {/* End caps with traditional taper */}
      <mesh position={[fluteLength / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[fluteRadius * 0.7, fluteRadius, 0.15, 32]} />
        <meshPhysicalMaterial color="#B8860B" metalness={0.85} roughness={0.12} clearcoat={0.9} />
      </mesh>

      <mesh position={[-fluteLength / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[fluteRadius, fluteRadius * 0.7, 0.15, 32]} />
        <meshPhysicalMaterial color="#B8860B" metalness={0.85} roughness={0.12} clearcoat={0.9} />
      </mesh>

      {/* Sacred decorative bands along the flute */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={`band-${i}`} position={[-1.2 + i * 0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[fluteRadius + 0.018, fluteRadius + 0.018, 0.06, 32]} />
          <meshPhysicalMaterial
            color="#FFD700"
            metalness={1.0}
            roughness={0.05}
            clearcoat={1.0}
            emissive="#DAA520"
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}

      {/* Intricate golden thread pattern along the top */}
      <mesh position={[0, fluteRadius + 0.008, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.004, 0.004, fluteLength - 0.6, 8]} />
        <meshPhysicalMaterial
          color="#FFD700"
          metalness={1.0}
          roughness={0.0}
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Sacred Om symbols at both ends */}
      <mesh position={[1.2, fluteRadius + 0.02, 0]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshPhysicalMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
          emissive="#DAA520"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh position={[-1.2, fluteRadius + 0.02, 0]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshPhysicalMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
          emissive="#DAA520"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Lotus petal decorations around center */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh
            key={`petal-${i}`}
            position={[0, Math.cos(angle) * (fluteRadius + 0.03), Math.sin(angle) * (fluteRadius + 0.03)]}
            rotation={[0, angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.03, 0.02, 0.1]} />
            <meshPhysicalMaterial color="#DAA520" metalness={0.8} roughness={0.15} clearcoat={0.9} />
          </mesh>
        )
      })}

      {/* Central decorative ring */}
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[fluteRadius + 0.025, 0.01, 8, 32]} />
        <meshPhysicalMaterial
          color="#FFD700"
          metalness={1.0}
          roughness={0.0}
          emissive="#DAA520"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Additional decorative spirals */}
      {Array.from({ length: 3 }, (_, i) => (
        <mesh key={`spiral-${i}`} position={[-0.8 + i * 0.8, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[fluteRadius + 0.015, 0.006, 6, 24]} />
          <meshPhysicalMaterial
            color="#CD7F32"
            metalness={0.9}
            roughness={0.1}
            emissive="#8B4513"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

function SacredParticles() {
  const particlesRef = useRef()
  const [positions] = useState(() => {
    const particleCount = 100 // Reduced particle count
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12 // Reduced range
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12
    }

    return positions
  })

  useFrame((state) => {
    if (particlesRef.current) {
      // Slower rotation for better performance
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.025) * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#FFD700"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function DivineLighting() {
  const lightRef = useRef()
  const spotLightRef = useRef()

  useFrame((state) => {
    // Only update every other frame for better performance
    if (state.clock.elapsedTime % 0.064 > 0.032) return;
    
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 3 // Slower and smaller movement
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.05) * 3
    }
    if (spotLightRef.current) {
      spotLightRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.075) * 2
      spotLightRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.075) * 2
    }
  })

  return (
    <>
      {/* Ambient divine light */}
      <ambientLight intensity={0.5} color="#FFF8DC" />

      {/* Main directional light */}
      <directionalLight
        ref={lightRef}
        position={[6, 10, 6]}
        intensity={1.5}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />

      {/* Golden accent lights */}
      <pointLight position={[-5, 5, 5]} intensity={1.0} color="#FFD700" />
      <pointLight position={[5, -3, -5]} intensity={0.8} color="#FFA500" />
      <pointLight position={[0, 8, 0]} intensity={0.6} color="#FFFACD" />

      {/* Moving spotlight for dramatic effect */}
      <spotLight
        ref={spotLightRef}
        position={[0, 0, 10]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color="#FFFACD"
        castShadow
      />
    </>
  )
}

export default function FluteShowcase() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Add passive event listeners for better performance
  useEffect(() => {
    const handleWheel = (e) => {
      // This will be handled by OrbitControls
    }
    
    // Add passive wheel listener to prevent scroll blocking
    document.addEventListener('wheel', handleWheel, { passive: true })
    
    return () => {
      document.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div className="relative w-full h-96 sm:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{ position: [0, 3, 8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.5 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<LoadingSpinner />}>
          {/* Lighting setup */}
          <DivineLighting />

          {/* Main flute */}
          <PerfectFlute />

          {/* Sacred particles */}
          <SacredParticles />

          {/* Ground plane for shadows */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
            <planeGeometry args={[30, 30]} />
            <shadowMaterial transparent opacity={0.3} />
          </mesh>

          {/* Camera controls for full 360-degree view */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={4}
            maxDistance={15}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.8}
            zoomSpeed={1.2}
            enableKeys={false}
            mouseButtons={{
              LEFT: THREE.MOUSE.ROTATE,
              MIDDLE: THREE.MOUSE.DOLLY,
              RIGHT: THREE.MOUSE.PAN
            }}
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN
            }}
          />
        </Suspense>
      </Canvas>

      {/* Sacred UI Overlay */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 text-amber-900 bg-white/15 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-amber-200/40 max-w-xs sm:max-w-sm">
        <h1 className="text-lg sm:text-3xl font-bold mb-1 sm:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">
          श्रीकृष्ण की बांसुरी
        </h1>
        <h2 className="text-sm sm:text-xl font-semibold mb-1">Krishna&apos;s Divine Flute</h2>
        <p className="text-xs sm:text-sm opacity-80">Perfect Alignment & 360° View</p>
        <div className="mt-2 sm:mt-3 text-xs opacity-70 space-y-1">
          <p>• Holes perfectly perpendicular to flute</p>
          <p>• Traditional Sa Re Ga Ma Pa Dha Ni Sa scale</p>
          <p>• Authentic bamboo proportions</p>
          <p>• Complete 360° rotatable view</p>
        </div>
      </div>

      {/* Controls info - Hidden on mobile, shown on desktop */}
      <div className="hidden sm:block absolute bottom-6 right-6 text-amber-800 bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-amber-200/40">
        <div className="text-sm space-y-1">
          <p className="font-medium">360° View Controls:</p>
                          <p>Drag to rotate freely</p>
                      <p>Scroll to zoom in/out</p>
            <p>Right-click + drag to pan</p>
                          <p>Holes perfectly aligned!</p>
        </div>
      </div>

      {/* Note information - Hidden on mobile, shown on desktop */}
      <div className="hidden sm:block absolute top-6 right-6 text-amber-800 bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-amber-200/40">
        <div className="text-sm">
          <p className="font-medium mb-2">Flute Notes (Left to Right):</p>
          <div className="space-y-1 text-xs">
                            <p>Embouchure (Blow hole)</p>
                          <p>Sa (Do) - Base note</p>
              <p>Re (Re) - Second</p>
              <p>Ga (Mi) - Third</p>
              <p>Ma (Fa) - Fourth</p>
              <p>Pa (Sol) - Fifth</p>
              <p>Dha (La) - Sixth</p>
              <p>Ni (Ti) - Seventh</p>
          </div>
        </div>
      </div>

      {/* Sacred mantra - Mobile responsive */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-amber-800 bg-white/15 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-amber-200/40 max-w-xs sm:max-w-sm">
        <p className="text-xs sm:text-sm font-medium italic">&ldquo;वेणुगोपाल गोविन्द मुकुन्द शौरि नन्दन&rdquo;</p>
        <p className="text-xs opacity-70 mt-1">Venugopala Govinda Mukunda Shauri Nandana</p>
      </div>

      {/* Performance indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-amber-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-amber-800 mb-2">Loading Sacred Flute</h2>
            <p className="text-amber-700">Aligning holes perfectly...</p>
          </div>
        </div>
      )}
    </div>
  )
} 