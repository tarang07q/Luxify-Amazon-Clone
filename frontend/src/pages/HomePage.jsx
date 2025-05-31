import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../slices/services/productService';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import Paginate from '../components/ui/Paginate';
import { FaArrowRight, FaUser, FaShoppingCart, FaSearch, FaStore, FaBox, FaLaptop, FaHome, FaBook, FaTshirt, FaSprayCan, FaGamepad, FaRunning, FaShoppingBasket, FaPaw, FaCar, FaTools, FaFirstAid, FaBriefcase, FaGift, FaHeartbeat, FaUtensils } from 'react-icons/fa';
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
  const location = window.location.pathname;
  const isShopPage = location === '/shop';

  const { user } = useSelector((state) => state.auth);

  // Categories for display (matching backend categories)
  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Books',
    'Sports & Outdoors',
    'Beauty & Personal Care',
    'Automotive',
    'Toys & Games',
    'Pet Supplies',
    'Grocery',
    'Clothing',
    'Home & Garden',
    'Health',
    'Food'
  ];

  // Check if keyword is a category or "featured"
  const isCategory = categories.includes(keyword);
  const isFeatured = keyword === 'featured';

  // Set up query parameters
  const queryParams = {
    pageNumber,
    limit: 40,
  };

  // If keyword is a category, use it as category filter
  if (isCategory) {
    queryParams.category = keyword;
  }
  // If keyword is "featured", set featured parameter
  else if (isFeatured) {
    queryParams.featured = true;
  }
  // Otherwise use keyword for search
  else if (keyword) {
    queryParams.q = keyword;
  }

  const { data, isLoading, error, refetch } = useGetProductsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true
  });

  // Fetch featured products for homepage
  const { data: featuredData, isLoading: featuredLoading } = useGetProductsQuery({ featured: true, pageNumber: 1, limit: 40 }, { skip: !!keyword });

  useEffect(() => {
    // Refetch data when component mounts or keyword changes
    refetch();
  }, [refetch, keyword, pageNumber]);

  // This categories array is now defined above

  return (
    <div className="home-container">
      {/* Hero Section with 3D Element */}
      {(!keyword || isShopPage) && (
        <div className={`hero-section ${isShopPage ? 'shop-hero' : ''}`}>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                {isShopPage ? (
                  <>Explore Our <span>Premium</span> Collection</>
                ) : (
                  <>Discover <span>Premium</span> Products at Luxify</>
                )}
              </h1>
              <p className="hero-description">
                Experience luxury shopping with our curated collection of high-quality products.
                Explore exclusive items with immersive 3D visualization technology.
              </p>
              <div className="hero-buttons">
                <Link
                  to={isShopPage ? "/search/featured" : "/search/featured"}
                  className="hero-button primary-button"
                >
                  <FaStore style={{marginRight: '8px'}} /> {isShopPage ? 'View Featured' : 'Shop Now'}
                </Link>
              </div>
            </div>
            {isShopPage ? (
              <div className="shop-3d-icon">
                <ShoppingBag3D
                  size={200}
                  floatingAnimation={true}
                  glowEffect={true}
                />
              </div>
            ) : (
              <>
                <div className="hero-3d-icon">
                  <ShoppingBag3D
                    size={150}
                    floatingAnimation={true}
                    glowEffect={true}
                  />
                </div>
                <div className="hero-3d">
                  <div className="model-container">
                    <CubeIcon
                      size={800}
                      autoRotate={true}
                    />
                  </div>
                </div>
              </>
            )}
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

              // Define colors based on theme
              const themeColors = {
                primary: '#00f2ff',
                secondary: '#ff00e4',
                accent1: '#7928ca',
                accent2: '#01ffc3',
                accent3: '#ffaa00',
                accent4: '#ff6b6b',
                accent5: '#4ecdc4',
                accent6: '#5046e5',
                accent7: '#f7b801',
                accent8: '#9c27b0'
              };

              switch(category) {
                case 'Electronics':
                  icon = <FaBox size={28} />;
                  color = themeColors.primary;
                  break;
                case 'Clothing':
                  icon = <FaTshirt size={28} />;
                  color = themeColors.accent7;
                  break;
                case 'Home & Garden':
                  icon = <FaHome size={28} />;
                  color = themeColors.accent4;
                  break;
                case 'Books':
                  icon = <FaBook size={28} />;
                  color = themeColors.accent6;
                  break;
                case 'Beauty':
                  icon = <FaSprayCan size={28} />;
                  color = themeColors.secondary;
                  break;
                case 'Sports':
                  icon = <FaGamepad size={28} />;
                  color = themeColors.accent3;
                  break;
                case 'Toys':
                  icon = <FaGamepad size={28} />;
                  color = themeColors.accent8;
                  break;
                case 'Health':
                  icon = <FaHeartbeat size={28} />;
                  color = themeColors.accent1;
                  break;
                case 'Food':
                  icon = <FaUtensils size={28} />;
                  color = themeColors.accent5;
                  break;
                case 'Automotive':
                  icon = <FaCar size={28} />;
                  color = themeColors.accent2;
                  break;
                default:
                  icon = <FaBox size={28} />;
                  color = themeColors.primary;
              }

              return (
                <Link
                  key={category}
                  to={`/search/${category}`}
                  className="category-card"
                >
                  <div className="category-icon" style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                    <ProductBox3D
                      size={60}
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

          {/* View All Categories Button */}
          <div className="view-all-categories">
            <Link to="/shop" className="view-all-button">
              View All Categories <FaArrowRight style={{marginLeft: '8px'}} />
            </Link>
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
        ) : !data || !data.data || data.data.length === 0 ? (
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
      {(!keyword || isShopPage) && !featuredLoading && featuredData?.data && featuredData.data.length > 0 && (
        <div className={`featured-section ${isShopPage ? 'shop-featured' : ''}`}>
          <h2 className="featured-title">Featured Products</h2>
          <div className="products-grid">
            {featuredData.data
              .slice(0, isShopPage ? 8 : 4)
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
