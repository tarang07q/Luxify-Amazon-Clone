import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
  FaInfoCircle,
  FaBriefcase,
  FaNewspaper,
  FaFlask,
  FaStore,
  FaUsers,
  FaBullhorn,
  FaHandshake,
  FaCreditCard,
  FaWallet,
  FaExchangeAlt,
  FaTrophy,
  FaUser,
  FaClipboardList,
  FaTruck,
  FaUndo,
  FaQuestionCircle,
  FaGlobeAmericas
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCurrency } from '../../context/CurrencyContext';
import CurrencySelector from '../currency/CurrencySelector';
import CubeIcon from '../3d/CubeIcon';
import './Footer.css';

const Footer = () => {
  const { theme } = useTheme();
  const { currency } = useCurrency();

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
      ]
    },
    {
      title: 'Let Us Help You',
      links: [
        { text: 'Your Account', path: '/account', icon: <FaUser /> },
        { text: 'Your Orders', path: '/orders', icon: <FaClipboardList /> },
        { text: 'Shipping Policies', path: '/shipping-rates', icon: <FaTruck /> },
        { text: 'Returns & Replacements', path: '/returns', icon: <FaUndo /> },
        { text: 'Help Center', path: '/help', icon: <FaQuestionCircle /> },
      ]
    }
  ];

  return (
    <footer className="footer themed-footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Company Info */}
          <div className="footer-column">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon" style={{ width: '40px', height: '40px' }}>
                <CubeIcon size={40} autoRotate={true} />
              </div>
              <span className="futuristic-title">Luxify</span>
            </Link>
            <p className="footer-description">
              Premium shopping experience with curated products and exceptional service.
            </p>
            <div>
              <div className="footer-link">
                <FaMapMarkerAlt className="footer-link-icon" />
                <span>123 Commerce St, Shopping City</span>
              </div>
              <div className="footer-link">
                <FaPhoneAlt className="footer-link-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="footer-link">
                <FaEnvelope className="footer-link-icon" />
                <span>support@luxify.com</span>
              </div>
            </div>

            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
              />
              <button className="newsletter-button">
                <FaPaperPlane />
              </button>
            </div>
          </div>

          {/* Link Groups */}
          {linkGroups.map((group, index) => (
            <div key={index} className="footer-column">
              <h3>{group.title}</h3>
              <ul className="footer-links">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.path} className="footer-link">
                      <span className="footer-link-icon">{link.icon}</span>
                      <span>{link.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <div className="social-links">
              <a href="#" className="social-link">
                <FaFacebook />
              </a>
              <a href="#" className="social-link">
                <FaTwitter />
              </a>
              <a href="#" className="social-link">
                <FaInstagram />
              </a>
              <a href="#" className="social-link">
                <FaYoutube />
              </a>
              <a href="#" className="social-link">
                <FaLinkedin />
              </a>
            </div>

            <div className="footer-currency-selector">
              <div className="footer-currency-label">
                <FaGlobeAmericas className="footer-link-icon" />
                <span>Currency:</span>
              </div>
              <CurrencySelector variant="minimal" />
            </div>
          </div>

          <p className="copyright">
            &copy; {new Date().getFullYear()} Luxify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
