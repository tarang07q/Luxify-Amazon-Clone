import React from 'react';
import { FaStore, FaChartLine, FaGlobeAmericas, FaTruck, FaUserFriends, FaQuestionCircle } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';
import { useTheme } from '../context/ThemeContext';

const SellPage = () => {
  const { theme } = useTheme();

  // Sample seller success stories
  const successStories = [
    {
      name: "Artisan Crafts Co.",
      category: "Handmade Goods",
      story: "Started selling handcrafted jewelry on Luxify in 2022. Within 6 months, they expanded their product line and now have a team of 5 artisans fulfilling orders."
    },
    {
      name: "EcoHome Essentials",
      category: "Sustainable Home Products",
      story: "Launched their eco-friendly home products on Luxify and saw a 300% increase in sales within the first year. They've since expanded to international markets."
    },
    {
      name: "TechGear Pro",
      category: "Electronics Accessories",
      story: "A solo entrepreneur who turned his passion for gadgets into a thriving business. Now sells in 12 countries with Luxify's global fulfillment network."
    }
  ];

  return (
    <PageTemplate
      title="Sell on Luxify"
      breadcrumbs={[{ text: 'Sell on Luxify' }]}
    >
      <div className="page-section">
        <div className="futuristic-banner">
          <div className="futuristic-banner-content">
            <h2 className="futuristic-banner-title">Start Selling Today</h2>
            <p className="futuristic-banner-text">
              Join thousands of businesses selling on Luxify and reach millions of customers worldwide.
              Whether you're just starting out or looking to expand your existing business, we have the tools and support to help you succeed.
            </p>
            <button className="cta-button">
              Create Seller Account
            </button>
          </div>
        </div>

        <p className="text-lg">
          Luxify connects you with millions of customers looking for premium products.
          Our seller platform provides powerful tools, global fulfillment options, and dedicated support
          to help your business thrive.
        </p>
      </div>

      <div className="page-section">
        <h2>Why Sell on Luxify?</h2>

        <div className="info-grid">
          <div className="info-card">
            <FaStore className="text-primary text-3xl mb-4" />
            <h3>Reach Millions of Customers</h3>
            <p>
              Get your products in front of our global customer base of premium shoppers
              looking for quality products like yours.
            </p>
          </div>

          <div className="info-card">
            <FaChartLine className="text-primary text-3xl mb-4" />
            <h3>Powerful Analytics</h3>
            <p>
              Access detailed sales data, customer insights, and performance metrics to
              optimize your business and drive growth.
            </p>
          </div>

          <div className="info-card">
            <FaGlobeAmericas className="text-primary text-3xl mb-4" />
            <h3>Sell Globally</h3>
            <p>
              Expand your business internationally with our global marketplace and
              multi-currency support.
            </p>
          </div>

          <div className="info-card">
            <FaTruck className="text-primary text-3xl mb-4" />
            <h3>Fulfillment by Luxify</h3>
            <p>
              Let us handle storage, packaging, and shipping while you focus on growing
              your business.
            </p>
          </div>

          <div className="info-card">
            <FaUserFriends className="text-primary text-3xl mb-4" />
            <h3>Seller Support</h3>
            <p>
              Get dedicated support from our seller success team to help you navigate
              challenges and maximize opportunities.
            </p>
          </div>

          <div className="info-card">
            <FaQuestionCircle className="text-primary text-3xl mb-4" />
            <h3>Learning Resources</h3>
            <p>
              Access comprehensive guides, webinars, and training to help you master
              selling on Luxify.
            </p>
          </div>
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
                <h3 className="text-xl font-semibold mb-2">1. Create Your Seller Account</h3>
                <p>
                  Sign up for a Luxify Seller account. You'll need basic business information,
                  a bank account for deposits, and tax information.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">2. List Your Products</h3>
                <p>
                  Create detailed product listings with high-quality images, descriptions, and pricing.
                  Our tools make it easy to create listings that convert.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">3. Choose Your Fulfillment Method</h3>
                <p>
                  Decide whether to ship products yourself or use Fulfillment by Luxify,
                  where we handle storage, packaging, and shipping for you.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">4. Start Selling</h3>
                <p>
                  Once your listings are live, customers can discover and purchase your products.
                  You'll receive notifications for new orders and payments.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">5. Grow Your Business</h3>
                <p>
                  Use our analytics tools to track performance, optimize listings, and identify
                  growth opportunities. Scale your business with advertising and promotions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Success Stories</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <div key={index} className="info-card">
              <h3 className="text-xl font-semibold mb-1">{story.name}</h3>
              <p className="text-primary text-sm mb-3">{story.category}</p>
              <p>{story.story}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <h2>Ready to Start Selling?</h2>
        <p className="mb-6">
          Join thousands of businesses already selling on Luxify and take your business to the next level.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="cta-button">
            Create Seller Account
          </button>
          <button className="secondary-button">
            Learn More
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SellPage;
