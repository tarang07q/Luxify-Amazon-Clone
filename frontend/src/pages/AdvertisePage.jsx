import React from 'react';
import { FaAd, FaSearch, FaShoppingCart, FaBullseye, FaChartLine, FaLightbulb } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const AdvertisePage = () => {
  // Sample ad formats
  const adFormats = [
    {
      title: "Sponsored Products",
      description: "Promote individual products within search results and product detail pages.",
      bestFor: "Increasing visibility for specific products and driving sales.",
      icon: <FaSearch className="text-primary text-2xl" />
    },
    {
      title: "Sponsored Brands",
      description: "Feature your brand logo, custom headline, and multiple products in banner ads.",
      bestFor: "Building brand awareness and showcasing your product portfolio.",
      icon: <FaAd className="text-primary text-2xl" />
    },
    {
      title: "Sponsored Display",
      description: "Reach relevant audiences on and off Luxify with auto-generated display ads.",
      bestFor: "Retargeting shoppers who viewed your products but didn't purchase.",
      icon: <FaShoppingCart className="text-primary text-2xl" />
    }
  ];

  return (
    <PageTemplate 
      title="Advertise Your Products" 
      breadcrumbs={[{ text: 'Advertise Your Products' }]}
    >
      <div className="page-section">
        <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-8 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Grow Your Business with Luxify Advertising</h2>
          <p className="mb-6">
            Reach millions of shoppers at every stage of their buying journey. Our self-service advertising 
            solutions make it easy to create campaigns that drive discovery, consideration, and purchase.
          </p>
          <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300">
            Create Your First Campaign
          </button>
        </div>
        
        <p className="text-lg">
          Luxify Advertising helps you connect with shoppers at every stage of their journey—from 
          awareness to consideration to purchase. With our suite of advertising solutions, you can 
          create campaigns that meet your specific business goals, whether you're looking to drive 
          brand discovery, increase product visibility, or boost sales.
        </p>
      </div>

      <div className="page-section">
        <h2>Why Advertise on Luxify?</h2>
        
        <div className="info-grid">
          <div className="info-card">
            <FaBullseye className="text-primary text-3xl mb-4" />
            <h3>Reach Relevant Shoppers</h3>
            <p>
              Connect with customers who are actively searching for products like yours, 
              increasing the likelihood of conversion.
            </p>
          </div>
          
          <div className="info-card">
            <FaChartLine className="text-primary text-3xl mb-4" />
            <h3>Measurable Results</h3>
            <p>
              Track impressions, clicks, and sales with detailed reporting to understand 
              your return on ad spend.
            </p>
          </div>
          
          <div className="info-card">
            <FaLightbulb className="text-primary text-3xl mb-4" />
            <h3>Flexible Options</h3>
            <p>
              Choose from multiple ad formats and targeting options to create campaigns 
              that align with your specific goals.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Advertising Solutions</h2>
        
        <div className="space-y-6">
          {adFormats.map((format, index) => (
            <div key={index} className="info-card">
              <div className="flex items-start">
                <div className="mr-4 mt-1">{format.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{format.title}</h3>
                  <p className="my-2">{format.description}</p>
                  <p className="text-sm">
                    <strong>Best for:</strong> {format.bestFor}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <h2>How It Works</h2>
        
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>
          
          <div className="space-y-12">
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">1. Choose Your Ad Format</h3>
                <p>
                  Select the ad format that best aligns with your business goals, whether you want 
                  to promote individual products, build brand awareness, or retarget potential customers.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">2. Set Your Budget and Bidding Strategy</h3>
                <p>
                  Decide how much you want to spend daily or for the duration of your campaign. 
                  Choose between automatic and manual bidding based on your expertise and goals.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">3. Create Your Ad</h3>
                <p>
                  Select the products you want to advertise, customize your creative assets 
                  (if applicable), and define your targeting parameters.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">4. Launch and Monitor</h3>
                <p>
                  Once your campaign is live, monitor its performance through our advertising 
                  dashboard. Track impressions, clicks, sales, and return on ad spend.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">5. Optimize and Scale</h3>
                <p>
                  Use performance data to refine your campaigns. Adjust bids, update targeting, 
                  and scale successful strategies to maximize your return on investment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Success Stories</h2>
        
        <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl mb-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
            </div>
            <div className="md:w-3/4 md:pl-6">
              <h3 className="text-xl font-semibold mb-2">LuxHome Decor</h3>
              <p className="italic mb-4">
                "Luxify Advertising helped us increase our sales by 45% in just three months. 
                The targeting capabilities allowed us to reach customers who were specifically 
                interested in premium home decor, resulting in a 3.2x return on ad spend."
              </p>
              <p className="text-sm">
                <strong>Sarah Johnson</strong>, Founder of LuxHome Decor
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
            </div>
            <div className="md:w-3/4 md:pl-6">
              <h3 className="text-xl font-semibold mb-2">TechElite</h3>
              <p className="italic mb-4">
                "As a new brand in a competitive category, visibility was our biggest challenge. 
                Sponsored Brands helped us establish our presence and build awareness. Within six 
                months, we saw a 300% increase in brand searches on Luxify."
              </p>
              <p className="text-sm">
                <strong>Michael Chen</strong>, Marketing Director at TechElite
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Ready to Get Started?</h2>
        <p className="mb-6">
          Create your first advertising campaign today and start connecting with millions of Luxify shoppers.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="cta-button">
            Create Campaign
          </button>
          <button className="secondary-button">
            Learn More
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AdvertisePage;
