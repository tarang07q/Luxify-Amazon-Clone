import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaShoppingCart } from 'react-icons/fa';
import '../../styles/resend-cube.css';

/**
 * A 3D cube component inspired by Resend.com
 * Pure CSS implementation with advanced styling and animations
 *
 * @param {Object} props - Component props
 * @returns {JSX.Element} - The rendered component
 */
const ResendStyleCube = ({
  size = 300,
  color = null,
  gradientColors = null,
  title = null,
  icon = null,
  autoRotate = true,
  rotationSpeed = 10,
  floatingAnimation = true,
  glowEffect = true,
  perspective = 1000
}) => {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const cubeRef = useRef(null);

  // Use theme color if no color is provided
  const baseColor = color || theme.primary;

  // Default icon if none provided
  const defaultIcon = icon || <FaShoppingCart size={size/4} />;

  // Default gradient colors if not provided
  const defaultGradient = {
    primary: baseColor,
    secondary: adjustColor(baseColor, 20),
    tertiary: adjustColor(baseColor, -20)
  };

  // Use provided gradient colors or default
  const gradient = gradientColors || defaultGradient;

  // Function to adjust color brightness
  function adjustColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
    return '#' + (0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1);
  }

  // Convert hex to rgba
  function hexToRgba(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Mouse interaction effect
  useEffect(() => {
    if (!containerRef.current || !cubeRef.current) return;

    const container = containerRef.current;
    const cube = cubeRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let rotateX = 15;
    let rotateY = 45;
    let isMouseOver = false;

    const handleMouseMove = (e) => {
      if (!isMouseOver) return;

      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      // Smooth rotation based on mouse position
      rotateX = 15 - mouseY * 20;
      rotateY = 45 + mouseX * 20;

      // Apply rotation
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseEnter = () => {
      isMouseOver = true;
      cube.classList.add('resend-cube-hover');
      cube.classList.remove('resend-cube-animate');
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      cube.classList.remove('resend-cube-hover');
      if (autoRotate) {
        cube.classList.add('resend-cube-animate');
      }
    };

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Clean up
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [autoRotate]);

  // Create animation style for custom rotation speed
  useEffect(() => {
    if (autoRotate) {
      // Create a style element for custom animation
      const styleEl = document.createElement('style');
      styleEl.id = 'resend-cube-animation-style';

      // Define the animation with custom speed
      styleEl.textContent = `
        @keyframes resend-cube-rotate {
          0% { transform: rotateX(15deg) rotateY(45deg); }
          100% { transform: rotateX(15deg) rotateY(${45 + 360}deg); }
        }

        .resend-cube-animate {
          animation: resend-cube-rotate ${rotationSpeed}s infinite linear;
        }

        @keyframes resend-cube-float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .resend-cube-container.floating {
          animation: resend-cube-float 6s ease-in-out infinite;
        }
      `;

      // Add the style element to the document head
      document.head.appendChild(styleEl);

      // Clean up
      return () => {
        const existingStyle = document.getElementById('resend-cube-animation-style');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [autoRotate, rotationSpeed]);

  return (
    <div className="resend-cube-wrapper">
      <div
        ref={containerRef}
        className={`resend-cube-container ${floatingAnimation ? 'floating' : ''}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          perspective: `${perspective}px`
        }}
      >
        <div
          ref={cubeRef}
          className={`resend-cube ${autoRotate ? 'resend-cube-animate' : ''}`}
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          {/* Front face */}
          <div
            className="resend-cube-face resend-cube-face-front"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: `translateZ(${size/2}px)`,
              background: `linear-gradient(135deg, ${gradient.secondary}, ${gradient.primary})`,
              boxShadow: glowEffect ? `0 0 30px ${hexToRgba(gradient.primary, 0.5)}` : 'none'
            }}
          >
            <div className="resend-cube-icon">
              {defaultIcon}
            </div>
          </div>

          {/* Back face */}
          <div
            className="resend-cube-face resend-cube-face-back"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotateY(180deg) translateZ(${size/2}px)`,
              background: `linear-gradient(135deg, ${gradient.primary}, ${gradient.tertiary})`,
              boxShadow: glowEffect ? `0 0 30px ${hexToRgba(gradient.tertiary, 0.5)}` : 'none'
            }}
          />

          {/* Right face */}
          <div
            className="resend-cube-face resend-cube-face-right"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotateY(90deg) translateZ(${size/2}px)`,
              background: `linear-gradient(135deg, ${gradient.secondary}, ${gradient.primary})`,
              boxShadow: glowEffect ? `0 0 30px ${hexToRgba(gradient.secondary, 0.5)}` : 'none'
            }}
          />

          {/* Left face */}
          <div
            className="resend-cube-face resend-cube-face-left"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotateY(-90deg) translateZ(${size/2}px)`,
              background: `linear-gradient(135deg, ${gradient.primary}, ${gradient.tertiary})`,
              boxShadow: glowEffect ? `0 0 30px ${hexToRgba(gradient.tertiary, 0.5)}` : 'none'
            }}
          />

          {/* Top face */}
          <div
            className="resend-cube-face resend-cube-face-top"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotateX(90deg) translateZ(${size/2}px)`,
              background: `linear-gradient(135deg, ${gradient.secondary}, ${gradient.primary})`,
              boxShadow: glowEffect ? `0 0 30px ${hexToRgba(gradient.secondary, 0.5)}` : 'none'
            }}
          />

          {/* Bottom face */}
          <div
            className="resend-cube-face resend-cube-face-bottom"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotateX(-90deg) translateZ(${size/2}px)`,
              background: `linear-gradient(135deg, ${gradient.primary}, ${gradient.tertiary})`,
              boxShadow: glowEffect ? `0 0 30px ${hexToRgba(gradient.tertiary, 0.5)}` : 'none'
            }}
          />
        </div>
      </div>

      {title && <div className="resend-cube-title">{title}</div>}
    </div>
  );
};

export default ResendStyleCube;
