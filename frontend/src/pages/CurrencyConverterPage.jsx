import React, { useState } from 'react';
import { FaExchangeAlt, FaGlobe, FaShoppingCart, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const CurrencyConverterPage = () => {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  
  // Sample exchange rates (in a real app, these would come from an API)
  const exchangeRates = {
    USD: { EUR: 0.92, GBP: 0.79, JPY: 149.50, CAD: 1.36, AUD: 1.52 },
    EUR: { USD: 1.09, GBP: 0.86, JPY: 162.50, CAD: 1.48, AUD: 1.65 },
    GBP: { USD: 1.27, EUR: 1.16, JPY: 189.24, CAD: 1.72, AUD: 1.92 },
    JPY: { USD: 0.0067, EUR: 0.0062, GBP: 0.0053, CAD: 0.0091, AUD: 0.0102 },
    CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 110.12, AUD: 1.12 },
    AUD: { USD: 0.66, EUR: 0.61, GBP: 0.52, JPY: 98.32, CAD: 0.89 }
  };
  
  // Calculate converted amount
  const calculateConversion = () => {
    if (fromCurrency === toCurrency) return amount;
    return (parseFloat(amount) * exchangeRates[fromCurrency][toCurrency]).toFixed(2);
  };
  
  // Sample supported currencies
  const supportedCurrencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }
  ];

  return (
    <PageTemplate 
      title="Currency Converter" 
      breadcrumbs={[{ text: 'Currency Converter' }]}
    >
      <div className="page-section">
        <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-8 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-4">Shop in Your Preferred Currency</h2>
              <p className="mb-6">
                Convert prices, shop globally, and pay in your local currency. 
                Luxify's Currency Converter makes international shopping seamless.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaExchangeAlt className="text-white text-5xl" />
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-lg">
          Luxify's Currency Converter allows you to shop our global marketplace in your preferred currency. 
          View product prices, shipping costs, and taxes in your local currency for a transparent shopping 
          experience, no matter where you are in the world.
        </p>
      </div>

      <div className="page-section">
        <h2>Currency Converter Tool</h2>
        
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  min="0"
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-gray-700 font-medium mb-2">From Currency</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {supportedCurrencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mt-4">
                <label className="block text-gray-700 font-medium mb-2">To Currency</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {supportedCurrencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <button className="cta-button mt-6 w-full">
                <FaExchangeAlt className="mr-2" /> Convert
              </button>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-500 mb-2">Converted Amount</div>
                <div className="text-4xl font-bold text-primary mb-4">
                  {supportedCurrencies.find(c => c.code === toCurrency)?.symbol}{calculateConversion()}
                </div>
                <div className="text-sm text-gray-500">
                  1 {fromCurrency} = {exchangeRates[fromCurrency][toCurrency]} {toCurrency}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  <FaInfoCircle className="inline mr-1" /> Exchange rates updated hourly
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Shopping with Multiple Currencies</h2>
        
        <div className="info-grid">
          <div className="info-card">
            <FaGlobe className="text-primary text-3xl mb-4" />
            <h3>Global Shopping</h3>
            <p>
              Shop from international sellers and see prices in your preferred currency, 
              making it easy to compare products from around the world.
            </p>
          </div>
          
          <div className="info-card">
            <FaShoppingCart className="text-primary text-3xl mb-4" />
            <h3>Transparent Checkout</h3>
            <p>
              See the exact amount you'll be charged in your local currency before completing your purchase, 
              with no hidden fees or surprises.
            </p>
          </div>
          
          <div className="info-card">
            <FaExchangeAlt className="text-primary text-3xl mb-4" />
            <h3>Competitive Exchange Rates</h3>
            <p>
              Benefit from our competitive exchange rates, updated hourly to reflect the most current market rates.
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
                <h3 className="text-xl font-semibold mb-2">1. Set Your Preferred Currency</h3>
                <p>
                  Go to "Account Settings" and select your preferred currency from our list of supported currencies. 
                  This will be your default currency for browsing and shopping.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">2. Browse Products</h3>
                <p>
                  As you browse, all product prices will automatically display in your preferred currency, 
                  making it easy to understand the cost in terms that are familiar to you.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">3. Add to Cart and Checkout</h3>
                <p>
                  Add items to your cart and proceed to checkout. Your cart total, shipping costs, and taxes 
                  will all be displayed in your preferred currency.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">4. Payment</h3>
                <p>
                  Complete your purchase using your preferred payment method. Your bank or credit card company 
                  will handle the actual currency conversion based on their rates, but you'll know exactly 
                  what to expect before confirming your order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaQuestionCircle className="mr-2 text-primary" />
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Which currencies are supported?</h3>
            <p>
              We currently support 30+ major currencies including USD, EUR, GBP, JPY, CAD, AUD, CNY, and more. 
              We're continuously adding support for additional currencies.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">How accurate are the displayed prices?</h3>
            <p>
              Our exchange rates are updated hourly based on market rates. The displayed prices are very close 
              to what you'll actually be charged, but the final amount may vary slightly depending on your 
              payment provider's exchange rate at the time of purchase.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Are there any fees for using different currencies?</h3>
            <p>
              Luxify does not charge any additional fees for shopping in different currencies. However, your 
              bank or credit card company may charge foreign transaction fees. Check with your payment provider 
              for details.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I change my preferred currency?</h3>
            <p>
              Yes, you can change your preferred currency at any time through your account settings. 
              The change will take effect immediately for all future browsing and shopping.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">How do refunds work with different currencies?</h3>
            <p>
              If you receive a refund, it will be processed in the original currency of your purchase. 
              Your bank or credit card company will then convert it back to your local currency based 
              on their current exchange rate.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Supported Currencies</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {supportedCurrencies.map(currency => (
            <div key={currency.code} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="font-bold">{currency.code}</div>
              <div className="text-sm text-gray-600">{currency.name}</div>
              <div className="text-lg mt-1">{currency.symbol}</div>
            </div>
          ))}
          <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
            + 24 more currencies
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Ready to Shop Globally?</h2>
        <p className="mb-6">
          Set your preferred currency and start shopping our global marketplace with confidence.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="cta-button">
            Set Preferred Currency
          </button>
          <button className="secondary-button">
            Start Shopping
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default CurrencyConverterPage;
