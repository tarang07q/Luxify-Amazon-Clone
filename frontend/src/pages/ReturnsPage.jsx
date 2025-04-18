import React from 'react';
import { FaUndo, FaExchangeAlt, FaBoxOpen, FaTruck, FaCreditCard, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const ReturnsPage = () => {
  // Sample return policy categories
  const returnCategories = [
    {
      category: "Electronics",
      timeframe: "30 days",
      condition: "Unopened or defective",
      restocking: "None for defective items, 15% for opened non-defective items"
    },
    {
      category: "Clothing & Accessories",
      timeframe: "45 days",
      condition: "Unworn with tags",
      restocking: "None"
    },
    {
      category: "Home & Kitchen",
      timeframe: "30 days",
      condition: "Unused or defective",
      restocking: "None for defective items, 10% for opened non-defective items"
    },
    {
      category: "Books & Media",
      timeframe: "30 days",
      condition: "Unopened or damaged",
      restocking: "None"
    },
    {
      category: "Luxury Items",
      timeframe: "14 days",
      condition: "Unused with all packaging and documentation",
      restocking: "20% for non-defective items"
    }
  ];

  return (
    <PageTemplate 
      title="Returns & Replacements" 
      breadcrumbs={[{ text: 'Returns & Replacements' }]}
    >
      <div className="page-section">
        <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-8 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-4">Easy Returns & Replacements</h2>
              <p className="mb-6">
                We want you to be completely satisfied with your purchase. If you're not, we make it easy 
                to return or exchange items within our generous return window.
              </p>
              <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300">
                Start a Return
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaUndo className="text-white text-5xl" />
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-lg">
          At Luxify, we stand behind the quality of our products. Our hassle-free return policy 
          allows you to shop with confidence, knowing that we're here to help if your purchase 
          doesn't meet your expectations.
        </p>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaCalendarAlt className="mr-2 text-primary" />
          Return Policy Overview
        </h2>
        
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Category</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Timeframe</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition Requirements</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restocking Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {returnCategories.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.category}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{item.timeframe}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{item.condition}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{item.restocking}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>* Return timeframes begin from the date of delivery.</p>
          <p>* Some products may have different return policies. Always check the product page for specific return information.</p>
          <p>* Luxify Premium members receive extended return windows on most items.</p>
        </div>
      </div>

      <div className="page-section">
        <h2>How to Return an Item</h2>
        
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>
          
          <div className="space-y-12">
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">1. Start Your Return</h3>
                <p>
                  Go to "Your Orders" in your account and select "Return or Replace Items" next to the order. 
                  Select the items you want to return and the reason for your return.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">2. Choose Your Return Method</h3>
                <p>
                  Select how you'd like to return the item. Options include drop-off at a Luxify Locker, 
                  carrier drop-off, or scheduled pickup (additional fees may apply).
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">3. Print Return Label</h3>
                <p>
                  Print your return label and packing slip. If you don't have a printer, you can use the QR code 
                  option at select drop-off locations.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">4. Package Your Return</h3>
                <p>
                  Pack the items securely in the original packaging if possible. Include all accessories, 
                  manuals, and free gifts that came with the purchase.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">5. Ship Your Return</h3>
                <p>
                  Drop off your package at the selected location or have it picked up. Keep the tracking 
                  information until your return is processed.
                </p>
              </div>
            </div>
            
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-8 md:h-8 bg-primary rounded-full z-10 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"></div>
              <div className="md:ml-12">
                <h3 className="text-xl font-semibold mb-2">6. Receive Your Refund</h3>
                <p>
                  Once we receive and process your return, we'll issue your refund to your original payment method. 
                  This typically takes 3-5 business days after we receive your return.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaExchangeAlt className="mr-2 text-primary" />
          Replacements & Exchanges
        </h2>
        
        <p className="mb-6">
          If you received a defective or damaged item, or if you'd like to exchange for a different size or color, 
          we offer easy replacements and exchanges.
        </p>
        
        <div className="info-grid">
          <div className="info-card">
            <FaBoxOpen className="text-primary text-3xl mb-4" />
            <h3>Defective Item Replacement</h3>
            <p>
              If your item is defective or damaged, we'll send a replacement immediately in most cases, 
              without waiting for the return to be processed.
            </p>
          </div>
          
          <div className="info-card">
            <FaExchangeAlt className="text-primary text-3xl mb-4" />
            <h3>Size/Color Exchanges</h3>
            <p>
              Need a different size or color? Start a return and select "Exchange" to receive the new item 
              as quickly as possible.
            </p>
          </div>
          
          <div className="info-card">
            <FaTruck className="text-primary text-3xl mb-4" />
            <h3>Advance Replacement</h3>
            <p>
              For eligible items, we can ship your replacement before receiving your return. A hold will be 
              placed on your payment method until the original item is returned.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaCreditCard className="mr-2 text-primary" />
          Refund Information
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Refund Methods & Timing</h3>
            <p className="mb-4">
              How and when you'll receive your refund depends on your original payment method:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Credit/Debit Card:</strong> 3-5 business days after we receive your return</li>
              <li><strong>Luxify Store Credit:</strong> Immediately after we receive your return</li>
              <li><strong>Gift Card:</strong> 2-3 business days after we receive your return</li>
              <li><strong>Bank Transfer/ACH:</strong> 5-7 business days after we receive your return</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Partial Refunds</h3>
            <p className="mb-4">
              In some cases, we may issue a partial refund:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>If an item is returned outside the return window but within a reasonable timeframe</li>
              <li>If an item is returned without original packaging or accessories</li>
              <li>If an item shows signs of use or wear beyond reasonable inspection</li>
              <li>If a restocking fee applies to the returned item</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Non-Returnable Items</h2>
        
        <p className="mb-6">
          For health, safety, and other reasons, some items cannot be returned. These include:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Health & Personal Care</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Opened health and personal care items</li>
              <li>Intimate apparel</li>
              <li>Personal grooming items</li>
              <li>Opened cosmetics and fragrances</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Digital Products</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Downloaded digital content</li>
              <li>Software with opened packaging</li>
              <li>Digital gift cards</li>
              <li>Subscription services after activation</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Customized Items</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Personalized or custom-made products</li>
              <li>Engraved items</li>
              <li>Custom-configured electronics</li>
              <li>Made-to-order furniture</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Other Non-Returnable Items</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Perishable goods</li>
              <li>Hazardous materials</li>
              <li>Items missing serial numbers or UPC</li>
              <li>Items marked as non-returnable on the product page</li>
            </ul>
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
            <h3 className="text-lg font-semibold mb-2">Do I have to pay for return shipping?</h3>
            <p>
              For most returns, we provide a prepaid return shipping label at no cost to you. However, for returns 
              due to preference (not defective or incorrect items), a shipping fee may be deducted from your refund 
              unless you're a Luxify Premium member.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">What if I received a gift and want to return it?</h3>
            <p>
              You can return gifts without notifying the gift giver. You'll need the order number from the gift 
              receipt or packing slip. Refunds for gifts are issued as Luxify Store Credit.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I return an item after the return window?</h3>
            <p>
              We consider returns after the standard window on a case-by-case basis. Contact customer service 
              to discuss your situation. Luxify Premium members receive extended return windows on most items.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">How do I return large or heavy items?</h3>
            <p>
              For large items like furniture or appliances, we offer scheduled pickup services. When starting 
              your return, select "Schedule a Pickup" and choose a convenient date and time.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">What if my return is lost in transit?</h3>
            <p>
              If your return doesn't arrive at our facility within 14 days of shipping, contact customer service 
              with your return tracking information. We'll investigate and resolve the issue promptly.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Need Help with a Return?</h2>
        <p className="mb-6">
          Our customer service team is available 24/7 to assist with returns, replacements, and refunds.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="cta-button">
            Start a Return
          </button>
          <button className="secondary-button">
            Contact Customer Service
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ReturnsPage;
