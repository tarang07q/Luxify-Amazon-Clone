import React from 'react';
import { FaHandshake, FaMoneyBillWave, FaGlobe, FaUserFriends, FaChartLine, FaQuestionCircle } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const AffiliatePage = () => {
  // Sample affiliate benefits
  const benefits = [
    {
      title: "High Commission Rates",
      description: "Earn up to 15% commission on qualified sales, with special rates for luxury products.",
      icon: <FaMoneyBillWave className="text-primary text-2xl" />
    },
    {
      title: "Global Reach",
      description: "Promote products to customers in multiple countries with localized affiliate links.",
      icon: <FaGlobe className="text-primary text-2xl" />
    },
    {
      title: "Exclusive Promotions",
      description: "Access to exclusive deals and promotions to share with your audience.",
      icon: <FaUserFriends className="text-primary text-2xl" />
    },
    {
      title: "Advanced Analytics",
      description: "Track performance with detailed reporting on clicks, conversions, and earnings.",
      icon: <FaChartLine className="text-primary text-2xl" />
    }
  ];

  return (
    <PageTemplate 
      title="Become a Luxify Affiliate" 
      breadcrumbs={[{ text: 'Become an Affiliate' }]}
    >
      <div className="page-section">
        <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-8 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Turn Your Influence Into Income</h2>
          <p className="mb-6">
            Join the Luxify Affiliate Program and earn commissions by promoting premium products to your audience.
            It's free to join and offers some of the highest commission rates in the industry.
          </p>
          <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300">
            Apply Now - It's Free
          </button>
        </div>
        
        <p className="text-lg">
          The Luxify Affiliate Program is designed for content creators, influencers, and website owners 
          who want to monetize their audience by promoting high-quality products. Unlike our Associates Program, 
          which is open to everyone, our Affiliate Program offers higher commission rates and exclusive benefits 
          to selected partners who meet our quality standards.
        </p>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaHandshake className="mr-2 text-primary" />
          Program Benefits
        </h2>
        
        <div className="info-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="info-card">
              <div className="flex items-start">
                <div className="mr-4 mt-1">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="mt-2">{benefit.description}</p>
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
                <h3 className="text-xl font-semibold mb-2">1. Apply to the Program</h3>
                <p>
                  Submit your application with details about your platform, audience, and content strategy. 
                  Our team will review your application and respond within 5 business days.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">2. Get Approved and Set Up</h3>
                <p>
                  Once approved, you'll gain access to our affiliate dashboard where you can create 
                  custom tracking links, access promotional materials, and view performance metrics.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">3. Promote Products</h3>
                <p>
                  Share your affiliate links through your website, blog, social media, email newsletters, 
                  or other channels. Focus on products that resonate with your audience for best results.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">4. Earn Commissions</h3>
                <p>
                  When someone clicks your affiliate link and makes a purchase within 30 days, 
                  you earn a commission on the sale. Commission rates vary by product category.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">5. Get Paid</h3>
                <p>
                  Receive monthly payments via direct deposit, PayPal, or check once your 
                  earnings reach the minimum threshold of $50.
                </p>
              </div>
            </div>
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
                <th className="py-3 px-4 text-left">Standard Rate</th>
                <th className="py-3 px-4 text-left">Premium Affiliate Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 px-4">Luxury Fashion</td>
                <td className="py-3 px-4">8%</td>
                <td className="py-3 px-4">12%</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Electronics</td>
                <td className="py-3 px-4">4%</td>
                <td className="py-3 px-4">7%</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Home & Kitchen</td>
                <td className="py-3 px-4">6%</td>
                <td className="py-3 px-4">10%</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Beauty & Personal Care</td>
                <td className="py-3 px-4">10%</td>
                <td className="py-3 px-4">15%</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Books & Media</td>
                <td className="py-3 px-4">5%</td>
                <td className="py-3 px-4">8%</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Luxify Premium Membership</td>
                <td className="py-3 px-4">$10 flat fee</td>
                <td className="py-3 px-4">$15 flat fee</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="mt-4 text-sm text-gray-600">
          * Premium Affiliate status is granted to partners who consistently drive high-quality traffic and sales.
        </p>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaQuestionCircle className="mr-2 text-primary" />
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">What's the difference between the Associates Program and the Affiliate Program?</h3>
            <p>
              The Associates Program is open to everyone and offers standard commission rates. 
              The Affiliate Program is invitation-only or application-based and offers higher commission rates, 
              exclusive promotions, and dedicated support.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">What are the requirements to join?</h3>
            <p>
              We look for partners with established platforms (websites, social media accounts, YouTube channels, etc.) 
              with engaged audiences interested in premium products. Quality content, authentic engagement, and alignment 
              with our brand values are key factors in our selection process.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">How long does the approval process take?</h3>
            <p>
              We typically review applications within 5 business days. If approved, you'll receive an email with 
              instructions to set up your affiliate account.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Are there any fees to join?</h3>
            <p>
              No, joining the Luxify Affiliate Program is completely free.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">How do I track my performance?</h3>
            <p>
              Our affiliate dashboard provides real-time reporting on clicks, conversions, and earnings. 
              You can track performance by product, time period, and campaign.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Ready to Join?</h2>
        <p className="mb-6">
          Apply to the Luxify Affiliate Program today and start earning commissions on premium product sales.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="cta-button">
            Apply Now
          </button>
          <button className="secondary-button">
            Contact Affiliate Team
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AffiliatePage;
