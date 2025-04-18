import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Model component
const Model = ({ path, scale = 1, rotation = [0, 0, 0], position = [0, 0, 0], color = '#ff9900' }) => {
  const group = useRef();
  const { scene } = useGLTF(path);

  // Clone the scene to avoid modifying the original
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Apply material to all meshes
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          metalness: 0.5,
          roughness: 0.2,
        });
      }
    });
  }, [clonedScene, color]);

  // Rotate the model
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <primitive object={clonedScene} />
    </group>
  );
};

// Fallback component for when 3D is not available
const FallbackIcon = ({ icon, color = '#ff9900' }) => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ color: color, fontSize: '2rem' }}
    >
      {icon}
    </div>
  );
};

// Main component
const ProductIcon3D = ({
  modelPath,
  fallbackIcon,
  color = '#ff9900',
  scale = 1,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  width = 100,
  height = 100
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate loading the 3D model
    const timer = setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, randomly decide if 3D model loads successfully
      // In a real app, this would be based on actual model loading
      setHasError(Math.random() > 0.8); // 20% chance of error for demo
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded-md"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded-md"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <FallbackIcon icon={fallbackIcon} color={color} />
      </div>
    );
  }

  return (
    <div
      className="bg-gray-100 rounded-md overflow-hidden"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Model
            path={modelPath}
            scale={scale}
            rotation={rotation}
            position={position}
            color={color}
          />
        </PresentationControls>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ProductIcon3D;
