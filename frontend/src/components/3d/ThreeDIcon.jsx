import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useTheme } from '../../context/ThemeContext';

const ThreeDIcon = ({ iconType, size = 100, autoRotate = true, color }) => {
  const mountRef = useRef(null);
  const { theme, currentTheme } = useTheme();
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(theme.canvas3dBg);
    
    // Add fog for depth
    scene.fog = new THREE.Fog(theme.canvas3dFog, 5, 15);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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
    
    // Controls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 3;
    
    // Create geometry based on iconType
    let geometry;
    let material;
    let mesh;
    
    const iconColor = color || theme.primary;
    
    switch (iconType) {
      case 'cart':
        // Create a shopping cart icon
        const cartGroup = new THREE.Group();
        
        // Cart base
        const baseGeometry = new THREE.BoxGeometry(1.5, 0.8, 1);
        const baseMaterial = new THREE.MeshPhongMaterial({ 
          color: iconColor,
          flatShading: true
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -0.4;
        cartGroup.add(base);
        
        // Cart handle
        const handleGeometry = new THREE.TorusGeometry(0.5, 0.08, 16, 32, Math.PI);
        const handleMaterial = new THREE.MeshPhongMaterial({ 
          color: iconColor,
          flatShading: true
        });
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.position.set(0, 0.3, 0);
        handle.rotation.x = Math.PI / 2;
        handle.rotation.z = Math.PI;
        cartGroup.add(handle);
        
        // Wheels
        const wheelGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const wheelMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x333333,
          flatShading: true
        });
        
        const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel1.position.set(0.5, -0.8, 0.3);
        cartGroup.add(wheel1);
        
        const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel2.position.set(0.5, -0.8, -0.3);
        cartGroup.add(wheel2);
        
        const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel3.position.set(-0.5, -0.8, 0.3);
        cartGroup.add(wheel3);
        
        const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel4.position.set(-0.5, -0.8, -0.3);
        cartGroup.add(wheel4);
        
        scene.add(cartGroup);
        break;
        
      case 'user':
        // Create a user/profile icon
        const userGroup = new THREE.Group();
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const headMaterial = new THREE.MeshPhongMaterial({ 
          color: iconColor,
          flatShading: true
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 0.5;
        userGroup.add(head);
        
        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.7, 1.2, 32);
        const bodyMaterial = new THREE.MeshPhongMaterial({ 
          color: iconColor,
          flatShading: true
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = -0.6;
        userGroup.add(body);
        
        scene.add(userGroup);
        break;
        
      case 'dashboard':
        // Create a dashboard/analytics icon
        const dashboardGroup = new THREE.Group();
        
        // Base panel
        const panelGeometry = new THREE.BoxGeometry(2, 1.5, 0.1);
        const panelMaterial = new THREE.MeshPhongMaterial({ 
          color: iconColor,
          flatShading: true
        });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        dashboardGroup.add(panel);
        
        // Bar charts
        const barMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xffffff,
          flatShading: true
        });
        
        const bar1Geometry = new THREE.BoxGeometry(0.2, 0.6, 0.1);
        const bar1 = new THREE.Mesh(bar1Geometry, barMaterial);
        bar1.position.set(-0.7, -0.2, 0.1);
        dashboardGroup.add(bar1);
        
        const bar2Geometry = new THREE.BoxGeometry(0.2, 0.8, 0.1);
        const bar2 = new THREE.Mesh(bar2Geometry, barMaterial);
        bar2.position.set(-0.4, -0.1, 0.1);
        dashboardGroup.add(bar2);
        
        const bar3Geometry = new THREE.BoxGeometry(0.2, 0.4, 0.1);
        const bar3 = new THREE.Mesh(bar3Geometry, barMaterial);
        bar3.position.set(-0.1, -0.3, 0.1);
        dashboardGroup.add(bar3);
        
        const bar4Geometry = new THREE.BoxGeometry(0.2, 0.7, 0.1);
        const bar4 = new THREE.Mesh(bar4Geometry, barMaterial);
        bar4.position.set(0.2, -0.15, 0.1);
        dashboardGroup.add(bar4);
        
        const bar5Geometry = new THREE.BoxGeometry(0.2, 0.5, 0.1);
        const bar5 = new THREE.Mesh(bar5Geometry, barMaterial);
        bar5.position.set(0.5, -0.25, 0.1);
        dashboardGroup.add(bar5);
        
        scene.add(dashboardGroup);
        break;
        
      case 'product':
        // Create a product/box icon
        const productGroup = new THREE.Group();
        
        // Box
        const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const boxMaterial = new THREE.MeshPhongMaterial({ 
          color: iconColor,
          flatShading: true
        });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        productGroup.add(box);
        
        // Lid lines
        const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        
        const topEdgesGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.51, 0.1, 1.51));
        const topEdges = new THREE.LineSegments(topEdgesGeometry, edgesMaterial);
        topEdges.position.y = 0.75;
        productGroup.add(topEdges);
        
        scene.add(productGroup);
        break;
        
      case 'order':
        // Create an order/clipboard icon
        const orderGroup = new THREE.Group();
        
        // Clipboard base
        const clipboardGeometry = new THREE.BoxGeometry(1.5, 2, 0.1);
        const clipboardMaterial = new THREE.MeshPhongMaterial({ 
          color: iconColor,
          flatShading: true
        });
        const clipboard = new THREE.Mesh(clipboardGeometry, clipboardMaterial);
        orderGroup.add(clipboard);
        
        // Clip at top
        const clipGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.2);
        const clipMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xcccccc,
          flatShading: true
        });
        const clip = new THREE.Mesh(clipGeometry, clipMaterial);
        clip.position.y = 1;
        clip.position.z = 0.1;
        orderGroup.add(clip);
        
        // Paper lines
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        
        for (let i = 0; i < 5; i++) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-0.5, 0.7 - i * 0.3, 0.06),
            new THREE.Vector3(0.5, 0.7 - i * 0.3, 0.06)
          ]);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          orderGroup.add(line);
        }
        
        scene.add(orderGroup);
        break;
        
      default:
        // Default cube
        geometry = new THREE.BoxGeometry(2, 2, 2);
        material = new THREE.MeshPhongMaterial({ 
          color: iconColor,
          flatShading: true
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [iconType, size, autoRotate, theme, currentTheme, color]);
  
  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: size, 
        height: size, 
        margin: '0 auto',
        borderRadius: '50%',
        overflow: 'hidden'
      }}
    />
  );
};

export default ThreeDIcon;
