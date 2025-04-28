import React from 'react';
import ModernCube from './ModernCube';
import { useTheme } from '../../context/ThemeContext';

const ProfileCube = ({ size = 120, autoRotate = true }) => {
  const { theme } = useTheme();
  
  // Profile-themed colors
  const profileColors = [
    '#5e60ce',        // Profile primary purple
    '#5390d9',        // Profile info blue
    '#4ea8de',        // Profile details light blue
    '#48bfe3',        // Profile settings teal
    '#56cfe1',        // Profile data cyan
    '#64dfdf'         // Profile accent mint
  ];
  
  return (
    <ModernCube 
      size={size} 
      autoRotate={autoRotate} 
      faceColors={profileColors}
    />
  );
};

export default ProfileCube;
