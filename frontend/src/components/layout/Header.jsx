import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaShoppingBag,
  FaHome,
  FaHeart,
  FaSignOutAlt,
  FaUserCircle,
  FaClipboardList,
  FaTachometerAlt,
  FaBoxes,
  FaShippingFast
} from 'react-icons/fa';
import { logout } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/services/authService';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggler from '../ThemeToggler';
import CubeIcon from '../3d/CubeIcon';
import ModernCube from '../3d/ModernCube';
import './Header.css';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, currentTheme } = useTheme();

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  // Create a ref for the dropdown
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  const logoutHandler = async () => {
    try {
      // First dispatch the logout action to clear the Redux state
      dispatch(logout());

      // Then call the API to clear the cookie on the server
      await logoutApiCall().unwrap();

      // Navigate to login page
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      // Even if the API call fails, we still want to clear the local state
      dispatch(logout());
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="header themed-nav">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-cube">
              <ModernCube size={40} />
            </div>
            Luxify
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links">
            <Link to="/" className="nav-link">
              <FaHome />
              <span>Home</span>
            </Link>
            <Link to="/shop" className="nav-link">
              <FaShoppingBag />
              <span>Shop</span>
            </Link>
            <Link to="/cart" className="nav-link">
              <FaShoppingCart />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="cart-count">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
          </nav>

          {/* Search Container */}
          <div className="search-container">
            <form onSubmit={submitHandler}>
              <input
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder="Search products..."
                className="search-input"
              />
              <FaSearch className="search-icon" />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="nav-links">
            <ThemeToggler />

            {user ? (
              <div className="user-dropdown" ref={dropdownRef}>
                <div className="dropdown-toggle" onClick={toggleDropdown}>
                  <FaUserCircle size={20} />
                  <span>{user.name}</span>
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item" onClick={closeDropdown}>
                      <FaUser />
                      <span>Profile</span>
                    </Link>
                    <Link to="/orderhistory" className="dropdown-item" onClick={closeDropdown}>
                      <FaClipboardList />
                      <span>Orders</span>
                    </Link>
                    <Link to="/wishlist" className="dropdown-item" onClick={closeDropdown}>
                      <FaHeart />
                      <span>Wishlist</span>
                    </Link>

                    {user.role === 'admin' && (
                      <>
                        <div className="dropdown-divider"></div>
                        <Link to="/admin/dashboard" className="dropdown-item" onClick={closeDropdown}>
                          <FaTachometerAlt />
                          <span>Dashboard</span>
                        </Link>
                        <Link to="/admin/products" className="dropdown-item" onClick={closeDropdown}>
                          <FaBoxes />
                          <span>Products</span>
                        </Link>
                        <Link to="/admin/orders" className="dropdown-item" onClick={closeDropdown}>
                          <FaShippingFast />
                          <span>Orders</span>
                        </Link>
                      </>
                    )}

                    <div className="dropdown-divider"></div>
                    <button
                      onClick={() => {
                        logoutHandler();
                        closeDropdown();
                      }}
                      className="dropdown-item"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="signin-button">
                  <FaUser />
                  <span>Sign In</span>
                </Link>
                <Link to="/register" className="register-button">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="menu-button">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu open">
          <div className="mobile-menu-header">
            <Link to="/" className="logo" onClick={toggleMenu}>
              <div className="logo-cube">
                <ModernCube size={40} />
              </div>
              Luxify
            </Link>
            <button onClick={toggleMenu} className="mobile-menu-close">
              <FaTimes />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="search-container" style={{ width: '100%', marginBottom: '1.5rem' }}>
            <form onSubmit={(e) => { submitHandler(e); toggleMenu(); }}>
              <input
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder="Search products..."
                className="search-input"
                style={{ width: '100%' }}
              />
              <FaSearch className="search-icon" />
            </form>
          </div>

          <div className="mobile-nav-links">
            <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>
              <FaHome />
              <span>Home</span>
            </Link>
            <Link to="/shop" className="mobile-nav-link" onClick={toggleMenu}>
              <FaShoppingBag />
              <span>Shop</span>
            </Link>
            <Link to="/cart" className="mobile-nav-link" onClick={toggleMenu}>
              <FaShoppingCart />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="cart-count">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="mobile-nav-link" onClick={toggleMenu}>
                  <FaUser />
                  <span>Profile</span>
                </Link>
                <Link to="/orderhistory" className="mobile-nav-link" onClick={toggleMenu}>
                  <FaClipboardList />
                  <span>Orders</span>
                </Link>
                <Link to="/wishlist" className="mobile-nav-link" onClick={toggleMenu}>
                  <FaHeart />
                  <span>Wishlist</span>
                </Link>

                {user.role === 'admin' && (
                  <>
                    <div className="dropdown-divider"></div>
                    <Link to="/admin/dashboard" className="mobile-nav-link" onClick={toggleMenu}>
                      <FaTachometerAlt />
                      <span>Dashboard</span>
                    </Link>
                    <Link to="/admin/products" className="mobile-nav-link" onClick={toggleMenu}>
                      <FaBoxes />
                      <span>Products</span>
                    </Link>
                    <Link to="/admin/orders" className="mobile-nav-link" onClick={toggleMenu}>
                      <FaShippingFast />
                      <span>Orders</span>
                    </Link>
                  </>
                )}

                <div className="dropdown-divider"></div>
                <button
                  onClick={() => {
                    logoutHandler();
                    toggleMenu();
                  }}
                  className="mobile-nav-link"
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <div className="dropdown-divider"></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem' }}>
                  <Link to="/login" className="signin-button" onClick={toggleMenu} style={{ justifyContent: 'center' }}>
                    <FaUser />
                    <span>Sign In</span>
                  </Link>
                  <Link to="/register" className="register-button" onClick={toggleMenu} style={{ textAlign: 'center' }}>
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
