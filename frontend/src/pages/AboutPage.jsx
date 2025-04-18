import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaUsers, FaGlobe, FaLeaf } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const AboutPage = () => {
  return (
    <PageTemplate 
      title="About Luxify" 
      breadcrumbs={[{ text: 'About Us' }]}
    >
      <div className="page-section">
        <p>
          Welcome to Luxify, where premium shopping meets cutting-edge technology. 
          Founded in 2023, we've quickly established ourselves as a leader in the e-commerce 
          space by offering a curated selection of high-quality products and an unparalleled 
          shopping experience.
        </p>
        
        <p>
          Our mission is simple: to transform online shopping by combining premium products 
          with immersive technology. We believe that shopping should be more than just a transaction—it 
          should be an experience that delights and inspires.
        </p>
      </div>

      <div className="page-section">
        <h2>What Sets Us Apart</h2>
        
        <div className="info-grid">
          <div className="info-card">
            <FaBuilding className="text-primary text-3xl mb-4" />
            <h3>Premium Selection</h3>
            <p>
              We carefully curate our product catalog to offer only the highest quality items 
              across all categories, ensuring that every purchase meets our standards of excellence.
            </p>
          </div>
          
          <div className="info-card">
            <FaUsers className="text-primary text-3xl mb-4" />
            <h3>Customer-Centric Approach</h3>
            <p>
              Our customers are at the heart of everything we do. We continuously improve our 
              platform based on your feedback to create the most intuitive and enjoyable shopping experience.
            </p>
          </div>
          
          <div className="info-card">
            <FaGlobe className="text-primary text-3xl mb-4" />
            <h3>Global Reach</h3>
            <p>
              With operations spanning multiple countries, we connect customers with exceptional 
              products from around the world, all while maintaining fast shipping and excellent service.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Our Commitment to Sustainability</h2>
        <div className="flex items-center mb-6">
          <FaLeaf className="text-green-500 text-4xl mr-4" />
          <div>
            <p>
              At Luxify, we're committed to reducing our environmental impact. We're working 
              toward carbon-neutral shipping, sustainable packaging, and partnering with brands 
              that share our values of environmental responsibility.
            </p>
          </div>
        </div>
        
        <p>
          We believe that luxury and sustainability can go hand in hand, and we're dedicated to 
          proving that every day through our business practices and partnerships.
        </p>
      </div>

      <div className="page-section">
        <h2>Join Our Journey</h2>
        <p>
          We're just getting started, and we invite you to be part of our story. Whether you're 
          a customer, partner, or potential team member, there are many ways to join the Luxify community.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-6">
          <Link to="/careers" className="cta-button">
            Explore Careers
          </Link>
          <Link to="/sell" className="secondary-button">
            Become a Seller
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AboutPage;
