import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaInfoCircle,
  FaBriefcase,
  FaNewspaper,
  FaFlask,
  FaStore,
  FaUsers,
  FaBullhorn,
  FaHandshake,
  FaCreditCard,
  FaShoppingBag,
  FaWallet,
  FaExchangeAlt,
  FaTrophy,
  FaUser,
  FaClipboardList,
  FaTruck,
  FaUndo,
  FaQuestionCircle
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const FooterLinks = () => {
  const { theme } = useTheme();

  const linkGroups = [
    {
      title: 'Get to Know Us',
      links: [
        { text: 'About Us', path: '/about', icon: <FaInfoCircle /> },
        { text: 'Careers', path: '/careers', icon: <FaBriefcase /> },
        { text: 'Press Releases', path: '/press', icon: <FaNewspaper /> },
        { text: 'Luxify Science', path: '/science', icon: <FaFlask /> },
      ]
    },
    {
      title: 'Make Money with Us',
      links: [
        { text: 'Sell on Luxify', path: '/sell', icon: <FaStore /> },
        { text: 'Luxify Associates', path: '/associates', icon: <FaUsers /> },
        { text: 'Advertise Your Products', path: '/advertise', icon: <FaBullhorn /> },
        { text: 'Become an Affiliate', path: '/affiliate', icon: <FaHandshake /> },
      ]
    },
    {
      title: 'Payment Products',
      links: [
        { text: 'Luxify Business Card', path: '/business-card', icon: <FaCreditCard /> },
        { text: 'Shop with Points', path: '/points', icon: <FaShoppingBag /> },
        { text: 'Reload Your Balance', path: '/reload-balance', icon: <FaWallet /> },
        { text: 'Currency Converter', path: '/currency-converter', icon: <FaExchangeAlt /> },
        { text: 'Rewards Program', path: '/rewards', icon: <FaTrophy /> },
      ]
    },
    {
      title: 'Let Us Help You',
      links: [
        { text: 'Your Account', path: '/account', icon: <FaUser /> },
        { text: 'Your Orders', path: '/orders', icon: <FaClipboardList /> },
        { text: 'Shipping Rates & Policies', path: '/shipping', icon: <FaTruck /> },
        { text: 'Returns & Replacements', path: '/returns', icon: <FaUndo /> },
        { text: 'Help', path: '/help', icon: <FaQuestionCircle /> },
      ]
    }
  ];

  return (
    <div
      className="py-12 border-t border-gray-700"
      style={{ backgroundColor: theme.footerBg || '#1a202c', color: theme.footerText || '#f7fafc' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {linkGroups.map((group, index) => (
            <div key={index} className="mb-6">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: theme.footerHeading || '#e2e8f0' }}
              >
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="flex items-center hover:translate-x-1 transition-transform duration-200"
                      style={{ color: theme.footerLink || '#cbd5e0' }}
                    >
                      <span className="mr-2 text-xs">{link.icon}</span>
                      <span className="hover:underline">{link.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
