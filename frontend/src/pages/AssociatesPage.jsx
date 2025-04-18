import React from 'react';
import { FaLink, FaMoneyBillWave, FaChartBar, FaLaptop, FaMobileAlt, FaUserFriends } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const AssociatesPage = () => {
  return (
    <PageTemplate 
      title="Luxify Associates Program" 
      breadcrumbs={[{ text: 'Luxify Associates' }]}
    >
      <div className="page-section">
        <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-8 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Earn Money Sharing Products You Love</h2>
          <p className="mb-6">
            Join the Luxify Associates Program and earn commissions by recommending products to your audience.
            It's free to join, easy to use, and a great way to monetize your content.
          </p>
          <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300">
            Join Associates Program
          </button>
        </div>
        
        <p className="text-lg">
          The Luxify Associates Program is one of the largest and most successful affiliate programs in the world. 
          Whether you're a blogger, content creator, or website owner, you can earn money by promoting products available on Luxify.
        </p>
      </div>

      <div className="page-section">
        <h2>How It Works</h2>
        
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>
          
          <div className="space-y-12">
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">1. Sign Up</h3>
                <p>
                  Join the Luxify Associates Program for free. You'll need a Luxify account, 
                  information about your website or content platform, and how you plan to drive traffic.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">2. Create Links</h3>
                <p>
                  Use our tools to create custom affiliate links to Luxify products or pages. 
                  You can create text links, product showcases, banners, and more.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">3. Share with Your Audience</h3>
                <p>
                  Add these links to your website, blog, social media, or other content platforms. 
                  When you share products that resonate with your audience, they're more likely to make a purchase.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">4. Earn Commissions</h3>
                <p>
                  When someone clicks your link and makes a purchase on Luxify, you earn a commission. 
                  Commission rates vary by product category, ranging from 3% to 10%.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">5. Get Paid</h3>
                <p>
                  Receive payments via direct deposit, check, or Luxify gift cards. 
                  Payments are made monthly for earnings that meet the minimum threshold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Program Benefits</h2>
        
        <div className="info-grid">
          <div className="info-card">
            <FaMoneyBillWave className="text-primary text-3xl mb-4" />
            <h3>Competitive Commission Rates</h3>
            <p>
              Earn up to 10% commission on qualified purchases, with special rates for luxury and high-ticket items.
            </p>
          </div>
          
          <div className="info-card">
            <FaLink className="text-primary text-3xl mb-4" />
            <h3>Advanced Linking Tools</h3>
            <p>
              Create custom links, product showcases, and banners with our easy-to-use tools and APIs.
            </p>
          </div>
          
          <div className="info-card">
            <FaChartBar className="text-primary text-3xl mb-4" />
            <h3>Detailed Reporting</h3>
            <p>
              Track clicks, conversions, and earnings with our comprehensive reporting dashboard.
            </p>
          </div>
          
          <div className="info-card">
            <FaLaptop className="text-primary text-3xl mb-4" />
            <h3>Content Creation Resources</h3>
            <p>
              Access guides, tutorials, and best practices to help you create effective affiliate content.
            </p>
          </div>
          
          <div className="info-card">
            <FaMobileAlt className="text-primary text-3xl mb-4" />
            <h3>Mobile Optimization</h3>
            <p>
              Our affiliate links work seamlessly across desktop and mobile devices for maximum conversion.
            </p>
          </div>
          
          <div className="info-card">
            <FaUserFriends className="text-primary text-3xl mb-4" />
            <h3>Dedicated Support</h3>
            <p>
              Get help from our Associates support team whenever you need assistance.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Commission Structure</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Product Category</th>
                <th className="py-3 px-4 text-left">Commission Rate</th>
                <th className="py-3 px-4 text-left">Cookie Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 px-4">Luxury Fashion</td>
                <td className="py-3 px-4">8%</td>
                <td className="py-3 px-4">30 days</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Electronics</td>
                <td className="py-3 px-4">4%</td>
                <td className="py-3 px-4">30 days</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Home & Kitchen</td>
                <td className="py-3 px-4">6%</td>
                <td className="py-3 px-4">30 days</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Beauty & Personal Care</td>
                <td className="py-3 px-4">10%</td>
                <td className="py-3 px-4">30 days</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Books & Media</td>
                <td className="py-3 px-4">5%</td>
                <td className="py-3 px-4">30 days</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Luxify Services</td>
                <td className="py-3 px-4">10%</td>
                <td className="py-3 px-4">30 days</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="mt-4 text-sm text-gray-600">
          * Commission rates are subject to change. See program terms for complete details.
        </p>
      </div>

      <div className="page-section">
        <h2>Who Can Join?</h2>
        
        <p className="mb-4">
          The Luxify Associates Program is open to a wide range of content creators and website owners, including:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Bloggers and Content Creators:</strong> Share products relevant to your content and earn commissions.</li>
          <li><strong>Social Media Influencers:</strong> Monetize your social media presence by sharing products with your followers.</li>
          <li><strong>Review Sites:</strong> Earn commissions when readers purchase products you've reviewed.</li>
          <li><strong>App Developers:</strong> Integrate Luxify product recommendations into your apps.</li>
          <li><strong>Course Creators:</strong> Recommend tools and resources related to your courses.</li>
        </ul>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Program Requirements</h3>
          <p className="mb-4">
            To join the Luxify Associates Program, you'll need:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>An active website, blog, app, or social media presence</li>
            <li>Content that is original and regularly updated</li>
            <li>A Luxify account in good standing</li>
            <li>Compliance with our Associates Program Operating Agreement</li>
          </ul>
        </div>
      </div>

      <div className="page-section">
        <h2>Ready to Start Earning?</h2>
        <p className="mb-6">
          Join thousands of content creators already earning commissions through the Luxify Associates Program.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="cta-button">
            Join Now - It's Free
          </button>
          <button className="secondary-button">
            Learn More
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AssociatesPage;
