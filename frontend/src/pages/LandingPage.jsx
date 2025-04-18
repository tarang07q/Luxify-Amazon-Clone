import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PresentationControls, useGLTF, Environment, Stars } from '@react-three/drei';
import { FaShoppingBag, FaShoppingCart, FaTag, FaCreditCard, FaGift } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

// Shopping-related 3D Models for Hero Section
const ShoppingBagModel = ({ position, color, scale = 1, rotation = [0, 0, 0] }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1 + rotation[1];
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1 + position[1];
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale} ref={groupRef}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 0.3]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.5}
          roughness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.1} />
      </mesh>
      <mesh position={[-0.3, 1.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 16]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.1} />
      </mesh>
    </group>
  );
};

const ShoppingCartModel = ({ position, color, scale = 1, rotation = [0, 0, 0] }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15 + rotation[1];
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05 + position[1];
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale} ref={groupRef}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.6, 0.8]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.5}
          roughness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh position={[-0.4, -0.5, 0.3]} castShadow>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.4, -0.5, 0.3]} castShadow>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
};

const TagModel = ({ position, color, scale = 1, rotation = [0, 0, 0] }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1 + Math.PI / 4;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.08 + position[1];
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]} castShadow receiveShadow ref={groupRef}>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.5}
          roughness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh position={[0.3, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#fff" metalness={0.5} roughness={0.1} emissive="#fff" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

const CreditCardModel = ({ position, color, scale = 1, rotation = [0, 0, 0] }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.25) * 0.2 + rotation[1];
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale} ref={groupRef}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.9, 0.05]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.6}
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={2.0}
        />
      </mesh>
      <mesh position={[-0.4, 0.2, 0.03]} castShadow>
        <boxGeometry args={[0.4, 0.2, 0.02]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.05} emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

const GiftModel = ({ position, color, scale = 1, rotation = [0, 0, 0] }) => {
  const groupRef = useRef();
  const ribbonRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15 + rotation[1];
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1 + position[1];
    }
    if (ribbonRef.current) {
      ribbonRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale} ref={groupRef}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.4}
          roughness={0.1}
          clearcoat={0.7}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.2, 0.2, 1.2]} />
        <meshPhysicalMaterial
          color="#FF6B6B"
          metalness={0.5}
          roughness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      <group ref={ribbonRef}>
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
          <meshStandardMaterial color="#FF6B6B" metalness={0.7} roughness={0.1} emissive="#FF6B6B" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, -Math.PI / 4, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
          <meshStandardMaterial color="#FF6B6B" metalness={0.7} roughness={0.1} emissive="#FF6B6B" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </group>
  );
};

const HeroModel = () => {
  const { currentTheme } = useTheme();
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  // Adjust spacing and positioning for better visual appeal
  return (
    <group ref={groupRef}>
      <spotLight
        position={[0, 5, 0]}
        intensity={0.6}
        castShadow
        penumbra={1}
        angle={0.5}
        color={currentTheme === 'light' ? '#ffffff' : '#a0a0ff'}
      />
      <ShoppingBagModel position={[-2, 0.2, 0]} color="#6366F1" scale={0.9} rotation={[0, Math.PI / 6, 0]} />
      <ShoppingCartModel position={[-1, -0.1, 0]} color="#EC4899" scale={0.9} rotation={[0, -Math.PI / 8, 0]} />
      <TagModel position={[0, 0.3, 0]} color="#10B981" scale={1.2} rotation={[0, Math.PI / 4, 0]} />
      <CreditCardModel position={[1, 0, 0]} color="#3B82F6" scale={0.9} rotation={[0, Math.PI / 8, 0]} />
      <GiftModel position={[2, 0.1, 0]} color="#F59E0B" scale={0.9} rotation={[0, -Math.PI / 6, 0]} />
    </group>
  );
};

const LandingPage = () => {
  const { theme, currentTheme } = useTheme();

  return (
    <div className="landing-page" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Hero Section */}
      <section className="hero-section py-20" style={{
        background: currentTheme === 'light'
          ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)'
          : 'linear-gradient(135deg, #1E3A8A 0%, #5B21B6 50%, #831843 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '0 0 20px 20px'
      }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Luxify</h1>
              <p className="text-xl mb-8">
                Discover premium products with an immersive shopping experience.
                Explore our vast collection of high-quality items at competitive prices.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="flex items-center font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{
                  backgroundColor: '#ffffff',
                  color: '#6366F1',
                }}>
                  <FaShoppingBag className="mr-2" /> Start Shopping
                </Link>
                <Link to="/about" className="flex items-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 h-64 md:h-96">
              <div className="w-full h-full">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }} shadows style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <color attach="background" args={[currentTheme === 'light' ? 'transparent' : '#050A1C']} />
                  <fog attach="fog" args={[currentTheme === 'light' ? 'transparent' : '#050A1C', 8, 15]} />
                  <ambientLight intensity={0.7} />
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1.8}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                  />
                  <pointLight position={[-10, -10, -10]} intensity={0.8} color={currentTheme === 'light' ? '#fff' : '#aaa'} />
                  <directionalLight
                    position={[-5, 5, 5]}
                    intensity={0.8}
                    castShadow
                    color={currentTheme === 'light' ? '#fff' : '#aaa'}
                  />
                  {currentTheme === 'dark' && (
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                  )}
                  <PresentationControls
                    global
                    zoom={0.9}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                  >
                    <group position={[0, 0, 0]}>
                      {/* Removed the floor plane */}
                      <HeroModel />
                    </group>
                  </PresentationControls>
                  <Environment preset={currentTheme === 'light' ? 'sunset' : 'night'} />
                  <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
