import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import SimpleCube from './SimpleCube';
import { createGlowMaterial } from '../../utils/shaderUtils';
import '../../styles/3d.css';

const Order3D = ({ size = 120, autoRotate = true }) => {
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
    const boxMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.primary),
      metalness: 0.2,
      roughness: 0.3,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2
    });

    const tapeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.secondary),
      metalness: 0.1,
      roughness: 0.4
    });

    const labelMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      metalness: 0.0,
      roughness: 0.9
    });

    const textMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#000000'),
      metalness: 0.0,
      roughness: 1.0
    });

    // Create shipping box
    const boxGeometry = new THREE.BoxGeometry(1.5, 1, 1);
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);

    // Create tape across the top
    const tapeGeometry = new THREE.BoxGeometry(1.6, 0.1, 0.1);
    const tape = new THREE.Mesh(tapeGeometry, tapeMaterial);
    tape.position.set(0, 0.5, 0);
    scene.add(tape);

    // Create cross tape
    const crossTapeGeometry = new THREE.BoxGeometry(0.1, 0.1, 1.1);
    const crossTape = new THREE.Mesh(crossTapeGeometry, tapeMaterial);
    crossTape.position.set(0, 0.5, 0);
    scene.add(crossTape);

    // Create shipping label
    const labelGeometry = new THREE.PlaneGeometry(0.8, 0.6);
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(0, 0, 0.51);
    scene.add(label);

    // Create barcode lines (simplified)
    const createBarcodeLine = (x, height) => {
      const lineGeometry = new THREE.BoxGeometry(0.03, height, 0.01);
      const line = new THREE.Mesh(lineGeometry, textMaterial);
      line.position.set(x, 0.15, 0.52);
      scene.add(line);
      return line;
    };

    const barcodeLines = [];
    for (let i = 0; i < 8; i++) {
      const x = -0.3 + i * 0.08;
      const height = 0.1 + Math.random() * 0.1;
      barcodeLines.push(createBarcodeLine(x, height));
    }

    // Create address lines (simplified)
    const createAddressLine = (y, width) => {
      const lineGeometry = new THREE.BoxGeometry(width, 0.03, 0.01);
      const line = new THREE.Mesh(lineGeometry, textMaterial);
      line.position.set(-0.1, y, 0.52);
      scene.add(line);
      return line;
    };

    const addressLines = [];
    for (let i = 0; i < 3; i++) {
      const y = -0.1 - i * 0.08;
      const width = 0.4 + Math.random() * 0.2;
      addressLines.push(createAddressLine(y, width));
    }

    // Create shipping status stamp
    const stampGeometry = new THREE.CircleGeometry(0.2, 32);
    const stamp = new THREE.Mesh(stampGeometry, new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.accent),
      metalness: 0.0,
      roughness: 0.9,
      transparent: true,
      opacity: 0.8
    }));
    stamp.position.set(0.4, 0.2, 0.51);
    stamp.rotation.z = -Math.PI * 0.1;
    scene.add(stamp);

    // Group all objects
    const orderGroup = new THREE.Group();
    orderGroup.add(box, tape, crossTape, label, stamp);
    barcodeLines.forEach(line => orderGroup.add(line));
    addressLines.forEach(line => orderGroup.add(line));
    scene.add(orderGroup);

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
      const intersects = raycaster.intersectObject(orderGroup, true);

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
        orderGroup.rotation.y += rotationSpeed;

        // Add a subtle floating effect
        orderGroup.position.y = Math.sin(time) * 0.1;

        // Sync glow with order
        glowMesh.position.copy(orderGroup.position);

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
      boxGeometry.dispose();
      tapeGeometry.dispose();
      crossTapeGeometry.dispose();
      labelGeometry.dispose();
      stampGeometry.dispose();
      glowGeometry.dispose();

      boxMaterial.dispose();
      tapeMaterial.dispose();
      labelMaterial.dispose();
      textMaterial.dispose();
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

export default Order3D;
