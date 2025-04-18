import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import FooterLinks from './FooterLinks';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="themed-footer">
      <FooterLinks />
      <div className="container mx-auto px-4">
        <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${theme.border}` }}>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" style={{ color: theme.footerText, transition: 'color 0.3s ease' }} className="hover:text-primary">
              <FaFacebook size={24} />
            </a>
            <a href="#" style={{ color: theme.footerText, transition: 'color 0.3s ease' }} className="hover:text-primary">
              <FaTwitter size={24} />
            </a>
            <a href="#" style={{ color: theme.footerText, transition: 'color 0.3s ease' }} className="hover:text-primary">
              <FaInstagram size={24} />
            </a>
            <a href="#" style={{ color: theme.footerText, transition: 'color 0.3s ease' }} className="hover:text-primary">
              <FaYoutube size={24} />
            </a>
          </div>

          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} Luxify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
