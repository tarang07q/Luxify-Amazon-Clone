import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

const ModernCube = ({ size = 120, autoRotate = true, faceColors = null }) => {
  const mountRef = useRef(null);
  const { theme, currentTheme } = useTheme();

  useEffect(() => {
    // Only initialize if the component is mounted
    if (!mountRef.current) return;

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Default colors based on theme
    const defaultColors = {
      light: [
        theme.primary,    // Right face
        theme.secondary,  // Left face
        theme.accent,     // Top face
        theme.success,    // Bottom face
        theme.info,       // Front face
        theme.warning     // Back face
      ],
      dark: [
        theme.primary,    // Right face
        theme.secondary,  // Left face
        theme.accent,     // Top face
        theme.success,    // Bottom face
        theme.info,       // Back face
        theme.warning     // Front face
      ]
    };

    // Use provided colors or default colors based on theme
    const colors = faceColors || defaultColors[currentTheme];

    // Create cube geometry
    const geometry = new THREE.BoxGeometry(2, 2, 2);

    // Create materials for each face
    const materials = colors.map(color => {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
        reflectivity: 1,
        envMapIntensity: 1.5,
      });
    });

    // Create cube mesh with materials
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Add subtle edge highlighting
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: currentTheme === 'light' ? 0xdddddd : 0x333333,
      transparent: true,
      opacity: 0.5
    });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    cube.add(edges);

    // Animation
    let rotationSpeed = 0.005;
    let rotationPaused = false;

    // Add interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Mouse interaction handlers
    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(cube);

      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        rotationSpeed = 0.01;
      } else {
        document.body.style.cursor = 'default';
        rotationSpeed = 0.005;
      }
    };

    const handleMouseEnter = () => {
      rotationSpeed = 0.01;
    };

    const handleMouseLeave = () => {
      rotationSpeed = 0.005;
      document.body.style.cursor = 'default';
    };

    const handleClick = () => {
      rotationPaused = !rotationPaused;
    };

    // Add event listeners
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseenter', handleMouseEnter);
    renderer.domElement.addEventListener('mouseleave', handleMouseLeave);
    renderer.domElement.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate);

      if (autoRotate && !rotationPaused) {
        cube.rotation.x += rotationSpeed * 0.5;
        cube.rotation.y += rotationSpeed;
      }

      renderer.render(scene, camera);

      return () => {
        cancelAnimationFrame(animationId);
      };
    };

    const animationCleanup = animate();

    // Cleanup
    return () => {
      if (animationCleanup) {
        animationCleanup();
      }

      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseenter', handleMouseEnter);
      renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
      renderer.domElement.removeEventListener('click', handleClick);

      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose resources
      geometry.dispose();
      materials.forEach(material => material.dispose());
      renderer.dispose();
    };
  }, [size, autoRotate, theme, currentTheme, faceColors]);

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

export default ModernCube;
