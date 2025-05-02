/**
 * Utility functions for WebGL detection and fallback
 */

// Store the WebGL support status globally to avoid repeated checks
let webGLSupportStatus = null;

// Global WebGL context management
const MAX_WEBGL_CONTEXTS = 4;
const activeContexts = [];

/**
 * Manages WebGL contexts to prevent "Too many active WebGL contexts" error
 * @param {WebGLRenderingContext|WebGL2RenderingContext} context - The WebGL context to manage
 * @returns {WebGLRenderingContext|WebGL2RenderingContext} - The managed context
 */
export const manageWebGLContext = (context) => {
  if (!context) return null;

  // Add the new context to our tracking array
  activeContexts.push(context);

  // If we have too many contexts, dispose of the oldest one
  if (activeContexts.length > MAX_WEBGL_CONTEXTS) {
    const oldestContext = activeContexts.shift();

    // Try to lose the context gracefully
    if (oldestContext.getExtension('WEBGL_lose_context')) {
      oldestContext.getExtension('WEBGL_lose_context').loseContext();
    }

    console.log('WebGL context limit reached, disposed oldest context');
  }

  return context;
};

/**
 * Releases a WebGL context when it's no longer needed
 * @param {WebGLRenderingContext|WebGL2RenderingContext} context - The WebGL context to release
 */
export const releaseWebGLContext = (context) => {
  if (!context) return;

  // Remove the context from our tracking array
  const index = activeContexts.indexOf(context);
  if (index !== -1) {
    activeContexts.splice(index, 1);
  }

  // Try to lose the context gracefully
  if (context.getExtension('WEBGL_lose_context')) {
    context.getExtension('WEBGL_lose_context').loseContext();
  }
};

/**
 * Check if WebGL is supported and working properly
 * @returns {boolean} - Whether WebGL is supported and working
 */
export const isWebGLSupported = () => {
  // FORCE DISABLE WEBGL FOR NOW TO PREVENT ERRORS
  // This is a temporary solution until we can fix the WebGL shader errors
  webGLSupportStatus = false;
  return false;

  /* Original implementation - disabled for now
  // Return cached result if available
  if (webGLSupportStatus !== null) {
    return webGLSupportStatus;
  }

  try {
    // Try to create a WebGL context
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') ||
               canvas.getContext('experimental-webgl');

    // If we couldn't get a WebGL context, WebGL isn't supported
    if (!gl) {
      webGLSupportStatus = false;
      return false;
    }

    // Try to create a simple shader to test if WebGL is working properly
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) {
      webGLSupportStatus = false;
      return false;
    }

    // Try to compile a simple shader
    gl.shaderSource(vertexShader, 'void main() { gl_Position = vec4(0.0, 0.0, 0.0, 1.0); }');
    gl.compileShader(vertexShader);

    // Check if compilation was successful
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      gl.deleteShader(vertexShader);
      webGLSupportStatus = false;
      return false;
    }

    // Clean up
    gl.deleteShader(vertexShader);

    // If we got here, WebGL is supported and working
    webGLSupportStatus = true;
    return true;
  } catch (e) {
    console.error("Error checking WebGL support:", e);
    webGLSupportStatus = false;
    return false;
  }
  */
};

/**
 * Force disable WebGL for testing fallback mechanisms
 */
export const forceDisableWebGL = () => {
  webGLSupportStatus = false;
};

/**
 * Reset the cached WebGL support status
 */
export const resetWebGLSupportStatus = () => {
  webGLSupportStatus = null;
};

/**
 * Create a simple CSS-based 3D cube as a fallback
 * @param {Object} options - Options for the CSS cube
 * @returns {HTMLElement} - The CSS cube element
 */
export const createCSSCube = (options = {}) => {
  const {
    size = 100,
    color = '#4466aa',
    perspective = 800,
    rotateX = 15,
    rotateY = 45,
    animate = true,
    glow = true,
    icon = null
  } = options;

  // Create container
  const container = document.createElement('div');
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  container.style.perspective = `${perspective}px`;
  container.style.margin = '0 auto';
  container.className = 'css-cube-container';

  // Create cube
  const cube = document.createElement('div');
  cube.className = 'css-cube';
  cube.style.width = '100%';
  cube.style.height = '100%';
  cube.style.position = 'relative';
  cube.style.transformStyle = 'preserve-3d';
  cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  if (animate) {
    cube.style.animation = 'css-cube-spin 10s infinite linear';
  }

  // Create faces with gradients for a more modern look
  const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
  const transforms = [
    'translateZ(50%)',
    'rotateY(180deg) translateZ(50%)',
    'rotateY(90deg) translateZ(50%)',
    'rotateY(-90deg) translateZ(50%)',
    'rotateX(90deg) translateZ(50%)',
    'rotateX(-90deg) translateZ(50%)'
  ];

  // Create a lighter and darker version of the color for gradients
  const lighterColor = lightenColor(color, 20);
  const darkerColor = darkenColor(color, 20);

  faces.forEach((face, i) => {
    const element = document.createElement('div');
    element.className = 'css-cube-face';
    element.style.position = 'absolute';
    element.style.width = '100%';
    element.style.height = '100%';

    // Use gradients for a more modern look
    if (i % 2 === 0) {
      element.style.background = `linear-gradient(135deg, ${lighterColor}, ${color})`;
    } else {
      element.style.background = `linear-gradient(135deg, ${color}, ${darkerColor})`;
    }

    element.style.opacity = '0.9';
    element.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    element.style.transform = transforms[i];

    // Add glow effect
    if (glow) {
      element.style.boxShadow = `0 0 10px rgba(${hexToRgb(color)}, 0.5)`;
    }

    cube.appendChild(element);
  });

  // Add icon if provided
  if (icon) {
    const iconElement = document.createElement('div');
    iconElement.className = 'css-cube-icon';
    iconElement.style.position = 'absolute';
    iconElement.style.top = '50%';
    iconElement.style.left = '50%';
    iconElement.style.transform = 'translate(-50%, -50%) translateZ(51%)';
    iconElement.style.color = '#ffffff';
    iconElement.style.fontSize = `${size * 0.4}px`;
    iconElement.style.textShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
    iconElement.style.zIndex = '10';
    iconElement.innerHTML = icon;
    cube.appendChild(iconElement);
  }

  container.appendChild(cube);

  // Add animation keyframes if needed
  if (animate && !document.getElementById('css-cube-animation')) {
    const style = document.createElement('style');
    style.id = 'css-cube-animation';
    style.textContent = `
      @keyframes css-cube-spin {
        from { transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg); }
        to { transform: rotateX(${rotateX + 360}deg) rotateY(${rotateY + 360}deg); }
      }

      @keyframes css-cube-pulse {
        0% { box-shadow: 0 0 5px rgba(${hexToRgb(color)}, 0.5); }
        50% { box-shadow: 0 0 20px rgba(${hexToRgb(color)}, 0.8); }
        100% { box-shadow: 0 0 5px rgba(${hexToRgb(color)}, 0.5); }
      }
    `;
    document.head.appendChild(style);
  }

  return container;
};

/**
 * Helper function to lighten a hex color
 * @param {string} color - Hex color code
 * @param {number} percent - Percentage to lighten
 * @returns {string} - Lightened hex color
 */
function lightenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;

  return '#' + (
    0x1000000 +
    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)
  ).toString(16).slice(1);
}

/**
 * Helper function to darken a hex color
 * @param {string} color - Hex color code
 * @param {number} percent - Percentage to darken
 * @returns {string} - Darkened hex color
 */
function darkenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;

  return '#' + (
    0x1000000 +
    (R > 0 ? R : 0) * 0x10000 +
    (G > 0 ? G : 0) * 0x100 +
    (B > 0 ? B : 0)
  ).toString(16).slice(1);
}

/**
 * Helper function to convert hex to rgb
 * @param {string} hex - Hex color code
 * @returns {string} - RGB values as "r, g, b"
 */
function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}
