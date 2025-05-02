import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import SimpleCube from './SimpleCube';
import { createGlowMaterial } from '../../utils/shaderUtils';
import '../../styles/3d.css';

const ShoppingCart3D = ({ size = 120, autoRotate = true }) => {
  const mountRef = useRef(null);
  const { theme, currentTheme } = useTheme();
  const [renderMode, setRenderMode] = useState('3d');
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    // Check for WebGL support
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!gl) {
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGLSupport()) {
      setRenderMode('css');
      return;
    }

    try {
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

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Materials
    const cartMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.primary),
      metalness: 0.3,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2
    });

    const handleMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.secondary),
      metalness: 0.4,
      roughness: 0.2
    });

    const wheelMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.accent),
      metalness: 0.6,
      roughness: 0.3
    });

    // Create cart base
    const cartBaseGeometry = new THREE.BoxGeometry(1.5, 0.8, 1);
    const cartBase = new THREE.Mesh(cartBaseGeometry, cartMaterial);
    cartBase.position.y = -0.2;
    scene.add(cartBase);

    // Create cart front (slightly angled)
    const cartFrontGeometry = new THREE.BoxGeometry(1.5, 0.6, 0.1);
    const cartFront = new THREE.Mesh(cartFrontGeometry, cartMaterial);
    cartFront.position.set(0, 0.5, 0.5);
    cartFront.rotation.x = Math.PI * 0.1;
    scene.add(cartFront);

    // Create cart handle
    const handleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 16);
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(0, 0.7, -0.4);
    handle.rotation.x = Math.PI * 0.5;
    scene.add(handle);

    // Create handle grips (the part you hold)
    const gripGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.8, 16);
    const grip = new THREE.Mesh(gripGeometry, handleMaterial);
    grip.position.set(0, 1.1, -0.4);
    scene.add(grip);

    // Create wheels (4 of them)
    const wheelGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);

    // Front left wheel
    const wheelFL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFL.position.set(-0.6, -0.6, 0.4);
    wheelFL.rotation.x = Math.PI * 0.5;
    scene.add(wheelFL);

    // Front right wheel
    const wheelFR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFR.position.set(0.6, -0.6, 0.4);
    wheelFR.rotation.x = Math.PI * 0.5;
    scene.add(wheelFR);

    // Back left wheel
    const wheelBL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelBL.position.set(-0.6, -0.6, -0.4);
    wheelBL.rotation.x = Math.PI * 0.5;
    scene.add(wheelBL);

    // Back right wheel
    const wheelBR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelBR.position.set(0.6, -0.6, -0.4);
    wheelBR.rotation.x = Math.PI * 0.5;
    scene.add(wheelBR);

    // Create some items in the cart
    const item1Geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const item1Material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f59e0b'),
      metalness: 0.1,
      roughness: 0.5
    });
    const item1 = new THREE.Mesh(item1Geometry, item1Material);
    item1.position.set(-0.4, 0, 0);
    scene.add(item1);

    const item2Geometry = new THREE.SphereGeometry(0.2, 16, 16);
    const item2Material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#10b981'),
      metalness: 0.1,
      roughness: 0.5
    });
    const item2 = new THREE.Mesh(item2Geometry, item2Material);
    item2.position.set(0.3, 0, 0.2);
    scene.add(item2);

    const item3Geometry = new THREE.ConeGeometry(0.15, 0.3, 16);
    const item3Material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#3b82f6'),
      metalness: 0.1,
      roughness: 0.5
    });
    const item3 = new THREE.Mesh(item3Geometry, item3Material);
    item3.position.set(0, 0, -0.2);
    scene.add(item3);

    // Group all objects
    const cartGroup = new THREE.Group();
    cartGroup.add(cartBase, cartFront, handle, grip,
                 wheelFL, wheelFR, wheelBL, wheelBR,
                 item1, item2, item3);
    scene.add(cartGroup);

    // Add subtle glow effect using our safe shader utility
    const glowColor = currentTheme === 'light' ? 0x88aaff : 0x4466aa;
    const glowMaterial = createGlowMaterial(glowColor, 0.2);

    const glowGeometry = new THREE.SphereGeometry(2, 32, 32);
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

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
      const intersects = raycaster.intersectObject(cartGroup, true);

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
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      if (autoRotate && !rotationPaused) {
        cartGroup.rotation.y += rotationSpeed;

        // Add a subtle floating effect
        cartGroup.position.y = Math.sin(time) * 0.1;

        // Sync glow with cart
        glowMesh.position.copy(cartGroup.position);

        // Pulse the glow intensity
        const pulseValue = 0.2 + Math.sin(time * 2) * 0.05;
        if (glowMaterial.uniforms && glowMaterial.uniforms.c) {
          glowMaterial.uniforms.c.value = pulseValue;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseenter', handleMouseEnter);
      renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
      renderer.domElement.removeEventListener('click', handleClick);

      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose all resources
      cartBaseGeometry.dispose();
      cartFrontGeometry.dispose();
      handleGeometry.dispose();
      gripGeometry.dispose();
      wheelGeometry.dispose();
      item1Geometry.dispose();
      item2Geometry.dispose();
      item3Geometry.dispose();
      glowGeometry.dispose();

      cartMaterial.dispose();
      handleMaterial.dispose();
      wheelMaterial.dispose();
      item1Material.dispose();
      item2Material.dispose();
      item3Material.dispose();
      glowMaterial.dispose();

      renderer.dispose();
    };
    } catch (error) {
      console.error("Error in 3D rendering:", error);
      setErrorOccurred(true);
      setRenderMode('css');
    }
  }, [size, autoRotate, theme, currentTheme]);

  // If we're using CSS mode or had an error, render the SimpleCube
  if (renderMode === 'css' || errorOccurred) {
    return <SimpleCube size={size} />;
  }

  // Otherwise render the 3D component
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

export default ShoppingCart3D;
