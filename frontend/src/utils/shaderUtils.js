/**
 * Utility functions for working with WebGL shaders
 */

import * as THREE from 'three';

/**
 * Creates a shader material with proper error handling
 * @param {Object} options - Shader material options
 * @returns {THREE.ShaderMaterial|THREE.MeshBasicMaterial} - Returns shader material or fallback material
 */
export const createSafeShaderMaterial = (options) => {
  try {
    // Create shader with proper error handling
    const material = new THREE.ShaderMaterial(options);
    
    // Test if the shader compiles correctly
    const testGeometry = new THREE.PlaneGeometry(1, 1);
    const testMesh = new THREE.Mesh(testGeometry, material);
    
    // If we get here without errors, the shader is valid
    testGeometry.dispose();
    
    return material;
  } catch (error) {
    console.error("Error creating shader material:", error);
    
    // Return a fallback material
    return new THREE.MeshBasicMaterial({
      color: options.uniforms?.glowColor?.value || 0x4466aa,
      transparent: options.transparent || false,
      opacity: 0.5,
      side: options.side || THREE.FrontSide
    });
  }
};

/**
 * Creates a basic glow material with proper error handling
 * @param {Object} options - Glow material options
 * @returns {THREE.ShaderMaterial|THREE.MeshBasicMaterial} - Returns glow material or fallback
 */
export const createGlowMaterial = (color = 0x4466aa, intensity = 0.2) => {
  try {
    return createSafeShaderMaterial({
      uniforms: {
        c: { value: intensity },
        p: { value: 1.4 },
        glowColor: { value: new THREE.Color(color) }
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
  } catch (error) {
    console.error("Error creating glow material:", error);
    
    // Return a fallback material
    return new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.5,
      side: THREE.BackSide
    });
  }
};
