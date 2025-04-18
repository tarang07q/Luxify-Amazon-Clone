import React from 'react';
import { Link } from 'react-router-dom';
import './PageTemplate.css';

const PageTemplate = ({ title, children, breadcrumbs = [] }) => {
  return (
    <div className="page-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <span className="breadcrumb-separator">/</span>
            {crumb.link ? (
              <Link to={crumb.link}>{crumb.text}</Link>
            ) : (
              <span>{crumb.text}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Page Header */}
      <div className="page-header">
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
