import React from 'react';
import { FaBriefcase, FaLaptopCode, FaChartLine, FaShippingFast, FaHeadset } from 'react-icons/fa';
import FooterPageTemplate from '../components/layout/FooterPageTemplate';

const CareersPage = () => {
  // Sample job listings
  const jobListings = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Remote / New York, NY',
      type: 'Full-time',
      icon: <FaLaptopCode className="text-primary text-2xl" />
    },
    {
      id: 2,
      title: 'Product Marketing Manager',
      department: 'Marketing',
      location: 'San Francisco, CA',
      type: 'Full-time',
      icon: <FaChartLine className="text-primary text-2xl" />
    },
    {
      id: 3,
      title: 'Logistics Coordinator',
      department: 'Operations',
      location: 'Chicago, IL',
      type: 'Full-time',
      icon: <FaShippingFast className="text-primary text-2xl" />
    },
    {
      id: 4,
      title: 'Customer Support Specialist',
      department: 'Customer Service',
      location: 'Remote',
      type: 'Full-time / Part-time',
      icon: <FaHeadset className="text-primary text-2xl" />
    }
  ];

  return (
    <FooterPageTemplate
      title="Careers at Luxify"
      subtitle="Join our team and shape the future of e-commerce"
      icon={<FaBriefcase />}
      breadcrumbs={[{ text: 'Careers' }]}
    >
      <div className="footer-page-section">
        <p className="text-lg">
          Join our team and help shape the future of premium e-commerce. At Luxify, we're
          building something special—a platform that combines luxury products with cutting-edge
          technology to create exceptional shopping experiences.
        </p>
      </div>

      <div className="footer-page-section">
        <h2 className="footer-page-subtitle">Why Work With Us</h2>
        <div className="footer-card-grid">
          <div className="footer-card">
            <h3 className="footer-card-title">Innovative Environment</h3>
            <p className="footer-card-content">
              Work on challenging problems and cutting-edge technologies like 3D product
              visualization, AI-powered recommendations, and more.
            </p>
          </div>

          <div className="footer-card">
            <h3 className="footer-card-title">Growth Opportunities</h3>
            <p className="footer-card-content">
              We're growing rapidly, creating abundant opportunities for career advancement
              and professional development.
            </p>
          </div>

          <div className="footer-card">
            <h3 className="footer-card-title">Competitive Benefits</h3>
            <p className="footer-card-content">
              Enjoy competitive salaries, comprehensive health benefits, generous PTO,
              employee discounts, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-page-section">
        <h2 className="footer-page-subtitle">Our Values</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Customer Obsession:</strong> We start with the customer and work backward.</li>
          <li><strong>Innovation:</strong> We constantly seek new ways to improve the shopping experience.</li>
          <li><strong>Excellence:</strong> We hold ourselves to the highest standards in everything we do.</li>
          <li><strong>Inclusivity:</strong> We value diverse perspectives and create an environment where everyone belongs.</li>
          <li><strong>Sustainability:</strong> We're committed to reducing our environmental impact.</li>
        </ul>
      </div>

      <div className="footer-page-section">
        <h2 className="footer-page-subtitle flex items-center">
          <FaBriefcase className="mr-2" />
          Open Positions
        </h2>
        
        <div className="mt-6 space-y-4">
          {jobListings.map(job => (
            <div key={job.id} className="footer-card">
              <div className="flex items-start">
                <div className="mr-4 mt-1">{job.icon}</div>
                <div>
                  <h3 className="footer-card-title">{job.title}</h3>
                  <div className="text-gray-600 mt-1">
                    <p>{job.department} • {job.location}</p>
                    <p className="text-sm mt-1">{job.type}</p>
                  </div>
                  <button className="footer-page-button footer-page-button-primary mt-4">Apply Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="mb-4">Don't see a position that matches your skills?</p>
          <button className="footer-page-button footer-page-button-secondary">
            Submit Your Resume
          </button>
        </div>
      </div>
    </FooterPageTemplate>
  );
};

export default CareersPage;
