import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../slices/services/productService';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import Paginate from '../components/ui/Paginate';
import { FaArrowRight, FaUser, FaShoppingCart, FaSearch, FaStore, FaBox, FaLaptop, FaHome, FaBook, FaTshirt, FaSprayCan, FaGamepad, FaRunning, FaShoppingBasket, FaPaw, FaCar, FaTools, FaFirstAid, FaBriefcase, FaGift } from 'react-icons/fa';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PresentationControls } from '@react-three/drei';
import CubeIcon from '../components/3d/CubeIcon';
import ShoppingCart3D from '../components/3d/ShoppingCart3D';
import Order3D from '../components/3d/Order3D';
import Dashboard3D from '../components/3d/Dashboard3D';
import Profile3D from '../components/3d/Profile3D';
import ProductBox3D from '../components/3d/ProductBox3D';
import ShoppingBag3D from '../components/3d/ShoppingBag3D';
import './HomePage.css';

const HomePage = () => {
  const { keyword, pageNumber = 1 } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // Categories for display
  const categories = [
    'Electronics',
    'Computers',
    'Smart Home',
    'Home & Kitchen',
    'Clothing',
    'Beauty & Personal Care',
    'Books',
    'Toys & Games',
    'Sports & Outdoors',
    'Grocery & Gourmet Food',
    'Pet Supplies',
    'Automotive',
    'Tools & Home Improvement',
    'Health & Household',
    'Office Products',
    'Gift Cards'
  ];

  // Check if keyword is a category or "featured"
  const isCategory = categories.includes(keyword);
  const isFeatured = keyword === 'featured';

  // Set up query parameters
  const queryParams = {
    pageNumber,
  };

  // If keyword is a category, use it as category filter
  if (isCategory) {
    queryParams.category = keyword;
  }
  // If keyword is "featured", we'll filter after fetching
  else if (!isFeatured) {
    queryParams.keyword = keyword;
  }

  const { data, isLoading, error, refetch } = useGetProductsQuery(queryParams);

  useEffect(() => {
    // Refetch data when component mounts
    refetch();
  }, [refetch]);

  // This categories array is now defined above

  return (
    <div className="home-container">
      {/* Hero Section with 3D Element */}
      {!keyword && (
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Discover <span>Premium</span> Products at Luxify</h1>
              <p className="hero-description">
                Experience luxury shopping with our curated collection of high-quality products.
                Explore exclusive items with immersive 3D visualization technology.
              </p>
              <div className="hero-buttons">
                <Link
                  to="/search/featured"
                  className="hero-button primary-button"
                >
                  <FaStore style={{marginRight: '8px'}} /> Shop Now
                </Link>
                <div className="hero-3d-icon">
                  <ShoppingBag3D
                    size={120}
                    floatingAnimation={true}
                    glowEffect={true}
                  />
                </div>
              </div>
            </div>
            <div className="hero-3d">
              <div className="model-container">
                <CubeIcon
                  size={800}
                  autoRotate={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Navigation */}
      {!keyword && (
        <div className="categories-section">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => {
              // Get appropriate icon for each category
              let icon;
              let color;
              switch(category) {
                case 'Electronics':
                  icon = <FaBox size={24} />;
                  color = '#00c3ff';
                  break;
                case 'Computers':
                  icon = <FaLaptop size={24} />;
                  color = '#4ecdc4';
                  break;
                case 'Smart Home':
                  icon = <FaHome size={24} />;
                  color = '#6a0572';
                  break;
                case 'Home & Kitchen':
                  icon = <FaHome size={24} />;
                  color = '#ff6b6b';
                  break;
                case 'Clothing':
                  icon = <FaTshirt size={24} />;
                  color = '#f7b801';
                  break;
                case 'Beauty & Personal Care':
                  icon = <FaSprayCan size={24} />;
                  color = '#ff00e4';
                  break;
                case 'Books':
                  icon = <FaBook size={24} />;
                  color = '#5046e5';
                  break;
                case 'Toys & Games':
                  icon = <FaGamepad size={24} />;
                  color = '#ff9900';
                  break;
                case 'Sports & Outdoors':
                  icon = <FaRunning size={24} />;
                  color = '#00f2ff';
                  break;
                case 'Grocery & Gourmet Food':
                  icon = <FaShoppingBasket size={24} />;
                  color = '#4caf50';
                  break;
                case 'Pet Supplies':
                  icon = <FaPaw size={24} />;
                  color = '#ff5722';
                  break;
                case 'Automotive':
                  icon = <FaCar size={24} />;
                  color = '#607d8b';
                  break;
                case 'Tools & Home Improvement':
                  icon = <FaTools size={24} />;
                  color = '#795548';
                  break;
                case 'Health & Household':
                  icon = <FaFirstAid size={24} />;
                  color = '#e91e63';
                  break;
                case 'Office Products':
                  icon = <FaBriefcase size={24} />;
                  color = '#3f51b5';
                  break;
                case 'Gift Cards':
                  icon = <FaGift size={24} />;
                  color = '#9c27b0';
                  break;
                default:
                  icon = <FaBox size={24} />;
                  color = '#00f2ff';
              }

              return (
                <Link
                  key={category}
                  to={`/search/${category}`}
                  className="category-card"
                >
                  <div className="category-icon">
                    <ProductBox3D
                      size={80}
                      color={color}
                      icon={icon}
                      floatingAnimation={true}
                      glowEffect={true}
                    />
                  </div>
                  <div className="category-name">{category}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="products-section">
        <h2 className="section-title">
          {isCategory ? `Products in ${keyword}` :
           isFeatured ? 'Featured Products' :
           keyword ? `Search Results for "${keyword}"` : 'Latest Products'}
        </h2>

        {isLoading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : error ? (
          <div style={{padding: '20px'}}>
            <Message variant="danger">
              {error?.data?.message || error.error || JSON.stringify(error) || 'An error occurred'}
            </Message>
            <button
              onClick={() => refetch()}
              style={{
                marginTop: '15px',
                padding: '8px 16px',
                backgroundColor: '#FF9900',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        ) : !data || !data.data || (isFeatured && !data.data.some(product => product.featured)) || data.data.length === 0 ? (
          <div style={{padding: '40px 0', textAlign: 'center'}}>
            <Message>No products found</Message>
            <div style={{marginTop: '16px'}}>
              <Link to="/" style={{color: '#FF9900', textDecoration: 'underline'}}>Return to Home</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {isFeatured
                ? data.data
                    .filter((product) => product.featured)
                    .map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                : data.data.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
              }
            </div>
            <div style={{marginTop: '32px'}}>
              <Paginate
                pages={data.pages || 1}
                page={data.page || 1}
                keyword={keyword ? keyword : ''}
              />
            </div>
          </>
        )}
      </div>

      {/* Featured Products Section */}
      {!keyword && !isLoading && !error && data?.data && data.data.some(product => product.featured) && (
        <div className="featured-section">
          <h2 className="featured-title">Featured Products</h2>
          <div className="products-grid">
            {data.data
              .filter((product) => product.featured)
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div style={{textAlign: 'center'}}>
            <Link
              to="/search/featured"
              className="view-all-button"
            >
              View All Featured <FaArrowRight style={{marginLeft: '8px'}} />
            </Link>
          </div>
        </div>
      )}

      {/* Call to Action Section */}
      {!keyword && (
        <div className="cta-section">
          <h2 className="cta-title">Ready to Start Shopping?</h2>
          <p className="cta-description">Create an account today and get access to exclusive deals and offers!</p>
          {!user ? (
            <div className="cta-buttons">
              <Link
                to="/register"
                className="hero-button primary-button"
              >
                Register Now
              </Link>
              <Link
                to="/login"
                className="hero-button secondary-button"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to="/profile"
              className="hero-button primary-button"
            >
              View Your Profile
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
