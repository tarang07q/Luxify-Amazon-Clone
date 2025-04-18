import React from 'react';
import { FaWallet, FaMoneyBillWave, FaCreditCard, FaGift, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const ReloadBalancePage = () => {
  return (
    <PageTemplate 
      title="Reload Your Balance" 
      breadcrumbs={[{ text: 'Reload Your Balance' }]}
    >
      <div className="page-section">
        <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-8 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-4">Add Funds to Your Luxify Account</h2>
              <p className="mb-6">
                Reload your Luxify balance for faster checkout, budgeting, and gifting. 
                Add funds once and shop without entering payment information each time.
              </p>
              <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300">
                Reload Balance Now
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaWallet className="text-white text-5xl" />
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-lg">
          Your Luxify account balance is a convenient way to shop on our platform. You can add funds 
          to your account and use them for future purchases, making checkout faster and helping you 
          manage your shopping budget. It's also a great way to give the gift of choice to friends and family.
        </p>
      </div>

      <div className="page-section">
        <h2>Benefits of Using Your Luxify Balance</h2>
        
        <div className="info-grid">
          <div className="info-card">
            <FaMoneyBillWave className="text-primary text-3xl mb-4" />
            <h3>Faster Checkout</h3>
            <p>
              Skip entering payment information every time you shop. Just select your Luxify 
              balance at checkout for a seamless experience.
            </p>
          </div>
          
          <div className="info-card">
            <FaCreditCard className="text-primary text-3xl mb-4" />
            <h3>Budget Management</h3>
            <p>
              Add a specific amount to your balance to help manage your shopping budget 
              and avoid overspending.
            </p>
          </div>
          
          <div className="info-card">
            <FaGift className="text-primary text-3xl mb-4" />
            <h3>Gift Giving</h3>
            <p>
              Send Luxify balance funds to friends and family, giving them the freedom to 
              choose their perfect gift.
            </p>
          </div>
          
          <div className="info-card">
            <FaCalendarAlt className="text-primary text-3xl mb-4" />
            <h3>Auto-Reload</h3>
            <p>
              Set up automatic reloads on a schedule or when your balance falls below a 
              certain amount.
            </p>
          </div>
          
          <div className="info-card">
            <FaUserFriends className="text-primary text-3xl mb-4" />
            <h3>Family Sharing</h3>
            <p>
              Share your balance with family members through Luxify Household accounts.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>How to Reload Your Balance</h2>
        
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>
          
          <div className="space-y-12">
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">1. Go to Your Account</h3>
                <p>
                  Navigate to "Your Account" and select "Reload Your Balance" from the menu.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">2. Choose Amount</h3>
                <p>
                  Select a preset amount or enter a custom amount to add to your balance. 
                  You can reload between $5 and $2,000 at a time.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">3. Select Payment Method</h3>
                <p>
                  Choose your preferred payment method. We accept credit/debit cards, bank transfers, 
                  and other payment options.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">4. Confirm and Complete</h3>
                <p>
                  Review the details and confirm your reload. The funds will be added to your 
                  Luxify balance immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Auto-Reload Options</h2>
        
        <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl mb-6">
          <h3 className="text-xl font-semibold mb-3">Set It and Forget It</h3>
          <p className="mb-4">
            With Auto-Reload, you can ensure your Luxify balance is always ready for shopping:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Schedule-Based Reload</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Set a regular schedule (weekly, monthly, etc.)</li>
                <li>Choose your reload amount</li>
                <li>Select your payment method</li>
                <li>Receive notifications before each reload</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Balance-Based Reload</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Set a minimum balance threshold</li>
                <li>Choose your reload amount</li>
                <li>Select your payment method</li>
                <li>Balance automatically reloads when it falls below your threshold</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold mb-3">Auto-Reload Management</h3>
          <p>
            You can view, edit, or cancel your Auto-Reload settings at any time through your account. 
            We'll always notify you before an automatic reload occurs, and you can pause or resume 
            Auto-Reload whenever you need to.
          </p>
        </div>
      </div>

      <div className="page-section">
        <h2>Gifting with Your Luxify Balance</h2>
        
        <p className="mb-6">
          Share the joy of shopping on Luxify by sending balance funds to friends and family:
        </p>
        
        <div className="info-grid">
          <div className="info-card">
            <h3>Send as a Gift</h3>
            <p>
              Send a specific amount from your balance to someone else's Luxify account. 
              Add a personal message and even schedule the delivery date.
            </p>
            <button className="secondary-button">
              Send a Gift
            </button>
          </div>
          
          <div className="info-card">
            <h3>Purchase a Gift Card</h3>
            <p>
              Use your balance to buy a Luxify Gift Card that can be delivered via email 
              or printed for in-person giving.
            </p>
            <button className="secondary-button">
              Buy Gift Cards
            </button>
          </div>
          
          <div className="info-card">
            <h3>Family Allowances</h3>
            <p>
              Set up recurring transfers to family members' accounts, perfect for allowances 
              or budgeting within a household.
            </p>
            <button className="secondary-button">
              Set Up Allowance
            </button>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Frequently Asked Questions</h2>
        
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Is there an expiration date for my balance?</h3>
            <p>
              No, funds in your Luxify balance do not expire. They remain available for use until you spend them.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I withdraw money from my Luxify balance?</h3>
            <p>
              No, funds added to your Luxify balance cannot be withdrawn or transferred back to your bank account or credit card. 
              They can only be used for purchases on Luxify.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Is there a limit to how much I can add to my balance?</h3>
            <p>
              You can add between $5 and $2,000 in a single transaction. The maximum total balance allowed is $10,000.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I use my balance for subscription services?</h3>
            <p>
              Yes, you can use your Luxify balance to pay for subscription services like Luxify Premium, 
              streaming services, and other recurring payments available on our platform.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Is my balance protected if my account is compromised?</h3>
            <p>
              Yes, your Luxify balance is protected by our Fraud Protection Guarantee. If unauthorized 
              transactions occur, contact customer service immediately for assistance.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Ready to Reload?</h2>
        <p className="mb-6">
          Add funds to your Luxify balance today for faster checkout and easier shopping.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="cta-button">
            Reload Your Balance
          </button>
          <button className="secondary-button">
            Set Up Auto-Reload
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ReloadBalancePage;
