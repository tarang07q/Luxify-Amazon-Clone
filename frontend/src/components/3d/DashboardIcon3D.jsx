import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../../context/ThemeContext';
import * as THREE from 'three';
import Dashboard3D from './Dashboard3D';
import LargeCube from './LargeCube';
import SimpleCube from './SimpleCube';
import '../../styles/3d.css';

// Base 3D Icon component that will be used for all dashboard icons
const Icon3D = ({
  geometry,
  color,
  hoverColor,
  isHovered = false,
  rotationSpeed = 0.01,
  floatIntensity = 0.1,
  floatSpeed = 1,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
  const meshRef = useRef();
  const initialY = position[1];

  // Handle animation
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += rotationSpeed;

      // Floating animation
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * floatSpeed) * floatIntensity;
    }
  });

  // Create material with proper color and effects
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(isHovered ? hoverColor : color),
    metalness: 0.2,
    roughness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    reflectivity: 1,
    envMapIntensity: 1.5,
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
      castShadow
    >
      {geometry}
      <primitive object={material} attach="material" />
    </mesh>
  );
};

// Specific icon implementations
const SalesIcon = (props) => (
  <Icon3D
    {...props}
    geometry={<cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />}
    rotationSpeed={0.005}
  />
);

const OrdersIcon = (props) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += props.rotationSpeed || 0.005;
    }
  });

  return (
    <group ref={groupRef} position={props.position} scale={[props.scale, props.scale, props.scale]}>
      <Icon3D
        {...props}
        geometry={<boxGeometry args={[1, 0.7, 1]} />}
        position={[0, 0, 0]}
        rotationSpeed={0}
      />
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
        <meshStandardMaterial color={props.color} metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
};

const ProductsIcon = (props) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += props.rotationSpeed || 0.005;
    }
  });

  return (
    <group ref={groupRef} position={props.position} scale={[props.scale, props.scale, props.scale]}>
      <mesh position={[-0.4, -0.2, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshPhysicalMaterial
          color={props.color}
          metalness={0.2}
          roughness={0.1}
          clearcoat={0.8}
        />
      </mesh>
      <mesh position={[0.4, 0.2, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshPhysicalMaterial
          color={props.color}
          metalness={0.2}
          roughness={0.1}
          clearcoat={0.8}
        />
      </mesh>
    </group>
  );
};

const LowStockIcon = (props) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += props.rotationSpeed || 0.005;
      // Add a slight pulsing effect for warning
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1;
      groupRef.current.scale.set(pulse * props.scale, pulse * props.scale, pulse * props.scale);
    }
  });

  return (
    <group ref={groupRef} position={props.position}>
      <mesh position={[0, 0, 0]} castShadow>
        <tetrahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={props.color}
          metalness={0.2}
          roughness={0.1}
          clearcoat={0.8}
          emissive={props.color}
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

const ChartIcon = (props) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += props.rotationSpeed || 0.005;
    }
  });

  return (
    <group ref={groupRef} position={props.position} scale={[props.scale, props.scale, props.scale]}>
      <mesh position={[-0.5, -0.5, 0]} castShadow>
        <boxGeometry args={[0.3, 0.5, 0.3]} />
        <meshPhysicalMaterial color={props.color} metalness={0.2} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[0.3, 0.9, 0.3]} />
        <meshPhysicalMaterial color={props.color} metalness={0.2} roughness={0.1} />
      </mesh>
      <mesh position={[0.5, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 1.5, 0.3]} />
        <meshPhysicalMaterial color={props.color} metalness={0.2} roughness={0.1} />
      </mesh>
    </group>
  );
};

const PieChartIcon = (props) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += props.rotationSpeed || 0.005;
    }
  });

  return (
    <group ref={groupRef} position={props.position} scale={[props.scale, props.scale, props.scale]}>
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshPhysicalMaterial color={props.color} metalness={0.2} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.11, 0]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[1, 1, 0.02, 32, 1, false, 0, Math.PI * 0.6]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.3}
          roughness={0.1}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
};

const AddIcon = (props) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += props.rotationSpeed || 0.005;
    }
  });

  return (
    <group ref={groupRef} position={props.position} scale={[props.scale, props.scale, props.scale]}>
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshPhysicalMaterial color={props.color} metalness={0.2} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.11, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 1.2, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.11, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[0.3, 1.2, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

// Main component that renders the appropriate 3D icon
const DashboardIcon3D = ({
  type,
  width = 60,
  height = 60,
  color,
  hoverColor,
  isHovered = false,
  scale = 1,
}) => {
  const { theme } = useTheme();
  const [hasError, setHasError] = useState(false);

  // Use theme colors if not explicitly provided
  const iconColor = color || theme.primary;
  const iconHoverColor = hoverColor || theme.secondary;

  // Check for WebGL support
  const checkWebGLSupport = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  };

  // If WebGL is not supported or we've had errors, use the CSS cube
  if (!checkWebGLSupport() || hasError) {
    return (
      <div style={{ width: `${width}px`, height: `${height}px` }}>
        <SimpleCube size={Math.min(width, height)} />
      </div>
    );
  }

  // Use the appropriate 3D component based on the type
  switch (type) {
    case 'sales':
      return (
        <div style={{ width: `${width}px`, height: `${height}px` }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <SalesIcon
              color={iconColor}
              hoverColor={iconHoverColor}
              isHovered={isHovered}
              scale={scale * 0.8}
            />
          </Canvas>
        </div>
      );
    case 'orders':
      return (
        <div style={{ width: `${width}px`, height: `${height}px` }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrdersIcon
              color={iconColor}
              hoverColor={iconHoverColor}
              isHovered={isHovered}
              scale={scale * 0.8}
            />
          </Canvas>
        </div>
      );
    case 'products':
      return (
        <div style={{ width: `${width}px`, height: `${height}px` }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <ProductsIcon
              color={iconColor}
              hoverColor={iconHoverColor}
              isHovered={isHovered}
              scale={scale * 0.8}
            />
          </Canvas>
        </div>
      );
    case 'lowstock':
      return (
        <div style={{ width: `${width}px`, height: `${height}px` }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <LowStockIcon
              color={iconColor}
              hoverColor={iconHoverColor}
              isHovered={isHovered}
              scale={scale * 0.8}
            />
          </Canvas>
        </div>
      );
    case 'chart':
      return (
        <div style={{ width: `${width}px`, height: `${height}px` }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <ChartIcon
              color={iconColor}
              hoverColor={iconHoverColor}
              isHovered={isHovered}
              scale={scale * 0.8}
            />
          </Canvas>
        </div>
      );
    case 'piechart':
      return (
        <div style={{ width: `${width}px`, height: `${height}px` }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <PieChartIcon
              color={iconColor}
              hoverColor={iconHoverColor}
              isHovered={isHovered}
              scale={scale * 0.8}
            />
          </Canvas>
        </div>
      );
    case 'add':
      return (
        <div style={{ width: `${width}px`, height: `${height}px` }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AddIcon
              color={iconColor}
              hoverColor={iconHoverColor}
              isHovered={isHovered}
              scale={scale * 0.8}
            />
          </Canvas>
        </div>
      );
    case 'dashboard':
      return (
        <div style={{ width: `${width}px`, height: `${height}px` }}>
          <Dashboard3D
            size={Math.max(width, height)}
            autoRotate={true}
          />
        </div>
      );
    default:
      return (
        <div style={{ width: `${width}px`, height: `${height}px` }}>
          <LargeCube
            size={Math.max(width, height)}
            autoRotate={true}
            onError={() => setHasError(true)}
          />
        </div>
      );
  }
};

export default DashboardIcon3D;
