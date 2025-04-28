import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

const ModernCube = ({ size = 120, autoRotate = true, faceColors = null }) => {
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

    // Enhanced lighting for more shine
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Multiple point lights for dramatic shine effect
    const pointLight1 = new THREE.PointLight(0xffffff, 0.8, 10);
    pointLight1.position.set(-5, -5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.6, 10);
    pointLight2.position.set(3, 3, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 0.6, 10);
    pointLight3.position.set(-3, 3, -3);
    scene.add(pointLight3);

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
        metalness: 0.3,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.5,
        envMapIntensity: 2.0,
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.2,
      });
    });

    // Create cube mesh with materials
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Add enhanced edge highlighting
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: currentTheme === 'light' ? 0xffffff : 0xaaaaaa,
      transparent: true,
      opacity: 0.7,
      linewidth: 2
    });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    cube.add(edges);

    // Add a subtle glow effect
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { type: "f", value: 0.2 },
        p: { type: "f", value: 1.4 },
        glowColor: { type: "c", value: new THREE.Color(currentTheme === 'light' ? 0x88aaff : 0x4466aa) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform float c;
        uniform float p;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
          gl_FragColor = vec4(glowColor, intensity);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const glowGeometry = new THREE.BoxGeometry(2.2, 2.2, 2.2);
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

    // Animation loop with more dynamic movement
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      if (autoRotate && !rotationPaused) {
        // More dynamic rotation
        cube.rotation.x += rotationSpeed * 0.5;
        cube.rotation.y += rotationSpeed;

        // Subtle floating effect
        cube.position.y = Math.sin(time) * 0.1;

        // Sync glow mesh with cube
        glowMesh.rotation.copy(cube.rotation);
        glowMesh.position.copy(cube.position);

        // Pulse the glow intensity
        const pulseValue = 0.2 + Math.sin(time * 2) * 0.05;
        glowMaterial.uniforms.c.value = pulseValue;
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
      geometry.dispose();
      glowGeometry.dispose();
      edgesGeometry.dispose();

      materials.forEach(material => material.dispose());
      glowMaterial.dispose();
      edgesMaterial.dispose();

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
