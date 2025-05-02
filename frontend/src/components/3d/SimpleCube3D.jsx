import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import {
  isWebGLSupported,
  createCSSCube,
  manageWebGLContext,
  releaseWebGLContext
} from '../../utils/webglUtils';
import '../../styles/3d.css';

/**
 * A simple 3D cube component with WebGL fallback
 * @param {Object} props - Component props
 * @returns {JSX.Element} - The rendered component
 */
const SimpleCube3D = ({
  size = 120,
  autoRotate = true,
  color = null,
  title = null,
  icon = null
}) => {
  const mountRef = useRef(null);
  const { theme, currentTheme } = useTheme();
  const [renderMode, setRenderMode] = useState('loading');
  const [errorOccurred, setErrorOccurred] = useState(false);

  // Use theme color if no color is provided
  const cubeColor = color || theme.primary;

  useEffect(() => {
    // Check if WebGL is supported
    if (!isWebGLSupported()) {
      console.log("WebGL not supported, using CSS fallback");
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

      // Renderer setup with context management
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default', // Use 'low-power' for better battery life
        preserveDrawingBuffer: false // Better performance
      });

      // Manage the WebGL context to prevent "Too many contexts" error
      manageWebGLContext(renderer.getContext());

      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance

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
      const cubeMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(cubeColor),
        metalness: 0.2,
        roughness: 0.3,
        clearcoat: 0.5,
        clearcoatRoughness: 0.2
      });

      // Create cube
      const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      scene.add(cube);

      // Add subtle glow effect using a simple approach
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(currentTheme === 'light' ? 0x88aaff : 0x4466aa),
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide
      });

      const glowGeometry = new THREE.SphereGeometry(2.2, 32, 32);
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
      let time = 0;
      const animate = () => {
        requestAnimationFrame(animate);
        time += 0.01;

        if (autoRotate && !rotationPaused) {
          cube.rotation.x += rotationSpeed * 0.5;
          cube.rotation.y += rotationSpeed;

          // Add a subtle floating effect
          cube.position.y = Math.sin(time) * 0.1;

          // Sync glow with cube
          glowMesh.position.copy(cube.position);

          // Pulse the glow opacity
          glowMaterial.opacity = 0.2 + Math.sin(time * 2) * 0.05;
        }

        renderer.render(scene, camera);
      };

      // Start animation
      animate();

      // Set render mode to 3D
      setRenderMode('3d');

      // Cleanup
      return () => {
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
        renderer.domElement.removeEventListener('mouseenter', handleMouseEnter);
        renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
        renderer.domElement.removeEventListener('click', handleClick);

        if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }

        // Dispose all resources
        cubeGeometry.dispose();
        glowGeometry.dispose();
        cubeMaterial.dispose();
        glowMaterial.dispose();

        // Release the WebGL context
        releaseWebGLContext(renderer.getContext());
        renderer.dispose();
      };
    } catch (error) {
      console.error("Error in 3D rendering:", error);
      setErrorOccurred(true);
      setRenderMode('css');
    }
  }, [size, autoRotate, cubeColor, currentTheme]);

  // If we're using CSS mode or had an error, render the CSS cube
  if (renderMode === 'css' || errorOccurred) {
    useEffect(() => {
      if (mountRef.current) {
        // Clear any existing content
        mountRef.current.innerHTML = '';

        // Create and append CSS cube with icon if provided
        const cssCube = createCSSCube({
          size: size,
          color: cubeColor,
          animate: autoRotate,
          glow: true,
          icon: icon // Pass the icon if provided
        });

        mountRef.current.appendChild(cssCube);
      }

      return () => {
        if (mountRef.current) {
          mountRef.current.innerHTML = '';
        }
      };
    }, [size, cubeColor, autoRotate, icon]);
  }

  return (
    <div className="cube-container">
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
      {title && <div className="cube-title">{title}</div>}
    </div>
  );
};

export default SimpleCube3D;
