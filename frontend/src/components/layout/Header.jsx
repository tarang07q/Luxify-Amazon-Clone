import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaShoppingBag } from 'react-icons/fa';
import { logout } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/services/authService';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggler from '../ThemeToggler';
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
    <header className="header themed-nav" style={{ backgroundColor: theme.navBg, color: theme.navText, borderColor: theme.border }}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo" style={{ color: theme.primary }}>
            <FaShoppingBag className="logo-icon" />
            Luxify
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="search-bar">
            <form onSubmit={submitHandler} style={{display: 'flex', width: '100%'}}>
              <input
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder="Search products..."
                className="search-input themed-input"
                style={{
                  backgroundColor: theme.background,
                  color: theme.text,
                  borderColor: theme.border
                }}
              />
              <button
                type="submit"
                className="search-button"
                style={{ backgroundColor: theme.primary, color: theme.buttonText }}
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links" style={{ color: theme.navText }}>
            <Link to="/shop" className="nav-link">
              <FaShoppingBag className="mr-2" />
              Shop
            </Link>
            <Link to="/cart" className="nav-link">
              <FaShoppingCart className="cart-icon" />
              Cart
              {cartItems.length > 0 && (
                <span className="cart-count">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>

            <ThemeToggler />

            {user ? (
              <div className="user-dropdown" ref={dropdownRef}>
                <button className="nav-link" onClick={toggleDropdown} style={{ color: theme.navText }}>
                  <FaUser style={{marginRight: '5px'}} />
                  {user.name}
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu" style={{
                    backgroundColor: theme.cardBg,
                    color: theme.text,
                    borderColor: theme.border,
                    boxShadow: theme.shadow
                  }}>
                    <Link to="/profile" className="dropdown-item" onClick={closeDropdown} style={{ color: theme.text }}>Profile</Link>
                    <Link to="/orderhistory" className="dropdown-item" onClick={closeDropdown} style={{ color: theme.text }}>Orders</Link>
                    {user.role === 'admin' && (
                      <>
                        <Link to="/admin/dashboard" className="dropdown-item" onClick={closeDropdown} style={{ color: theme.text }}>Dashboard</Link>
                        <Link to="/admin/products" className="dropdown-item" onClick={closeDropdown} style={{ color: theme.text }}>Products</Link>
                        <Link to="/admin/orders" className="dropdown-item" onClick={closeDropdown} style={{ color: theme.text }}>Orders</Link>
                      </>
                    )}
                    <button
                      onClick={() => {
                        logoutHandler();
                        closeDropdown();
                      }}
                      className="dropdown-item"
                      style={{ color: theme.error }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="signin-button" style={{
                  backgroundColor: theme.buttonPrimary,
                  color: theme.buttonText,
                  boxShadow: theme.shadow
                }}>
                  <FaUser style={{marginRight: '5px'}} />
                  Sign In
                </Link>
                <Link to="/register" className="register-button" style={{
                  backgroundColor: 'transparent',
                  color: theme.navText,
                  borderColor: theme.navText
                }}>Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="menu-button" style={{ color: theme.navText }}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <div className="mobile-search">
          <form onSubmit={submitHandler} style={{display: 'flex', width: '100%'}}>
            <input
              type="text"
              name="q"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              placeholder="Search products..."
              className="search-input themed-input"
              style={{
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border
              }}
            />
            <button
              type="submit"
              className="search-button"
              style={{ backgroundColor: theme.primary, color: theme.buttonText }}
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} style={{
          backgroundColor: theme.navBg,
          color: theme.navText,
          borderColor: theme.border,
          boxShadow: theme.shadow
        }}>
          <Link
            to="/shop"
            className="mobile-nav-link"
            onClick={toggleMenu}
          >
            <div style={{display: 'flex', alignItems: 'center'}}>
              <FaShoppingBag style={{marginRight: '8px'}} />
              Shop
            </div>
          </Link>
          <Link
            to="/cart"
            className="mobile-nav-link"
            onClick={toggleMenu}
          >
            <div style={{display: 'flex', alignItems: 'center'}}>
              <FaShoppingCart style={{marginRight: '8px'}} />
              Cart
              {cartItems.length > 0 && (
                <span className="cart-count">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </div>
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="mobile-nav-link"
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <Link
                to="/orderhistory"
                className="mobile-nav-link"
                onClick={toggleMenu}
              >
                Orders
              </Link>
              {user.role === 'admin' && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="mobile-nav-link"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/products"
                    className="mobile-nav-link"
                    onClick={toggleMenu}
                  >
                    Products
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="mobile-nav-link"
                    onClick={toggleMenu}
                  >
                    Orders
                  </Link>
                </>
              )}
              <button
                onClick={() => {
                  logoutHandler();
                  toggleMenu();
                }}
                className="mobile-nav-link"
                style={{background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer'}}
              >
                Logout
              </button>
            </>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <Link
                to="/login"
                className="signin-button"
                onClick={toggleMenu}
                style={{justifyContent: 'center'}}
              >
                <FaUser style={{marginRight: '5px'}} />
                Sign In
              </Link>
              <Link
                to="/register"
                className="register-button"
                onClick={toggleMenu}
                style={{justifyContent: 'center'}}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
