import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import CubeIcon from '../3d/CubeIcon';
import '../../styles/footerPages.css';

const FooterPageTemplate = ({ title, subtitle, icon, children, breadcrumbs = [] }) => {
  const { theme } = useTheme();

  return (
    <div
      className="footer-page-container"
      style={{
        backgroundColor: theme.background,
        color: theme.text
      }}
    >
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6" style={{ color: theme.textLight }}>
        <Link to="/" className="flex items-center hover:text-primary transition-colors">
          <FaHome className="mr-1" />
          <span>Home</span>
        </Link>

        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <FaChevronRight className="mx-2 text-xs" style={{ color: theme.textLight }} />
            {crumb.link ? (
              <Link
                to={crumb.link}
                className="hover:text-primary transition-colors"
                style={{ color: theme.textLight }}
              >
                {crumb.text}
              </Link>
            ) : (
              <span style={{ color: theme.text }}>{crumb.text}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Page Header */}
      <div className="mb-10">
        <div className="footer-page-header">
          <div className="footer-page-icon-container">
            <div className="footer-page-3d-icon">
              <CubeIcon size={60} autoRotate={true} />
            </div>
            {icon && <div className="footer-page-icon" style={{ color: theme.primary }}>{icon}</div>}
          </div>
          <div>
            <h1 className="footer-page-title" style={{ color: theme.text }}>
              {title}
            </h1>

            {subtitle && (
              <p className="footer-page-subtitle-text" style={{ color: theme.textLight }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div style={{ color: theme.text }}>
        {children}
      </div>
    </div>
  );
};

export default FooterPageTemplate;
