import React from 'react';
import { FaCoins, FaCreditCard, FaExchangeAlt, FaGift, FaPlane, FaHotel } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const PointsPage = () => {
  // Sample partner programs
  const partnerPrograms = [
    {
      name: "Chase Ultimate Rewards",
      transferRatio: "1:1",
      icon: <FaCreditCard className="text-blue-600 text-2xl" />
    },
    {
      name: "American Express Membership Rewards",
      transferRatio: "1:1",
      icon: <FaCreditCard className="text-green-600 text-2xl" />
    },
    {
      name: "Citi ThankYou Points",
      transferRatio: "1:1",
      icon: <FaCreditCard className="text-red-600 text-2xl" />
    },
    {
      name: "Capital One Miles",
      transferRatio: "2:1.5",
      icon: <FaCreditCard className="text-gray-600 text-2xl" />
    }
  ];

  return (
    <PageTemplate 
      title="Shop with Points" 
      breadcrumbs={[{ text: 'Shop with Points' }]}
    >
      <div className="page-section">
        <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-8 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-4">Use Your Points for Premium Shopping</h2>
              <p className="mb-6">
                Turn your credit card, airline, and hotel points into premium products on Luxify.
                Shop with points from over 15 loyalty programs with no blackout dates or restrictions.
              </p>
              <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300">
                Link Your Accounts
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaCoins className="text-white text-5xl" />
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-lg">
          Luxify's Shop with Points program allows you to use points and miles from your favorite 
          loyalty programs to make purchases on our platform. Whether you've earned points through 
          credit cards, airlines, or hotels, you can now redeem them for premium products without 
          any restrictions or blackout dates.
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
                <h3 className="text-xl font-semibold mb-2">1. Link Your Accounts</h3>
                <p>
                  Connect your loyalty program accounts to your Luxify account. We support major credit card 
                  rewards programs, airline miles, and hotel points.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">2. Shop as Usual</h3>
                <p>
                  Browse and add products to your cart just like you normally would. Our premium 
                  selection is available for points redemption with no restrictions.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">3. Choose Points at Checkout</h3>
                <p>
                  At checkout, you'll see an option to pay with points. You can choose to pay for your 
                  entire purchase with points or use a combination of points and other payment methods.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">4. Confirm and Complete</h3>
                <p>
                  Review the points redemption value and confirm your purchase. Your points will be 
                  deducted from your loyalty program account, and your order will be processed immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Partner Programs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="info-card">
            <h3 className="text-xl font-semibold mb-4">Credit Card Rewards</h3>
            <div className="space-y-4">
              {partnerPrograms.map((program, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-3">{program.icon}</div>
                  <div>
                    <p className="font-medium">{program.name}</p>
                    <p className="text-sm text-gray-600">Transfer Ratio: {program.transferRatio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="info-card">
            <h3 className="text-xl font-semibold mb-4">Travel Programs</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaPlane className="text-blue-500 text-2xl mr-3" />
                <div>
                  <p className="font-medium">Major Airline Miles</p>
                  <p className="text-sm text-gray-600">Including Delta SkyMiles, United MileagePlus, American AAdvantage</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaHotel className="text-purple-500 text-2xl mr-3" />
                <div>
                  <p className="font-medium">Hotel Loyalty Points</p>
                  <p className="text-sm text-gray-600">Including Marriott Bonvoy, Hilton Honors, IHG Rewards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Luxify Points</h3>
          <p className="mb-4">
            In addition to partner programs, you can also earn and redeem Luxify Points:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Earn 1 point for every $1 spent on Luxify</li>
            <li>Earn 2 points per $1 with Luxify Premium membership</li>
            <li>Earn bonus points through special promotions and events</li>
            <li>Redeem at a value of 1 point = 1 cent toward purchases</li>
            <li>No minimum redemption amount</li>
          </ul>
        </div>
      </div>

      <div className="page-section">
        <h2>Maximizing Your Points Value</h2>
        
        <div className="info-grid">
          <div className="info-card">
            <FaGift className="text-primary text-3xl mb-4" />
            <h3>Flash Deals</h3>
            <p>
              Look for limited-time flash deals where your points are worth up to 50% more 
              on select products.
            </p>
          </div>
          
          <div className="info-card">
            <FaExchangeAlt className="text-primary text-3xl mb-4" />
            <h3>Points Transfers</h3>
            <p>
              Transfer points between programs to consolidate your rewards and reach redemption 
              thresholds faster.
            </p>
          </div>
          
          <div className="info-card">
            <FaCoins className="text-primary text-3xl mb-4" />
            <h3>Bonus Categories</h3>
            <p>
              Earn extra points by shopping in bonus categories that change monthly.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Frequently Asked Questions</h2>
        
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Is there a fee to use points for purchases?</h3>
            <p>
              No, there are no fees to redeem your points for purchases on Luxify.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">What's the value of my points when shopping on Luxify?</h3>
            <p>
              The exact value varies by program, but most points are worth 1 cent each when redeemed on Luxify. 
              For example, 10,000 points would be worth $100 toward your purchase.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I combine points from different programs?</h3>
            <p>
              Yes, you can use points from multiple programs for a single purchase. For example, you could 
              use some Chase Ultimate Rewards points and some Luxify Points together.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Are there any restrictions on what I can buy with points?</h3>
            <p>
              No, you can use points to purchase any product available on Luxify. There are no blackout dates 
              or product restrictions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">How long does it take for points to be deducted from my account?</h3>
            <p>
              Points are deducted immediately when you complete your purchase. You'll receive a confirmation 
              email showing the points deduction.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Ready to Shop with Points?</h2>
        <p className="mb-6">
          Link your loyalty program accounts and start using your points for premium shopping on Luxify.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="cta-button">
            Link Your Accounts
          </button>
          <button className="secondary-button">
            Learn More
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PointsPage;
