import React, { createContext, useState, useEffect, useContext } from 'react';

// Define theme colors
export const themes = {
  light: {
    primary: '#5046e5', // Enhanced indigo
    'primary-rgb': '80, 70, 229',
    secondary: '#f0338d', // Enhanced pink
    'secondary-rgb': '240, 51, 141',
    accent: '#8b5cf6', // violet-500
    'accent-rgb': '139, 92, 246',
    gradient: 'linear-gradient(135deg, #5046e5, #f0338d)',
    background: '#ffffff',
    'bg-primary-rgb': '255, 255, 255',
    'bg-secondary-rgb': '249, 250, 251',
    cardBg: '#f9fafb', // gray-50
    cardHoverBg: '#f1f5f9', // slate-100
    text: '#1e293b', // slate-800
    textLight: '#64748b', // slate-500
    border: '#e2e8f0', // slate-200
    buttonPrimary: '#5046e5', // Enhanced indigo
    buttonSecondary: '#f0338d', // Enhanced pink
    buttonText: '#ffffff',
    navBg: 'rgba(255, 255, 255, 0.95)',
    navText: '#1e293b',
    navShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    footerBg: '#f8fafc', // slate-50
    footerText: '#475569', // slate-600
    success: '#10b981', // emerald-500
    'success-rgb': '16, 185, 129',
    error: '#ef4444', // red-500
    'error-rgb': '239, 68, 68',
    warning: '#f59e0b', // amber-500
    'warning-rgb': '245, 158, 11',
    info: '#3b82f6', // blue-500
    'info-rgb': '59, 130, 246',
    shadow: '0 4px 12px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.02)',
    shadowHover: '0 10px 25px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.04)',
    canvas3dBg: '#f8fafc', // slate-50
    canvas3dFog: '#f1f5f9', // slate-100
    cardBorder: '1px solid rgba(226, 232, 240, 0.8)',
    inputBg: '#f8fafc', // slate-50
    inputBorder: '#e2e8f0', // slate-200
    inputFocus: 'rgba(80, 70, 229, 0.2)', // primary with opacity
  },
  dark: {
    // Futuristic cyberpunk-inspired color scheme
    primary: '#00f2ff', // Bright cyan
    'primary-rgb': '0, 242, 255',
    secondary: '#ff00e4', // Neon magenta
    'secondary-rgb': '255, 0, 228',
    accent: '#7928ca', // Electric purple
    'accent-rgb': '121, 40, 202',
    gradient: 'linear-gradient(135deg, #00f2ff, #ff00e4)',
    background: '#0a0b1e', // Deep space blue
    'bg-primary-rgb': '10, 11, 30',
    'bg-secondary-rgb': '20, 21, 57',
    cardBg: '#141539', // Dark blue with slight purple tint
    cardHoverBg: '#1c1c4d', // Slightly lighter blue-purple
    text: '#e2e8f0', // Soft white
    textLight: '#a0aec0', // Muted silver
    border: '#2d3748', // Dark slate
    buttonPrimary: '#00f2ff', // Bright cyan
    buttonSecondary: '#ff00e4', // Neon magenta
    buttonText: '#ffffff',
    navBg: 'rgba(10, 11, 30, 0.85)', // Deep space blue with opacity
    navText: '#e2e8f0', // Soft white
    navShadow: '0 4px 20px rgba(0, 242, 255, 0.15)', // Cyan glow
    footerBg: '#0d102b', // Slightly lighter than background
    footerText: '#a0aec0', // Muted silver
    success: '#01ffc3', // Neon teal
    'success-rgb': '1, 255, 195',
    error: '#ff3d71', // Neon red
    'error-rgb': '255, 61, 113',
    warning: '#ffaa00', // Bright amber
    'warning-rgb': '255, 170, 0',
    info: '#0095ff', // Bright blue
    'info-rgb': '0, 149, 255',
    shadow: '0 4px 12px rgba(0, 242, 255, 0.1), 0 2px 4px rgba(0, 0, 0, 0.3)',
    shadowHover: '0 10px 25px rgba(0, 242, 255, 0.2), 0 5px 10px rgba(0, 0, 0, 0.4)',
    canvas3dBg: '#0a0b1e', // Deep space blue
    canvas3dFog: '#141539', // Dark blue with slight purple tint
    cardBorder: '1px solid rgba(0, 242, 255, 0.1)', // Cyan border with low opacity
    inputBg: '#141539', // Dark blue with slight purple tint
    inputBorder: '#2d3748', // Dark slate
    inputFocus: 'rgba(0, 242, 255, 0.2)', // Cyan with opacity
    // Additional futuristic properties
    glowAccent: '0 0 10px rgba(0, 242, 255, 0.5)', // Cyan glow
    glowSecondary: '0 0 10px rgba(255, 0, 228, 0.5)', // Magenta glow
    glassBg: 'rgba(20, 21, 57, 0.7)', // Semi-transparent card background
    glassBorder: '1px solid rgba(0, 242, 255, 0.2)', // Subtle cyan border
    gridLines: 'rgba(0, 242, 255, 0.1)', // Subtle grid lines
    neonHighlight: '#00f2ff', // Bright cyan for highlights
    neonShadow: '0 0 8px rgba(0, 242, 255, 0.8), 0 0 20px rgba(0, 242, 255, 0.5)', // Layered cyan glow
    darkOverlay: 'rgba(10, 11, 30, 0.7)' // Overlay for modals and drawers
  }
};

// Create context
export const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference in localStorage
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check user's system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const [currentTheme, setCurrentTheme] = useState(getInitialTheme); // Use the function to get initial theme
  const [themeLoaded, setThemeLoaded] = useState(false);

  // Set theme loaded flag on initial load (client-side only)
  useEffect(() => {
    setThemeLoaded(true);
  }, []);

  // Update localStorage and apply theme when it changes
  useEffect(() => {
    if (!themeLoaded) return;

    localStorage.setItem('theme', currentTheme);

    // Apply theme to document
    const root = document.documentElement;
    const theme = themes[currentTheme];

    Object.entries(theme).forEach(([property, value]) => {
      root.style.setProperty(`--${property}`, value);
    });

    // Set data-theme attribute for components that use it
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.background);
    }
  }, [currentTheme, themeLoaded]);

  // Toggle theme function
  const toggleTheme = () => {
    setCurrentTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Get current theme colors
  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme, themeLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
