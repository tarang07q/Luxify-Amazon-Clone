import React from 'react';
import { FaShoppingCart, FaBox, FaShippingFast, FaTags, FaRegCreditCard } from 'react-icons/fa';
import ResendStyleCube from './ResendStyleCube';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/cube-showcase.css';

/**
 * A showcase component for displaying multiple 3D cubes
 * with different colors and icons
 */
const CubeShowcase = () => {
  const { theme, currentTheme } = useTheme();

  // Define cube configurations with theme-aware colors
  const cubes = [
    {
      id: 1,
      title: 'Shop Now',
      icon: <FaShoppingCart size={50} />,
      color: currentTheme === 'dark' ? '#00f2ff' : '#10b981', // Cyan or Emerald
      size: 180,
      rotationSpeed: 15,
      floatingAnimation: true
    },
    {
      id: 2,
      title: 'Products',
      icon: <FaBox size={50} />,
      color: currentTheme === 'dark' ? '#0095ff' : '#3b82f6', // Blue shades
      size: 180,
      rotationSpeed: 18,
      floatingAnimation: true
    },
    {
      id: 3,
      title: 'Fast Shipping',
      icon: <FaShippingFast size={50} />,
      color: currentTheme === 'dark' ? '#7928ca' : '#8b5cf6', // Purple shades
      size: 180,
      rotationSpeed: 20,
      floatingAnimation: true
    },
    {
      id: 4,
      title: 'Best Deals',
      icon: <FaTags size={50} />,
      color: currentTheme === 'dark' ? '#ff00e4' : '#ec4899', // Magenta/Pink
      size: 180,
      rotationSpeed: 17,
      floatingAnimation: true
    },
    {
      id: 5,
      title: 'Secure Payment',
      icon: <FaRegCreditCard size={50} />,
      color: currentTheme === 'dark' ? '#ffaa00' : '#f59e0b', // Amber/Orange
      size: 180,
      rotationSpeed: 16,
      floatingAnimation: true
    }
  ];

  return (
    <div className="cube-showcase">
      <div className="cube-showcase-grid">
        {cubes.map((cube) => (
          <div key={cube.id} className="cube-showcase-item">
            <ResendStyleCube
              size={cube.size}
              color={cube.color}
              title={cube.title}
              icon={cube.icon}
              autoRotate={true}
              rotationSpeed={cube.rotationSpeed}
              floatingAnimation={cube.floatingAnimation}
              glowEffect={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CubeShowcase;
