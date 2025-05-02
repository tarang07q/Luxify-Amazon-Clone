import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import CubeIcon from '../3d/CubeIcon';
import './PageTemplate.css';

const PageTemplate = ({ title, children, breadcrumbs = [] }) => {
  const { theme } = useTheme();

  return (
    <div className="page-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumb-home">
          <FaHome className="breadcrumb-home-icon" />
          <span>Home</span>
        </Link>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <FaChevronRight className="breadcrumb-separator" />
            {crumb.link ? (
              <Link to={crumb.link} className="breadcrumb-link">{crumb.text}</Link>
            ) : (
              <span className="breadcrumb-current">{crumb.text}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-3d">
          <CubeIcon size={60} autoRotate={true} />
        </div>
        <h1 className="page-title">{title}</h1>
      </div>

      {/* Page Content */}
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default PageTemplate;
