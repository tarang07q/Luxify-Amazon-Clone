import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import SimpleCube from './SimpleCube';
import { createGlowMaterial } from '../../utils/shaderUtils';
import '../../styles/3d.css';

const Dashboard3D = ({ size = 120, autoRotate = true }) => {
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
    const baseMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.primary),
      metalness: 0.3,
      roughness: 0.2,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2
    });

    const screenMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#111111'),
      metalness: 0.1,
      roughness: 0.2,
      emissive: new THREE.Color('#3b82f6'),
      emissiveIntensity: 0.5
    });

    const chartMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.accent),
      metalness: 0.1,
      roughness: 0.3,
      emissive: new THREE.Color(theme.accent),
      emissiveIntensity: 0.3
    });

    const detailMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.secondary),
      metalness: 0.2,
      roughness: 0.3
    });

    // Create monitor base
    const baseGeometry = new THREE.BoxGeometry(1.8, 0.1, 0.8);
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.8;
    scene.add(base);

    // Create monitor stand
    const standGeometry = new THREE.BoxGeometry(0.2, 0.7, 0.2);
    const stand = new THREE.Mesh(standGeometry, baseMaterial);
    stand.position.y = -0.4;
    scene.add(stand);

    // Create monitor screen
    const screenGeometry = new THREE.BoxGeometry(2, 1.2, 0.1);
    const screen = new THREE.Mesh(screenGeometry, baseMaterial);
    screen.position.y = 0.2;
    scene.add(screen);

    // Create screen display
    const displayGeometry = new THREE.BoxGeometry(1.8, 1, 0.01);
    const display = new THREE.Mesh(displayGeometry, screenMaterial);
    display.position.set(0, 0.2, 0.06);
    scene.add(display);

    // Create chart bars on screen
    const createBar = (x, height, width = 0.15) => {
      const barGeometry = new THREE.BoxGeometry(width, height, 0.02);
      const bar = new THREE.Mesh(barGeometry, chartMaterial);
      bar.position.set(x, 0.2 - (1 - height) / 2, 0.07);
      scene.add(bar);
      return bar;
    };

    const bars = [];
    const barHeights = [0.3, 0.5, 0.7, 0.4, 0.6, 0.8];

    for (let i = 0; i < barHeights.length; i++) {
      const x = -0.75 + i * 0.3;
      bars.push(createBar(x, barHeights[i]));
    }

    // Create keyboard
    const keyboardGeometry = new THREE.BoxGeometry(1.4, 0.1, 0.6);
    const keyboard = new THREE.Mesh(keyboardGeometry, baseMaterial);
    keyboard.position.set(0, -0.8, 0.7);
    scene.add(keyboard);

    // Create keyboard keys (simplified)
    const keysGeometry = new THREE.BoxGeometry(1.3, 0.02, 0.5);
    const keys = new THREE.Mesh(keysGeometry, new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#dddddd'),
      metalness: 0.1,
      roughness: 0.5
    }));
    keys.position.set(0, -0.74, 0.7);
    scene.add(keys);

    // Create mouse
    const mouseGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.5);
    const mouse = new THREE.Mesh(mouseGeometry, detailMaterial);
    mouse.position.set(0.8, -0.8, 0.7);
    scene.add(mouse);

    // Create coffee mug
    const mugBaseGeometry = new THREE.CylinderGeometry(0.15, 0.12, 0.3, 16);
    const mugBase = new THREE.Mesh(mugBaseGeometry, detailMaterial);
    mugBase.position.set(-0.8, -0.65, 0.7);
    scene.add(mugBase);

    const mugHandleGeometry = new THREE.TorusGeometry(0.08, 0.03, 16, 32, Math.PI);
    const mugHandle = new THREE.Mesh(mugHandleGeometry, detailMaterial);
    mugHandle.position.set(-0.95, -0.65, 0.7);
    mugHandle.rotation.y = Math.PI * 0.5;
    scene.add(mugHandle);

    const coffeeGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 16);
    const coffee = new THREE.Mesh(coffeeGeometry, new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#6b4f35'),
      metalness: 0.1,
      roughness: 0.5
    }));
    coffee.position.set(-0.8, -0.5, 0.7);
    scene.add(coffee);

    // Group all objects
    const dashboardGroup = new THREE.Group();
    dashboardGroup.add(base, stand, screen, display, keyboard, keys, mouse, mugBase, mugHandle, coffee);
    bars.forEach(bar => dashboardGroup.add(bar));
    scene.add(dashboardGroup);

    // Add subtle glow effect using our safe shader utility
    const glowColor = currentTheme === 'light' ? 0x88aaff : 0x4466aa;
    const glowMaterial = createGlowMaterial(glowColor, 0.2);

    const glowGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Animation
    let rotationSpeed = 0.005;
    let rotationPaused = false;

    // Add interaction
    const raycaster = new THREE.Raycaster();
    const mouse3D = new THREE.Vector2();

    // Mouse interaction handlers
    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse3D.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse3D.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse3D, camera);
      const intersects = raycaster.intersectObject(dashboardGroup, true);

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
        dashboardGroup.rotation.y += rotationSpeed;

        // Add a subtle floating effect
        dashboardGroup.position.y = Math.sin(time) * 0.05;

        // Sync glow with dashboard
        glowMesh.position.copy(dashboardGroup.position);

        // Pulse the glow intensity
        const pulseValue = 0.2 + Math.sin(time * 2) * 0.05;
        if (glowMaterial.uniforms && glowMaterial.uniforms.c) {
          glowMaterial.uniforms.c.value = pulseValue;
        }

        // Animate chart bars
        bars.forEach((bar, index) => {
          const newHeight = barHeights[index] + Math.sin(time * (1 + index * 0.1)) * 0.1;
          bar.scale.y = newHeight / barHeights[index];
          bar.position.y = 0.2 - (1 - newHeight) / 2;
        });

        // Pulse the screen brightness
        if (screenMaterial.emissiveIntensity) {
          screenMaterial.emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.1;
          screenMaterial.needsUpdate = true;
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
      baseGeometry.dispose();
      standGeometry.dispose();
      screenGeometry.dispose();
      displayGeometry.dispose();
      keyboardGeometry.dispose();
      keysGeometry.dispose();
      mouseGeometry.dispose();
      mugBaseGeometry.dispose();
      mugHandleGeometry.dispose();
      coffeeGeometry.dispose();
      glowGeometry.dispose();

      baseMaterial.dispose();
      screenMaterial.dispose();
      chartMaterial.dispose();
      detailMaterial.dispose();
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

export default Dashboard3D;
