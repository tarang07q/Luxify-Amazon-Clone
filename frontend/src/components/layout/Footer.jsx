import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-primary-light">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-primary-light">Careers</Link></li>
              <li><Link to="/press-releases" className="hover:text-primary-light">Press Releases</Link></li>
              <li><Link to="/amazer-science" className="hover:text-primary-light">Amazer Science</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2">
              <li><Link to="/sell" className="hover:text-primary-light">Sell on Amazer</Link></li>
              <li><Link to="/associates" className="hover:text-primary-light">Amazer Associates</Link></li>
              <li><Link to="/advertise" className="hover:text-primary-light">Advertise Your Products</Link></li>
              <li><Link to="/affiliate" className="hover:text-primary-light">Become an Affiliate</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Payment Products</h3>
            <ul className="space-y-2">
              <li><Link to="/business-card" className="hover:text-primary-light">Amazer Business Card</Link></li>
              <li><Link to="/points" className="hover:text-primary-light">Shop with Points</Link></li>
              <li><Link to="/reload-balance" className="hover:text-primary-light">Reload Your Balance</Link></li>
              <li><Link to="/currency-converter" className="hover:text-primary-light">Currency Converter</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2">
              <li><Link to="/account" className="hover:text-primary-light">Your Account</Link></li>
              <li><Link to="/orders" className="hover:text-primary-light">Your Orders</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-light">Shipping Rates & Policies</Link></li>
              <li><Link to="/returns" className="hover:text-primary-light">Returns & Replacements</Link></li>
              <li><Link to="/help" className="hover:text-primary-light">Help</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-white hover:text-primary-light">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-white hover:text-primary-light">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-white hover:text-primary-light">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-white hover:text-primary-light">
              <FaYoutube size={24} />
            </a>
          </div>

          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} Amazer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
