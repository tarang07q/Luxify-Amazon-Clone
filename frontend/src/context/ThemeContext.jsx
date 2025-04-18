import React, { createContext, useState, useEffect, useContext } from 'react';

// Define theme colors
export const themes = {
  light: {
    primary: '#4f46e5', // indigo-600
    secondary: '#ec4899', // pink-500
    accent: '#8b5cf6', // violet-500
    background: '#ffffff',
    cardBg: '#f9fafb', // gray-50
    text: '#1f2937', // gray-800
    textLight: '#6b7280', // gray-500
    border: '#e5e7eb', // gray-200
    buttonPrimary: '#4f46e5', // indigo-600
    buttonSecondary: '#ec4899', // pink-500
    buttonText: '#ffffff',
    navBg: '#ffffff',
    navText: '#1f2937',
    footerBg: '#f3f4f6', // gray-100
    footerText: '#4b5563', // gray-600
    success: '#10b981', // emerald-500
    error: '#ef4444', // red-500
    warning: '#f59e0b', // amber-500
    info: '#3b82f6', // blue-500
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    canvas3dBg: '#f8fafc', // slate-50
    canvas3dFog: '#f1f5f9', // slate-100
  },
  dark: {
    primary: '#818cf8', // indigo-400
    secondary: '#f472b6', // pink-400
    accent: '#a78bfa', // violet-400
    background: '#111827', // gray-900
    cardBg: '#1f2937', // gray-800
    text: '#f9fafb', // gray-50
    textLight: '#d1d5db', // gray-300
    border: '#374151', // gray-700
    buttonPrimary: '#6366f1', // indigo-500
    buttonSecondary: '#ec4899', // pink-500
    buttonText: '#ffffff',
    navBg: '#111827', // gray-900
    navText: '#f9fafb', // gray-50
    footerBg: '#1f2937', // gray-800
    footerText: '#d1d5db', // gray-300
    success: '#10b981', // emerald-500
    error: '#ef4444', // red-500
    warning: '#f59e0b', // amber-500
    info: '#3b82f6', // blue-500
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    canvas3dBg: '#0f172a', // slate-900
    canvas3dFog: '#1e293b', // slate-800
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
