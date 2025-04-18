import React from 'react';
import { FaBriefcase, FaLaptopCode, FaChartLine, FaShippingFast, FaHeadset } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

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
    <PageTemplate 
      title="Careers at Luxify" 
      breadcrumbs={[{ text: 'Careers' }]}
    >
      <div className="page-section">
        <p className="text-lg">
          Join our team and help shape the future of premium e-commerce. At Luxify, we're 
          building something special—a platform that combines luxury products with cutting-edge 
          technology to create exceptional shopping experiences.
        </p>
      </div>

      <div className="page-section">
        <h2>Why Work With Us</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Innovative Environment</h3>
            <p>
              Work on challenging problems and cutting-edge technologies like 3D product 
              visualization, AI-powered recommendations, and more.
            </p>
          </div>
          
          <div className="info-card">
            <h3>Growth Opportunities</h3>
            <p>
              We're growing rapidly, creating abundant opportunities for career advancement 
              and professional development.
            </p>
          </div>
          
          <div className="info-card">
            <h3>Competitive Benefits</h3>
            <p>
              Enjoy competitive salaries, comprehensive health benefits, generous PTO, 
              employee discounts, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Our Values</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Customer Obsession:</strong> We start with the customer and work backward.</li>
          <li><strong>Innovation:</strong> We constantly seek new ways to improve the shopping experience.</li>
          <li><strong>Excellence:</strong> We hold ourselves to the highest standards in everything we do.</li>
          <li><strong>Inclusivity:</strong> We value diverse perspectives and create an environment where everyone belongs.</li>
          <li><strong>Sustainability:</strong> We're committed to reducing our environmental impact.</li>
        </ul>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaBriefcase className="mr-2 text-primary" />
          Open Positions
        </h2>
        
        <div className="mt-6 space-y-4">
          {jobListings.map(job => (
            <div key={job.id} className="info-card">
              <div className="flex items-start">
                <div className="mr-4 mt-1">{job.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <div className="text-gray-600 mt-1">
                    <p>{job.department} • {job.location}</p>
                    <p className="text-sm mt-1">{job.type}</p>
                  </div>
                  <button className="cta-button mt-4">Apply Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="mb-4">Don't see a position that matches your skills?</p>
          <button className="secondary-button">
            Submit Your Resume
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default CareersPage;
