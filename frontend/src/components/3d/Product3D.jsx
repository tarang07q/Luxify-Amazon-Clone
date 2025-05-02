import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

const Product3D = ({ size = 120, autoRotate = true }) => {
  const mountRef = useRef(null);
  const { theme, currentTheme } = useTheme();

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Clear previous canvas if any
    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create a cube
    const cubeSize = 1.5;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // Create materials for each face with different colors
    const primaryColor = new THREE.Color(theme.primary);
    const secondaryColor = new THREE.Color(theme.secondary);

    // Create a gradient-like effect with different shades
    const materials = [
      new THREE.MeshStandardMaterial({ color: primaryColor.clone().multiplyScalar(1.2), metalness: 0.5, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: primaryColor.clone().multiplyScalar(0.8), metalness: 0.5, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: secondaryColor.clone().multiplyScalar(1.2), metalness: 0.5, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: secondaryColor.clone().multiplyScalar(0.8), metalness: 0.5, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: primaryColor, metalness: 0.5, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: secondaryColor, metalness: 0.5, roughness: 0.2 })
    ];

    // Create cube with materials
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Add edges to the cube for better definition
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: currentTheme === 'light' ? 0x000000 : 0xffffff,
      transparent: true,
      opacity: 0.3
    });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    cube.add(edges);

    // Animation
    let rotationSpeed = 0.005;
    let rotationPaused = false;

    // Mouse interaction handlers
    const handleMouseEnter = () => {
      rotationSpeed = 0.01;
    };

    const handleMouseLeave = () => {
      rotationSpeed = 0.005;
    };

    const handleClick = () => {
      rotationPaused = !rotationPaused;
    };

    // Add event listeners
    renderer.domElement.addEventListener('mouseenter', handleMouseEnter);
    renderer.domElement.addEventListener('mouseleave', handleMouseLeave);
    renderer.domElement.addEventListener('click', handleClick);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      if (autoRotate && !rotationPaused) {
        // Rotate the cube
        cube.rotation.y += rotationSpeed;
        cube.rotation.x += rotationSpeed * 0.5;

        // Add a subtle floating effect
        cube.position.y = Math.sin(time) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener('mouseenter', handleMouseEnter);
      renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
      renderer.domElement.removeEventListener('click', handleClick);

      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose all resources
      geometry.dispose();
      edgesGeometry.dispose();
      materials.forEach(material => material.dispose());
      edgesMaterial.dispose();

      renderer.dispose();
    };
  }, [size, autoRotate, theme, currentTheme]);

  return (
    <div
      ref={mountRef}
      style={{
        width: size,
        height: size,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  );
};

export default Product3D;
