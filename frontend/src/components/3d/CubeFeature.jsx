import React from 'react';
import CubeShowcase from './CubeShowcase';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/cube-showcase.css';

/**
 * A feature section component showcasing multiple 3D cubes
 */
const CubeFeature = () => {
  const { theme } = useTheme();

  return (
    <section className="cube-feature-section">
      <h2 className="futuristic-title" style={{
        background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Explore Our Features
      </h2>
      <p>
        Amazer brings you the best shopping experience with a wide range of products,
        fast shipping, secure payments, and exclusive deals. Discover why customers
        love shopping with us.
      </p>

      <CubeShowcase />
    </section>
  );
};

export default CubeFeature;
