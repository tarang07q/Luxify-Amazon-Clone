import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaShoppingBag, FaBoxOpen } from 'react-icons/fa';
import ResendStyleCube from './ResendStyleCube';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/cube-showcase.css';

/**
 * A hero section component featuring a prominent 3D cube
 */
const CubeHero = () => {
  const { theme, currentTheme } = useTheme();

  return (
    <section className="cube-hero-section">
      {/* Background shapes */}
      <div className="cube-background-shapes">
        <div className="cube-shape cube-shape-1" style={{ background: theme.primary }}></div>
        <div className="cube-shape cube-shape-2" style={{ background: theme.secondary }}></div>
        <div className="cube-shape cube-shape-3" style={{ background: theme.accent }}></div>
      </div>

      <div className="cube-hero-content">
        <h1 className="cube-hero-title futuristic-title">Welcome to Amazer</h1>
        <p className="cube-hero-subtitle">
          Discover a new dimension of online shopping with our curated selection of premium products.
          Experience fast shipping, secure payments, and exceptional customer service.
        </p>

        {/* Featured 3D Cube */}
        <div className="hero-cube-container">
          <ResendStyleCube
            size={300}
            color={theme.primary}
            icon={<FaBoxOpen size={80} />}
            autoRotate={true}
            rotationSpeed={15}
            floatingAnimation={true}
            glowEffect={true}
            perspective={1200}
          />
        </div>

        <div className="cube-hero-cta">
          <Link to="/shop">
            <button className="cube-hero-button primary">
              <FaShoppingBag className="mr-2" /> Shop Now
            </button>
          </Link>
          <Link to="/about">
            <button className="cube-hero-button secondary">Learn More</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CubeHero;
