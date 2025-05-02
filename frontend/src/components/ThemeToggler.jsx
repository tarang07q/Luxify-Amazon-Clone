import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggler = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleToggle}
      className={`theme-toggler transition-all duration-500 ease-in-out focus:outline-none overflow-hidden relative ${isAnimating ? 'animate-pulse' : ''}`}
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '8px',
        backgroundColor: 'rgba(0, 242, 255, 0.1)',
        border: '1px solid rgba(0, 242, 255, 0.2)',
        boxShadow: isAnimating
          ? '0 0 15px rgba(0, 242, 255, 0.7), 0 0 30px rgba(0, 242, 255, 0.4)'
          : '0 0 10px rgba(0, 242, 255, 0.3)',
      }}
    >
      {/* Glowing border effect */}
      <div
        className="absolute inset-0 rounded-lg transition-opacity duration-500"
        style={{
          border: '1px solid rgba(0, 242, 255, 0.5)',
          opacity: isAnimating ? 1 : 0.3,
          boxShadow: '0 0 10px rgba(0, 242, 255, 0.5), inset 0 0 5px rgba(0, 242, 255, 0.2)',
          pointerEvents: 'none',
        }}
      />

      {/* Icon container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`transform transition-all duration-500 ${currentTheme === 'light' ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-50'}`}
          style={{ position: 'absolute' }}
        >
          <FaSun
            className="text-xl"
            style={{
              color: '#FFD700',
              filter: 'drop-shadow(0 0 3px rgba(255, 215, 0, 0.7))'
            }}
          />
        </div>
        <div
          className={`transform transition-all duration-500 ${currentTheme === 'dark' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}
          style={{ position: 'absolute' }}
        >
          <FaMoon
            className="text-xl"
            style={{
              color: '#00f2ff',
              filter: 'drop-shadow(0 0 3px rgba(0, 242, 255, 0.7))'
            }}
          />
        </div>
      </div>

      {/* Radial glow effect */}
      <div
        className="absolute inset-0 rounded-lg transition-all duration-700"
        style={{
          background: currentTheme === 'light'
            ? 'radial-gradient(circle at center, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0) 70%)'
            : 'radial-gradient(circle at center, rgba(0, 242, 255, 0.2) 0%, rgba(0, 242, 255, 0) 70%)',
          transform: `scale(${isAnimating ? '1.5' : '1'})`,
          opacity: isAnimating ? 0.8 : 0.4,
        }}
      />

      {/* Futuristic circuit lines */}
      <div
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 50%, rgba(0, 242, 255, 0.1) 50%),
            linear-gradient(0deg, transparent 50%, rgba(0, 242, 255, 0.1) 50%)
          `,
          backgroundSize: '8px 8px',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />
    </button>
  );
};

export default ThemeToggler;
