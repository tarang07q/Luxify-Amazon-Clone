import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon, FaRegSun, FaRegMoon } from 'react-icons/fa';

const ThemeToggler = () => {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggler p-2 rounded-full transition-all duration-500 ease-in-out focus:outline-none overflow-hidden relative"
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        backgroundColor: currentTheme === 'light' ? 'rgba(79, 70, 229, 0.1)' : 'rgba(255, 255, 255, 0.1)',
        boxShadow: 'var(--shadow)',
        width: '40px',
        height: '40px',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`transform transition-all duration-500 ${currentTheme === 'light' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}
          style={{ position: 'absolute' }}
        >
          <FaSun className="text-xl text-yellow-400" />
        </div>
        <div
          className={`transform transition-all duration-500 ${currentTheme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
          style={{ position: 'absolute' }}
        >
          <FaMoon className="text-xl text-indigo-300" />
        </div>
      </div>
      <div
        className="absolute inset-0 rounded-full transition-all duration-700"
        style={{
          background: currentTheme === 'light'
            ? 'radial-gradient(circle at center, rgba(252, 211, 77, 0.2) 0%, rgba(252, 211, 77, 0) 70%)'
            : 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0) 70%)',
          transform: `scale(${currentTheme === 'light' ? '1' : '1.2'})`,
        }}
      />
    </button>
  );
};

export default ThemeToggler;
