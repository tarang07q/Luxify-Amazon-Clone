import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGift, 
  FaTrophy, 
  FaCoins, 
  FaTag, 
  FaShippingFast, 
  FaCalendarAlt, 
  FaUserFriends, 
  FaStar, 
  FaPercent, 
  FaRegCreditCard, 
  FaChartLine
} from 'react-icons/fa';
import FooterPageTemplate from '../components/layout/FooterPageTemplate';
import { useTheme } from '../context/ThemeContext';

const RewardsPage = () => {
  const { theme } = useTheme();

  // Rewards tiers data
  const rewardsTiers = [
    {
      name: "Bronze",
      points: "0-999",
      benefits: [
        "1 point per $1 spent",
        "Free standard shipping on orders over $50",
        "Birthday reward",
        "Member-only deals"
      ],
      color: "#CD7F32"
    },
    {
      name: "Silver",
      points: "1,000-4,999",
      benefits: [
        "1.25 points per $1 spent",
        "Free standard shipping on all orders",
        "Birthday reward + bonus gift",
        "Early access to sales",
        "Dedicated customer service line"
      ],
      color: "#C0C0C0"
    },
    {
      name: "Gold",
      points: "5,000-9,999",
      benefits: [
        "1.5 points per $1 spent",
        "Free expedited shipping on all orders",
        "Premium birthday package",
        "Exclusive Gold member events",
        "Priority customer service",
        "Free returns"
      ],
      color: "#FFD700"
    },
    {
      name: "Platinum",
      points: "10,000+",
      benefits: [
        "2 points per $1 spent",
        "Free overnight shipping on all orders",
        "Luxury birthday gift",
        "Exclusive product previews",
        "Concierge service",
        "Free gift wrapping",
        "Annual bonus points"
      ],
      color: "#E5E4E2"
    }
  ];

  // Ways to earn points
  const waysToEarn = [
    {
      title: "Shop",
      description: "Earn points on every purchase based on your membership tier",
      icon: <FaTag />
    },
    {
      title: "Refer Friends",
      description: "Earn 500 points for each friend who makes their first purchase",
      icon: <FaUserFriends />
    },
    {
      title: "Write Reviews",
      description: "Earn 50 points for each verified product review",
      icon: <FaStar />
    },
    {
      title: "Special Promotions",
      description: "Double or triple points during special promotional periods",
      icon: <FaPercent />
    },
    {
      title: "Link Credit Card",
      description: "Earn bonus points when you link and use your credit card",
      icon: <FaRegCreditCard />
    },
    {
      title: "Complete Profile",
      description: "Earn 100 points when you complete your profile information",
      icon: <FaChartLine />
    }
  ];

  // Redemption options
  const redemptionOptions = [
    {
      title: "Product Discounts",
      description: "Redeem points for discounts on your favorite products",
      pointsNeeded: "500+ points",
      icon: <FaTag className="text-pink-500" />
    },
    {
      title: "Free Shipping",
      description: "Use points to cover shipping costs on any order",
      pointsNeeded: "200+ points",
      icon: <FaShippingFast className="text-blue-500" />
    },
    {
      title: "Exclusive Products",
      description: "Access limited-edition items only available with points",
      pointsNeeded: "1,000+ points",
      icon: <FaGift className="text-purple-500" />
    },
    {
      title: "Early Access",
      description: "Get early access to new product launches and sales",
      pointsNeeded: "750+ points",
      icon: <FaCalendarAlt className="text-green-500" />
    }
  ];

  return (
    <FooterPageTemplate
      title="Rewards Program"
      subtitle="Earn points, unlock benefits, and enjoy exclusive perks"
      icon={<FaTrophy />}
      breadcrumbs={[{ text: 'Rewards Program' }]}
    >
      {/* Hero Section */}
      <div className="footer-page-section">
        <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-8 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-4">Join the Luxify Rewards Program</h2>
              <p className="mb-6">
                Earn points with every purchase, unlock exclusive benefits, and enjoy premium perks as you 
                climb through our membership tiers. It's our way of saying thank you for shopping with us.
              </p>
              <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300">
                Join Now - It's Free
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaCoins className="text-white text-5xl" />
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-lg mb-6">
          The Luxify Rewards Program is designed to enhance your shopping experience and reward your loyalty. 
          As a member, you'll earn points on every purchase, receive exclusive offers, and unlock premium 
          benefits as you progress through our membership tiers.
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          <Link to="/register" className="footer-page-button footer-page-button-primary">
            Sign Up Now
          </Link>
          <Link to="/login" className="footer-page-button footer-page-button-secondary">
            Already a Member? Sign In
          </Link>
        </div>
      </div>

      {/* Membership Tiers */}
      <div className="footer-page-section">
        <h2 className="footer-page-subtitle">Membership Tiers</h2>
        <p className="mb-6">
          Our rewards program features four membership tiers. The more you shop, the higher your tier and the 
          better your benefits. Your tier is determined by the number of points you've earned in the current calendar year.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {rewardsTiers.map((tier, index) => (
            <div 
              key={index} 
              className="footer-card relative overflow-hidden"
              style={{
                borderTop: `4px solid ${tier.color}`,
              }}
            >
              <div className="absolute top-0 right-0 w-16 h-16" style={{ 
                background: `linear-gradient(135deg, transparent 50%, ${tier.color} 50%)`,
                opacity: 0.2
              }}></div>
              <h3 className="footer-card-title text-xl" style={{ color: tier.color }}>
                {tier.name}
              </h3>
              <p className="text-sm mb-4" style={{ color: theme.textLight }}>
                {tier.points} points
              </p>
              <ul className="space-y-2">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <span className="inline-block mr-2 mt-1 text-xs">✓</span>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* How to Earn Points */}
      <div className="footer-page-section">
        <h2 className="footer-page-subtitle">How to Earn Points</h2>
        <p className="mb-6">
          There are many ways to earn Luxify Rewards points. Here are some of the easiest ways to boost your point balance:
        </p>

        <div className="footer-card-grid">
          {waysToEarn.map((way, index) => (
            <div key={index} className="footer-card">
              <div className="footer-card-icon">
                {way.icon}
              </div>
              <h3 className="footer-card-title">{way.title}</h3>
              <p className="footer-card-content">{way.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Redeeming Points */}
      <div className="footer-page-section">
        <h2 className="footer-page-subtitle">Redeeming Your Points</h2>
        <p className="mb-6">
          Your earned points can be redeemed for a variety of rewards. Here are some popular redemption options:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {redemptionOptions.map((option, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex">
              <div className="mr-4 text-3xl">
                {option.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{option.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-0.5 rounded">
                  {option.pointsNeeded}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold mb-3">Point Value</h3>
          <p className="mb-2">
            Luxify Rewards points have the following redemption values:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>100 points = $1 off your purchase</li>
            <li>500 points = $5 off your purchase</li>
            <li>1,000 points = $12 off your purchase (20% bonus value)</li>
            <li>5,000 points = $65 off your purchase (30% bonus value)</li>
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            The more points you redeem at once, the better the value you receive!
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="footer-page-section">
        <h2 className="footer-page-subtitle">Frequently Asked Questions</h2>
        
        <div className="footer-faq-container">
          <div className="footer-faq-item">
            <div className="footer-faq-question">
              <span>How do I join the Rewards Program?</span>
            </div>
            <div className="footer-faq-answer">
              <p>
                Joining is easy and free! Simply create an account on Luxify or sign in to your existing account 
                and opt in to the Rewards Program from your account settings.
              </p>
            </div>
          </div>
          
          <div className="footer-faq-item">
            <div className="footer-faq-question">
              <span>When do my points expire?</span>
            </div>
            <div className="footer-faq-answer">
              <p>
                Points are valid for 12 months from the date they are earned. Your membership tier is calculated 
                based on points earned in the current calendar year.
              </p>
            </div>
          </div>
          
          <div className="footer-faq-item">
            <div className="footer-faq-question">
              <span>Can I transfer my points to someone else?</span>
            </div>
            <div className="footer-faq-answer">
              <p>
                Yes, Gold and Platinum members can transfer points to family members or friends who are also 
                Luxify Rewards members. Bronze and Silver members cannot transfer points.
              </p>
            </div>
          </div>
          
          <div className="footer-faq-item">
            <div className="footer-faq-question">
              <span>How do I check my points balance?</span>
            </div>
            <div className="footer-faq-answer">
              <p>
                You can check your current points balance, tier status, and available rewards by logging into 
                your account and visiting the Rewards Dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="footer-cta-container">
        <h3 className="footer-cta-title">Start Earning Rewards Today</h3>
        <p className="footer-cta-description">
          Join the Luxify Rewards Program and start earning points with your very first purchase. 
          It's free to join and the benefits are endless.
        </p>
        <Link to="/register" className="footer-cta-button">
          Join Now
        </Link>
      </div>
    </FooterPageTemplate>
  );
};

export default RewardsPage;
