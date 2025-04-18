import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaUsers, FaGlobe, FaLeaf, FaInfoCircle } from 'react-icons/fa';
import FooterPageTemplate from '../components/layout/FooterPageTemplate';

const AboutPage = () => {
  return (
    <FooterPageTemplate
      title="About Luxify"
      subtitle="Premium shopping meets cutting-edge technology"
      icon={<FaInfoCircle />}
      breadcrumbs={[{ text: 'About Us' }]}
    >
      <div className="footer-page-section">
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

      <div className="footer-page-section">
        <h2 className="footer-page-subtitle">What Sets Us Apart</h2>

        <div className="footer-card-grid">
          <div className="footer-card">
            <FaBuilding className="footer-card-icon" />
            <h3 className="footer-card-title">Premium Selection</h3>
            <p className="footer-card-content">
              We carefully curate our product catalog to offer only the highest quality items
              across all categories, ensuring that every purchase meets our standards of excellence.
            </p>
          </div>

          <div className="footer-card">
            <FaUsers className="footer-card-icon" />
            <h3 className="footer-card-title">Customer-Centric Approach</h3>
            <p className="footer-card-content">
              Our customers are at the heart of everything we do. We continuously improve our
              platform based on your feedback to create the most intuitive and enjoyable shopping experience.
            </p>
          </div>

          <div className="footer-card">
            <FaGlobe className="footer-card-icon" />
            <h3 className="footer-card-title">Global Reach</h3>
            <p className="footer-card-content">
              With operations spanning multiple countries, we connect customers with exceptional
              products from around the world, all while maintaining fast shipping and excellent service.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-page-section">
        <h2 className="footer-page-subtitle">Our Commitment to Sustainability</h2>
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

      <div className="footer-page-section">
        <h2 className="footer-page-subtitle">Join Our Journey</h2>
        <p>
          We're just getting started, and we invite you to be part of our story. Whether you're
          a customer, partner, or potential team member, there are many ways to join the Luxify community.
        </p>

        <div className="flex flex-wrap gap-4 mt-6">
          <Link to="/careers" className="footer-page-button footer-page-button-primary">
            Explore Careers
          </Link>
          <Link to="/sell" className="footer-page-button footer-page-button-secondary">
            Become a Seller
          </Link>
        </div>
      </div>
    </FooterPageTemplate>
  );
};

export default AboutPage;
