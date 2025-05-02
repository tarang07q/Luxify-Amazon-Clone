import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import ModernCube from './ModernCube';
import SimpleCube from './SimpleCube';

const CategoryIcon3D = ({ category = 'default', size = 120, autoRotate = true }) => {
  const { theme } = useTheme();
  
  // Get colors based on category
  const getCategoryColors = () => {
    switch (category.toLowerCase()) {
      case 'electronics':
        return [
          theme.primary,
          '#3498db', // Blue
          '#e74c3c', // Red
          '#2ecc71', // Green
          '#f39c12', // Orange
          '#9b59b6'  // Purple
        ];
      case 'computers':
        return [
          theme.primary,
          '#0984e3', // Blue
          '#00b894', // Green
          '#6c5ce7', // Purple
          '#fdcb6e', // Yellow
          '#00cec9'  // Teal
        ];
      case 'smart home':
        return [
          theme.primary,
          '#00b894', // Green
          '#0984e3', // Blue
          '#fdcb6e', // Yellow
          '#e17055', // Orange
          '#6c5ce7'  // Purple
        ];
      case 'clothing':
        return [
          theme.primary,
          '#ff7675', // Pink
          '#74b9ff', // Light Blue
          '#55efc4', // Mint
          '#ffeaa7', // Light Yellow
          '#a29bfe'  // Lavender
        ];
      case 'beauty & personal care':
        return [
          theme.primary,
          '#fd79a8', // Pink
          '#fab1a0', // Peach
          '#81ecec', // Cyan
          '#ffeaa7', // Light Yellow
          '#dfe6e9'  // Light Gray
        ];
      case 'books':
        return [
          theme.primary,
          '#636e72', // Gray
          '#b2bec3', // Light Gray
          '#fdcb6e', // Yellow
          '#e17055', // Orange
          '#00cec9'  // Teal
        ];
      case 'toys & games':
        return [
          theme.primary,
          '#e84393', // Pink
          '#fdcb6e', // Yellow
          '#00b894', // Green
          '#0984e3', // Blue
          '#e17055'  // Orange
        ];
      case 'sports & outdoors':
        return [
          theme.primary,
          '#2ecc71', // Green
          '#3498db', // Blue
          '#f39c12', // Orange
          '#ecf0f1', // White
          '#95a5a6'  // Gray
        ];
      default:
        return [
          theme.primary,
          theme.secondary,
          '#ff6b6b',  // Red
          '#4ecdc4',  // Teal
          '#ffe66d',  // Yellow
          '#6a0572'   // Purple
        ];
    }
  };
  
  // Check if WebGL is supported
  const checkWebGLSupport = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  };
  
  // If WebGL is not supported, use the SimpleCube
  if (!checkWebGLSupport()) {
    return <SimpleCube size={size} />;
  }
  
  // Use ModernCube with category-specific colors
  return (
    <ModernCube 
      size={size} 
      autoRotate={autoRotate} 
      faceColors={getCategoryColors()}
    />
  );
};

export default CategoryIcon3D;
