import React from 'react';
import { FaRobot, FaVrCardboard, FaServer, FaShieldAlt, FaLightbulb, FaFlask } from 'react-icons/fa';
import FooterPageTemplate from '../components/layout/FooterPageTemplate';

const AmazerSciencePage = () => {
  return (
    <FooterPageTemplate
      title="Luxify Science"
      subtitle="Pioneering the future of e-commerce technology"
      icon={<FaFlask />}
      breadcrumbs={[{ text: 'Luxify Science' }]}
    >
      <div className="footer-page-section">
        <p className="text-lg">
          At Luxify Science, we're pushing the boundaries of what's possible in e-commerce.
          Our team of scientists, engineers, and researchers work on cutting-edge technologies
          that power the Luxify shopping experience and shape the future of online retail.
        </p>
      </div>

      <div className="footer-page-section">
        <h2 className="footer-page-subtitle">Our Research Areas</h2>

        <div className="footer-card-grid">
          <div className="footer-card">
            <FaRobot className="footer-card-icon" />
            <h3 className="footer-card-title">Artificial Intelligence</h3>
            <p className="footer-card-content">
              Our AI team develops advanced machine learning models that power personalized
              recommendations, natural language processing for search, and automated customer service.
            </p>
          </div>

          <div className="footer-card">
            <FaVrCardboard className="footer-card-icon" />
            <h3 className="footer-card-title">3D Visualization & AR</h3>
            <p className="footer-card-content">
              We're pioneering new ways to visualize products online with photorealistic 3D models
              and augmented reality experiences that let customers see products in their own space.
            </p>
          </div>

          <div className="footer-card">
            <FaServer className="footer-card-icon" />
            <h3 className="footer-card-title">Cloud Computing</h3>
            <p className="footer-card-content">
              Our cloud infrastructure team builds scalable systems that handle millions of
              transactions while maintaining lightning-fast performance and reliability.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-page-section">
        <h2 className="footer-page-subtitle">Recent Innovations</h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">LuxVision: 3D Product Visualization</h3>
            <p className="mb-4">
              Our proprietary 3D rendering technology creates photorealistic models of products 
              that customers can rotate, zoom, and examine in detail. This technology reduces 
              return rates by 24% by giving customers a better understanding of products before purchase.
            </p>
            <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
              <p className="text-gray-400">3D Product Demo Placeholder</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">LuxMatch: AI-Powered Recommendations</h3>
            <p>
              Our advanced recommendation engine analyzes billions of data points to suggest 
              products that match each customer's unique preferences and style. The system 
              continuously learns and improves with each interaction, creating a personalized 
              shopping experience that gets better over time.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">LuxLogistics: Predictive Delivery</h3>
            <p>
              Our predictive logistics system uses machine learning to optimize inventory 
              placement and delivery routes, reducing delivery times by up to 30% while 
              minimizing environmental impact.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-page-section">
        <h2 className="footer-page-subtitle flex items-center">
          <FaShieldAlt className="mr-2" />
          Our Commitment to Responsible Innovation
        </h2>
        
        <p className="mb-4">
          We believe that technology should be developed responsibly, with careful consideration 
          of its impact on society. Our Responsible Innovation principles guide all our research:
        </p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Privacy by Design:</strong> We build privacy protections into our technologies from the ground up.</li>
          <li><strong>Fairness and Inclusion:</strong> We test our systems rigorously to prevent bias and ensure they work well for all users.</li>
          <li><strong>Environmental Sustainability:</strong> We optimize our technologies to minimize energy consumption and environmental impact.</li>
          <li><strong>Transparency:</strong> We're open about how our technologies work and the data they use.</li>
        </ul>
      </div>

      <div className="footer-page-section">
        <h2 className="footer-page-subtitle flex items-center">
          <FaLightbulb className="mr-2" />
          Join Our Team
        </h2>

        <p className="mb-6">
          We're always looking for talented scientists, engineers, and researchers to join our team.
          If you're passionate about solving complex problems and creating technologies that improve
          the lives of millions of customers, we want to hear from you.
        </p>

        <button className="footer-page-button footer-page-button-primary">
          View Science Careers
        </button>
      </div>
    </FooterPageTemplate>
  );
};

export default AmazerSciencePage;
