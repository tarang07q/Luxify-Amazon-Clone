import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import SimpleCube from './SimpleCube';
import { createGlowMaterial } from '../../utils/shaderUtils';
import '../../styles/3d.css';

const Profile3D = ({ size = 120, autoRotate = true }) => {
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
    const headMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.primary),
      metalness: 0.1,
      roughness: 0.4,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2
    });

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.secondary),
      metalness: 0.1,
      roughness: 0.4
    });

    const detailMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.accent),
      metalness: 0.2,
      roughness: 0.3
    });

    // Create head (sphere)
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.7;
    scene.add(head);

    // Create body (rounded rectangle)
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.5, 1.2, 32);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.3;
    scene.add(body);

    // Create shoulders
    const shoulderGeometry = new THREE.SphereGeometry(0.2, 16, 16);

    const leftShoulder = new THREE.Mesh(shoulderGeometry, bodyMaterial);
    leftShoulder.position.set(-0.5, 0.1, 0);
    scene.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeometry, bodyMaterial);
    rightShoulder.position.set(0.5, 0.1, 0);
    scene.add(rightShoulder);

    // Create arms
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 16);

    const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
    leftArm.position.set(-0.5, -0.3, 0);
    leftArm.rotation.z = Math.PI * 0.1;
    scene.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
    rightArm.position.set(0.5, -0.3, 0);
    rightArm.rotation.z = -Math.PI * 0.1;
    scene.add(rightArm);

    // Create eyes
    const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const eyeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      metalness: 0.1,
      roughness: 0.2
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 0.8, 0.4);
    scene.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 0.8, 0.4);
    scene.add(rightEye);

    // Create pupils
    const pupilGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    const pupilMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#000000'),
      metalness: 0.1,
      roughness: 0.2
    });

    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.15, 0.8, 0.47);
    scene.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.15, 0.8, 0.47);
    scene.add(rightPupil);

    // Create mouth
    const mouthGeometry = new THREE.TorusGeometry(0.15, 0.03, 16, 32, Math.PI);
    const mouth = new THREE.Mesh(mouthGeometry, pupilMaterial);
    mouth.position.set(0, 0.6, 0.45);
    mouth.rotation.x = Math.PI * 0.5;
    scene.add(mouth);

    // Create badge/ID card
    const badgeGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.05);
    const badge = new THREE.Mesh(badgeGeometry, detailMaterial);
    badge.position.set(0, -0.2, 0.3);
    scene.add(badge);

    // Create badge details (simplified)
    const badgeDetailGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.01);
    const badgeDetailMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      metalness: 0.0,
      roughness: 0.9
    });

    const badgeDetail1 = new THREE.Mesh(badgeDetailGeometry, badgeDetailMaterial);
    badgeDetail1.position.set(0, -0.1, 0.33);
    scene.add(badgeDetail1);

    const badgeDetail2 = new THREE.Mesh(badgeDetailGeometry, badgeDetailMaterial);
    badgeDetail2.position.set(0, -0.25, 0.33);
    scene.add(badgeDetail2);

    const badgeDetail3 = new THREE.Mesh(badgeDetailGeometry, badgeDetailMaterial);
    badgeDetail3.position.set(0, -0.4, 0.33);
    scene.add(badgeDetail3);

    // Group all objects
    const profileGroup = new THREE.Group();
    profileGroup.add(head, body, leftShoulder, rightShoulder, leftArm, rightArm,
                    leftEye, rightEye, leftPupil, rightPupil, mouth,
                    badge, badgeDetail1, badgeDetail2, badgeDetail3);
    scene.add(profileGroup);

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
      const intersects = raycaster.intersectObject(profileGroup, true);

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
        profileGroup.rotation.y += rotationSpeed;

        // Add a subtle floating effect
        profileGroup.position.y = Math.sin(time) * 0.1;

        // Sync glow with profile
        glowMesh.position.copy(profileGroup.position);

        // Pulse the glow intensity
        const pulseValue = 0.2 + Math.sin(time * 2) * 0.05;
        if (glowMaterial.uniforms && glowMaterial.uniforms.c) {
          glowMaterial.uniforms.c.value = pulseValue;
        }

        // Animate eyes (blink occasionally)
        if (Math.sin(time * 0.5) > 0.95) {
          leftEye.scale.y = 0.1;
          rightEye.scale.y = 0.1;
          leftPupil.scale.y = 0.1;
          rightPupil.scale.y = 0.1;
        } else {
          leftEye.scale.y = 1;
          rightEye.scale.y = 1;
          leftPupil.scale.y = 1;
          rightPupil.scale.y = 1;
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
      headGeometry.dispose();
      bodyGeometry.dispose();
      shoulderGeometry.dispose();
      armGeometry.dispose();
      eyeGeometry.dispose();
      pupilGeometry.dispose();
      mouthGeometry.dispose();
      badgeGeometry.dispose();
      badgeDetailGeometry.dispose();
      glowGeometry.dispose();

      headMaterial.dispose();
      bodyMaterial.dispose();
      detailMaterial.dispose();
      eyeMaterial.dispose();
      pupilMaterial.dispose();
      badgeDetailMaterial.dispose();
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

export default Profile3D;
