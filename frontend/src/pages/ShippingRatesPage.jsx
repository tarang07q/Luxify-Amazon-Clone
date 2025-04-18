import React from 'react';
import { FaTruck, FaGlobeAmericas, FaCalendarAlt, FaShieldAlt, FaLeaf, FaQuestionCircle } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const ShippingRatesPage = () => {
  // Sample shipping rates
  const domesticShippingRates = [
    { 
      name: 'Standard Shipping', 
      time: '3-5 business days', 
      cost: 'Free with $35 order', 
      premium: false 
    },
    { 
      name: 'Two-Day Shipping', 
      time: '2 business days', 
      cost: '$5.99 per order', 
      premium: 'Free with Luxify Premium' 
    },
    { 
      name: 'One-Day Shipping', 
      time: 'Next business day', 
      cost: '$9.99 per order', 
      premium: 'Free with Luxify Premium on orders over $35' 
    },
    { 
      name: 'Same-Day Delivery', 
      time: 'Same day (order by 12pm local time)', 
      cost: '$12.99 per order', 
      premium: '$3.99 with Luxify Premium' 
    }
  ];
  
  const internationalShippingRates = [
    { 
      name: 'Standard International', 
      time: '7-14 business days', 
      cost: 'Starts at $9.99', 
      premium: false 
    },
    { 
      name: 'Expedited International', 
      time: '3-5 business days', 
      cost: 'Starts at $19.99', 
      premium: 'Discounted rates with Luxify Premium' 
    },
    { 
      name: 'Priority International', 
      time: '1-3 business days', 
      cost: 'Starts at $29.99', 
      premium: 'Discounted rates with Luxify Premium' 
    }
  ];

  return (
    <PageTemplate 
      title="Shipping Rates & Policies" 
      breadcrumbs={[{ text: 'Shipping Rates & Policies' }]}
    >
      <div className="page-section">
        <p className="text-lg">
          At Luxify, we offer a variety of shipping options to meet your needs, from free standard 
          shipping to expedited delivery. Learn about our shipping rates, delivery times, and policies below.
        </p>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaTruck className="mr-2 text-primary" />
          Domestic Shipping Options
        </h2>
        
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Method</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Time</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Luxify Premium Benefit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {domesticShippingRates.map((rate, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{rate.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{rate.time}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{rate.cost}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {rate.premium ? (
                      <span className="text-primary">{rate.premium}</span>
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>* Delivery times are estimates and not guaranteed. Actual delivery time may vary based on processing time, shipping destination, and other factors.</p>
          <p>* Free shipping applies to eligible items delivered to addresses within the contiguous United States.</p>
        </div>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaGlobeAmericas className="mr-2 text-primary" />
          International Shipping
        </h2>
        
        <p className="mb-4">
          Luxify ships to over 100 countries worldwide. International shipping rates and delivery times 
          vary based on the destination country, package size, and shipping method selected.
        </p>
        
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Method</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Time</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Luxify Premium Benefit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {internationalShippingRates.map((rate, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{rate.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{rate.time}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{rate.cost}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {rate.premium ? (
                      <span className="text-primary">{rate.premium}</span>
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Important International Shipping Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>International customers are responsible for all duties, taxes, and customs fees.</li>
            <li>Some products may not be eligible for international shipping due to regulatory restrictions.</li>
            <li>Delivery times do not include customs processing, which can add several days to delivery time.</li>
            <li>Tracking information may be limited once packages leave the United States.</li>
            <li>For certain countries, we offer Delivered Duty Paid (DDP) service where we collect estimated import fees at checkout.</li>
          </ul>
        </div>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaCalendarAlt className="mr-2 text-primary" />
          Delivery Windows & Scheduling
        </h2>
        
        <div className="info-grid">
          <div className="info-card">
            <h3>Delivery Windows</h3>
            <p>
              For most shipping methods, you can choose a delivery window during checkout. 
              Options typically include morning (9am-12pm), afternoon (12pm-5pm), or evening (5pm-9pm) delivery.
            </p>
          </div>
          
          <div className="info-card">
            <h3>Weekend Delivery</h3>
            <p>
              Saturday delivery is available in select areas for an additional fee. 
              Sunday delivery is available in major metropolitan areas for Luxify Premium members at no additional cost.
            </p>
          </div>
          
          <div className="info-card">
            <h3>Delivery Instructions</h3>
            <p>
              You can provide specific delivery instructions during checkout, such as where to leave the package 
              or entry codes for secure buildings.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaShieldAlt className="mr-2 text-primary" />
          Shipping Protection & Guarantees
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Delivery Guarantee</h3>
            <p>
              If your package doesn't arrive by the guaranteed delivery date, you may be eligible for a refund 
              of the shipping fees. Contact customer service within 30 days of the estimated delivery date to 
              request a refund.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Package Protection</h3>
            <p className="mb-4">
              All shipments include basic coverage against loss or damage during transit. For high-value items, 
              we offer additional shipping protection at checkout:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Basic Protection (included): Covers up to $100 for lost or damaged items</li>
              <li>Enhanced Protection ($1.99): Covers up to $500 for lost or damaged items</li>
              <li>Premium Protection ($3.99): Covers up to $1,000 for lost or damaged items</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaLeaf className="mr-2 text-primary" />
          Sustainable Shipping Initiatives
        </h2>
        
        <p className="mb-6">
          Luxify is committed to reducing the environmental impact of our shipping operations. 
          Our sustainable shipping initiatives include:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Carbon-Neutral Shipping</h3>
            <p>
              We offset the carbon emissions from all shipments through investments in environmental projects. 
              When you shop with Luxify, your packages are delivered with a net-zero carbon impact.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Eco-Friendly Packaging</h3>
            <p>
              Our packaging is made from recycled materials and is fully recyclable. We're working toward 
              eliminating plastic packaging entirely by 2025.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Consolidated Shipping</h3>
            <p>
              Choose our "Ship in Fewest Packages" option at checkout to reduce packaging waste and 
              delivery trips, even if it means waiting a bit longer for all your items.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Electric Delivery Vehicles</h3>
            <p>
              We're partnering with carriers to expand the use of electric delivery vehicles in major cities, 
              reducing emissions from last-mile delivery.
            </p>
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
            <h3 className="text-lg font-semibold mb-2">How can I track my package?</h3>
            <p>
              You can track your package by going to "Your Orders" in your account and selecting "Track Package" 
              next to the order. You'll also receive tracking information via email once your order ships.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">What if I'm not home when my package arrives?</h3>
            <p>
              For most deliveries, the carrier will leave the package in a safe location. For items requiring a signature, 
              the carrier will leave a notice and attempt delivery again the next business day. You can also provide 
              delivery instructions during checkout.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I change my shipping address after placing an order?</h3>
            <p>
              If your order hasn't shipped yet, you can change the shipping address by going to "Your Orders" and 
              selecting "Change Shipping Address." If your order has already shipped, you'll need to contact customer 
              service for assistance.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Do you ship to P.O. boxes?</h3>
            <p>
              Yes, we ship to P.O. boxes for most items using USPS. However, some larger items or items shipped by 
              certain carriers cannot be delivered to P.O. boxes. The checkout process will notify you if an item 
              cannot be shipped to a P.O. box.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">What is the cutoff time for same-day delivery?</h3>
            <p>
              For same-day delivery, orders must be placed by 12pm local time. Availability varies by location and 
              is limited to select metropolitan areas.
            </p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Need More Help?</h2>
        <p className="mb-6">
          If you have questions about shipping or need assistance with a delivery, our customer service team is here to help.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="cta-button">
            Contact Customer Service
          </button>
          <button className="secondary-button">
            Track Your Package
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ShippingRatesPage;
