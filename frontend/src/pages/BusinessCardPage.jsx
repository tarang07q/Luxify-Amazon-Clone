import React from 'react';
import { FaCreditCard, FaChartLine, FaFileInvoiceDollar, FaShieldAlt, FaGift, FaPlane } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const BusinessCardPage = () => {
  return (
    <PageTemplate 
      title="Luxify Business Card" 
      breadcrumbs={[{ text: 'Luxify Business Card' }]}
    >
      <div className="page-section">
        <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-8 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-4">The Ultimate Business Card for Your Company</h2>
              <p className="mb-6">
                Streamline your business purchases, earn rewards, and gain valuable insights with the Luxify Business Card.
                No annual fee and exclusive business benefits.
              </p>
              <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300">
                Apply Now
              </button>
            </div>
            <div className="md:w-1/3">
              <div className="w-full h-48 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-4 left-4">
                  <FaCreditCard className="text-white text-2xl mb-2" />
                  <div className="text-white font-bold">LUXIFY BUSINESS</div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white opacity-80 text-sm mb-1">COMPANY NAME</div>
                  <div className="text-white font-medium">•••• •••• •••• 1234</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-lg">
          The Luxify Business Card is designed specifically for businesses of all sizes, 
          from startups to enterprises. It offers a seamless way to manage your business 
          purchases on Luxify while earning rewards and gaining valuable insights into 
          your spending patterns.
        </p>
      </div>

      <div className="page-section">
        <h2>Key Benefits</h2>
        
        <div className="info-grid">
          <div className="info-card">
            <FaChartLine className="text-primary text-3xl mb-4" />
            <h3>5% Back on Luxify Business</h3>
            <p>
              Earn 5% back on all purchases made at Luxify Business, including office supplies, 
              electronics, and business services.
            </p>
          </div>
          
          <div className="info-card">
            <FaFileInvoiceDollar className="text-primary text-3xl mb-4" />
            <h3>Detailed Expense Tracking</h3>
            <p>
              Easily categorize and track business expenses with detailed reporting and 
              QuickBooks integration.
            </p>
          </div>
          
          <div className="info-card">
            <FaShieldAlt className="text-primary text-3xl mb-4" />
            <h3>Purchase Protection</h3>
            <p>
              Get additional protection on eligible purchases against damage or theft for 120 days.
            </p>
          </div>
          
          <div className="info-card">
            <FaGift className="text-primary text-3xl mb-4" />
            <h3>No Annual Fee</h3>
            <p>
              Enjoy all the benefits of the Luxify Business Card with no annual fee.
            </p>
          </div>
          
          <div className="info-card">
            <FaPlane className="text-primary text-3xl mb-4" />
            <h3>Travel Benefits</h3>
            <p>
              Access to travel insurance, car rental coverage, and no foreign transaction fees.
            </p>
          </div>
          
          <div className="info-card">
            <FaCreditCard className="text-primary text-3xl mb-4" />
            <h3>Employee Cards</h3>
            <p>
              Add employee cards with custom spending limits and earn rewards on their purchases too.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Rewards Program</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Reward Rate</th>
                <th className="py-3 px-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 px-4">Luxify Business Purchases</td>
                <td className="py-3 px-4">5% back</td>
                <td className="py-3 px-4">On all eligible purchases at Luxify Business</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Office Supply Stores</td>
                <td className="py-3 px-4">3% back</td>
                <td className="py-3 px-4">At office supply stores and on internet, cable, and phone services</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Restaurants & Gas Stations</td>
                <td className="py-3 px-4">2% back</td>
                <td className="py-3 px-4">At restaurants and gas stations</td>
              </tr>
              <tr>
                <td className="py-3 px-4">All Other Purchases</td>
                <td className="py-3 px-4">1% back</td>
                <td className="py-3 px-4">On all other eligible purchases</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">How Rewards Work</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Rewards are earned as Luxify Points, which can be redeemed for purchases on Luxify, statement credits, gift cards, or travel.</li>
            <li>Points never expire as long as your account remains open and in good standing.</li>
            <li>There's no limit to the amount of points you can earn.</li>
            <li>Redeem points starting at 1 point = 1 cent value.</li>
          </ul>
        </div>
      </div>

      <div className="page-section">
        <h2>Business Tools</h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Expense Management</h3>
            <p className="mb-4">
              The Luxify Business Card comes with powerful expense management tools to help you track and categorize your business spending:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Detailed transaction data with vendor information</li>
              <li>Custom tags and notes for each transaction</li>
              <li>Quarterly and year-end summaries</li>
              <li>Export data to QuickBooks, Xero, and other accounting software</li>
              <li>Receipt matching and storage</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Employee Card Management</h3>
            <p className="mb-4">
              Easily manage employee spending with customizable controls:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Set individual spending limits for each employee card</li>
              <li>Receive real-time alerts for purchases</li>
              <li>Restrict purchases by category or merchant</li>
              <li>Centralized billing with itemized employee spending</li>
              <li>Add or remove employee cards instantly</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>How to Apply</h2>
        
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>
          
          <div className="space-y-12">
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">1. Check Eligibility</h3>
                <p>
                  To be eligible, you must have a registered business (LLC, corporation, sole proprietorship, etc.) 
                  with a valid EIN or SSN for business purposes.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">2. Complete Application</h3>
                <p>
                  Fill out the online application with your business and personal information. 
                  The application typically takes less than 10 minutes to complete.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">3. Receive Decision</h3>
                <p>
                  Most applications receive an instant decision. In some cases, we may need 
                  additional information to process your application.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">4. Start Using Your Card</h3>
                <p>
                  Once approved, you'll receive your card within 7-10 business days. You can start 
                  using your card immediately for online purchases through your Luxify account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Ready to Apply?</h2>
        <p className="mb-6">
          Take control of your business spending and start earning rewards with the Luxify Business Card.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="cta-button">
            Apply Now
          </button>
          <button className="secondary-button">
            Learn More
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default BusinessCardPage;
