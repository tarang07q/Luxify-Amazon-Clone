import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const Logo = ({ color = '#ff9900' }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });
  
  return (
    <group ref={mesh}>
      <Text
        fontSize={1.5}
        color={color}
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0]}
        font="/fonts/Inter-Bold.woff"
      >
        Amazer
      </Text>
      <mesh position={[3.5, 0, -0.5]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const Logo3D = ({ width = 150, height = 50, color = '#ff9900' }) => {
  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Logo color={color} />
      </Canvas>
    </div>
  );
};

export default Logo3D;
