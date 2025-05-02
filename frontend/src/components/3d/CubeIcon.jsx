import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { FaCube } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import SimpleCube from './SimpleCube';
import '../../styles/3d.css';

const CubeIcon = ({
  iconType,
  size = 100,
  autoRotate = true,
  color = null,
  hoverEffect = true
}) => {
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Determine icon color
    const iconColor = color || theme.primary;

    // Create base cube
    const cubeGeometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    const cubeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(iconColor),
      metalness: 0.1,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      reflectivity: 1,
      envMapIntensity: 1.5,
      transparent: true,
      opacity: 0.9
    });

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    // Add subtle edge highlighting
    const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: currentTheme === 'light' ? 0xdddddd : 0x333333,
      transparent: true,
      opacity: 0.5
    });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    cube.add(edges);

    // Add icon-specific elements based on iconType
    let iconMesh;

    switch (iconType) {
      case 'cart':
        // Create a shopping cart icon on top of the cube
        const cartGroup = new THREE.Group();

        // Cart base
        const baseGeometry = new THREE.BoxGeometry(0.8, 0.4, 0.6);
        const baseMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.set(0, 1.2, 0);
        cartGroup.add(base);

        // Cart handle
        const handleGeometry = new THREE.TorusGeometry(0.3, 0.04, 16, 32, Math.PI);
        const handleMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9
        });
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.position.set(0, 1.5, 0);
        handle.rotation.x = Math.PI / 2;
        handle.rotation.z = Math.PI;
        cartGroup.add(handle);

        // Wheels
        const wheelGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const wheelMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9
        });

        const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel1.position.set(0.3, 1.0, 0.2);
        cartGroup.add(wheel1);

        const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel2.position.set(0.3, 1.0, -0.2);
        cartGroup.add(wheel2);

        const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel3.position.set(-0.3, 1.0, 0.2);
        cartGroup.add(wheel3);

        const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel4.position.set(-0.3, 1.0, -0.2);
        cartGroup.add(wheel4);

        scene.add(cartGroup);
        iconMesh = cartGroup;
        break;

      case 'user':
        // Create a user/profile icon on top of the cube
        const userGroup = new THREE.Group();

        // Head
        const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const headMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 1.5, 0);
        userGroup.add(head);

        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.6, 32);
        const bodyMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(0, 1.0, 0);
        userGroup.add(body);

        scene.add(userGroup);
        iconMesh = userGroup;
        break;

      case 'dashboard':
        // Create a dashboard/analytics icon on top of the cube
        const dashboardGroup = new THREE.Group();

        // Base panel
        const panelGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.1);
        const panelMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9
        });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panel.position.set(0, 1.2, 0);
        dashboardGroup.add(panel);

        // Bar charts
        const barMaterial = new THREE.MeshPhongMaterial({
          color: iconColor,
          transparent: true,
          opacity: 0.9
        });

        const bar1Geometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
        const bar1 = new THREE.Mesh(bar1Geometry, barMaterial);
        bar1.position.set(-0.4, 1.1, 0.1);
        dashboardGroup.add(bar1);

        const bar2Geometry = new THREE.BoxGeometry(0.1, 0.4, 0.1);
        const bar2 = new THREE.Mesh(bar2Geometry, barMaterial);
        bar2.position.set(-0.2, 1.15, 0.1);
        dashboardGroup.add(bar2);

        const bar3Geometry = new THREE.BoxGeometry(0.1, 0.2, 0.1);
        const bar3 = new THREE.Mesh(bar3Geometry, barMaterial);
        bar3.position.set(0, 1.05, 0.1);
        dashboardGroup.add(bar3);

        const bar4Geometry = new THREE.BoxGeometry(0.1, 0.35, 0.1);
        const bar4 = new THREE.Mesh(bar4Geometry, barMaterial);
        bar4.position.set(0.2, 1.125, 0.1);
        dashboardGroup.add(bar4);

        const bar5Geometry = new THREE.BoxGeometry(0.1, 0.25, 0.1);
        const bar5 = new THREE.Mesh(bar5Geometry, barMaterial);
        bar5.position.set(0.4, 1.075, 0.1);
        dashboardGroup.add(bar5);

        scene.add(dashboardGroup);
        iconMesh = dashboardGroup;
        break;

      case 'product':
        // Create a product/box icon on top of the cube
        const productGroup = new THREE.Group();

        // Box
        const boxGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        const boxMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9
        });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.set(0, 1.3, 0);
        productGroup.add(box);

        // Lid lines
        const edgesMaterial = new THREE.LineBasicMaterial({
          color: iconColor,
          transparent: true,
          opacity: 0.9
        });

        const topEdgesGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.81, 0.1, 0.81));
        const topEdges = new THREE.LineSegments(topEdgesGeometry, edgesMaterial);
        topEdges.position.set(0, 1.7, 0);
        productGroup.add(topEdges);

        scene.add(productGroup);
        iconMesh = productGroup;
        break;

      case 'order':
        // Create an order/clipboard icon on top of the cube
        const orderGroup = new THREE.Group();

        // Clipboard base
        const clipboardGeometry = new THREE.BoxGeometry(0.8, 1.0, 0.1);
        const clipboardMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9
        });
        const clipboard = new THREE.Mesh(clipboardGeometry, clipboardMaterial);
        clipboard.position.set(0, 1.3, 0);
        orderGroup.add(clipboard);

        // Clip at top
        const clipGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.1);
        const clipMaterial = new THREE.MeshPhongMaterial({
          color: iconColor,
          transparent: true,
          opacity: 0.9
        });
        const clip = new THREE.Mesh(clipGeometry, clipMaterial);
        clip.position.set(0, 1.8, 0.05);
        orderGroup.add(clip);

        // Paper lines
        const lineMaterial = new THREE.LineBasicMaterial({
          color: iconColor,
          transparent: true,
          opacity: 0.9
        });

        for (let i = 0; i < 4; i++) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-0.3, 1.5 - i * 0.2, 0.06),
            new THREE.Vector3(0.3, 1.5 - i * 0.2, 0.06)
          ]);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          orderGroup.add(line);
        }

        scene.add(orderGroup);
        iconMesh = orderGroup;
        break;

      default:
        // Default is just the cube
        iconMesh = cube;
    }

    // Animation
    let rotationSpeed = 0.005;
    let rotationPaused = false;

    // Add interaction if hover effect is enabled
    if (hoverEffect) {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      // Mouse interaction handlers
      const handleMouseMove = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(cube, true);

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

      // Cleanup event listeners
      return () => {
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
        renderer.domElement.removeEventListener('mouseenter', handleMouseEnter);
        renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
        renderer.domElement.removeEventListener('click', handleClick);

        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (autoRotate && !rotationPaused) {
        cube.rotation.x += rotationSpeed * 0.5;
        cube.rotation.y += rotationSpeed;

        if (iconMesh && iconMesh !== cube) {
          iconMesh.rotation.y = cube.rotation.y;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (mountRef.current && mountRef.current.firstChild) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
    } catch (error) {
      console.error("Error in 3D rendering:", error);
      setErrorOccurred(true);
      setRenderMode('css');
    }
  }, [iconType, size, autoRotate, theme, currentTheme, color, hoverEffect]);

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

export default CubeIcon;
