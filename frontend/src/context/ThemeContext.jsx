import React, { createContext, useState, useEffect, useContext } from 'react';

// Define theme colors
export const themes = {
  light: {
    primary: '#5046e5', // Enhanced indigo
    secondary: '#f0338d', // Enhanced pink
    accent: '#8b5cf6', // violet-500
    gradient: 'linear-gradient(135deg, #5046e5, #f0338d)',
    background: '#ffffff',
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
    error: '#ef4444', // red-500
    warning: '#f59e0b', // amber-500
    info: '#3b82f6', // blue-500
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
    primary: '#818cf8', // indigo-400
    secondary: '#f472b6', // pink-400
    accent: '#a78bfa', // violet-400
    gradient: 'linear-gradient(135deg, #818cf8, #f472b6)',
    background: '#0f172a', // slate-900
    cardBg: '#1e293b', // slate-800
    cardHoverBg: '#334155', // slate-700
    text: '#f8fafc', // slate-50
    textLight: '#cbd5e1', // slate-300
    border: '#334155', // slate-700
    buttonPrimary: '#818cf8', // indigo-400
    buttonSecondary: '#f472b6', // pink-400
    buttonText: '#ffffff',
    navBg: 'rgba(15, 23, 42, 0.95)', // slate-900 with opacity
    navText: '#f8fafc', // slate-50
    navShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    footerBg: '#1e293b', // slate-800
    footerText: '#cbd5e1', // slate-300
    success: '#10b981', // emerald-500
    error: '#ef4444', // red-500
    warning: '#f59e0b', // amber-500
    info: '#3b82f6', // blue-500
    shadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
    shadowHover: '0 10px 25px rgba(0, 0, 0, 0.4), 0 5px 10px rgba(0, 0, 0, 0.3)',
    canvas3dBg: '#0f172a', // slate-900
    canvas3dFog: '#1e293b', // slate-800
    cardBorder: '1px solid rgba(51, 65, 85, 0.8)', // slate-700 with opacity
    inputBg: '#1e293b', // slate-800
    inputBorder: '#334155', // slate-700
    inputFocus: 'rgba(129, 140, 248, 0.2)', // primary with opacity
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

  const [currentTheme, setCurrentTheme] = useState('light'); // Default to light for SSR
  const [themeLoaded, setThemeLoaded] = useState(false);

  // Set theme on initial load (client-side only)
  useEffect(() => {
    setCurrentTheme(getInitialTheme());
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
