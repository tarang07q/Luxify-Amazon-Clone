import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaShoppingBag } from 'react-icons/fa';
import { logout } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/services/authService';
import './Header.css';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

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
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
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
                className="search-input"
              />
              <button
                type="submit"
                className="search-button"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <Link to="/cart" className="nav-link">
              <FaShoppingCart className="cart-icon" />
              Cart
              {cartItems.length > 0 && (
                <span className="cart-count">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>

            {user ? (
              <div className="user-dropdown">
                <button className="nav-link">
                  <FaUser style={{marginRight: '5px'}} />
                  {user.name}
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <Link to="/orderhistory" className="dropdown-item">Orders</Link>
                  {user.role === 'admin' && (
                    <>
                      <Link to="/admin/dashboard" className="dropdown-item">Dashboard</Link>
                      <Link to="/admin/products" className="dropdown-item">Products</Link>
                      <Link to="/admin/orders" className="dropdown-item">Orders</Link>
                    </>
                  )}
                  <button onClick={logoutHandler} className="dropdown-item">Logout</button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="signin-button">
                  <FaUser style={{marginRight: '5px'}} />
                  Sign In
                </Link>
                <Link to="/register" className="register-button">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="menu-button">
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
              className="search-input"
            />
            <button
              type="submit"
              className="search-button"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
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
