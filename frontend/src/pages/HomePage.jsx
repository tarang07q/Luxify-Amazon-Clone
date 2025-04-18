import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../slices/services/productService';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import Paginate from '../components/ui/Paginate';
import { FaArrowRight, FaUser, FaShoppingCart, FaSearch, FaStore } from 'react-icons/fa';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PresentationControls } from '@react-three/drei';
import './HomePage.css';

// 3D Model for Hero Section
const HeroModel = () => {
  // This is a placeholder - in a real app, you'd use an actual model
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#FF9900" />
    </mesh>
  );
};

const HomePage = () => {
  const { keyword, pageNumber = 1 } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  useEffect(() => {
    // Refetch data when component mounts
    refetch();
  }, [refetch]);

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
  ];

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
                {!user && (
                  <Link
                    to="/login"
                    className="hero-button secondary-button"
                  >
                    <FaUser style={{marginRight: '8px'}} /> Sign In / Register
                  </Link>
                )}
              </div>
            </div>
            <div className="hero-3d">
              <div className="model-container">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.7} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />
                  <PresentationControls
                    global
                    zoom={0.8}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                  >
                    <HeroModel />
                  </PresentationControls>
                  <OrbitControls enableZoom={false} />
                </Canvas>
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
            {categories.map((category) => (
              <Link
                key={category}
                to={`/search/${category}`}
                className="category-card"
              >
                <div className="category-name">{category}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="products-section">
        <h2 className="section-title">
          {keyword ? `Search Results for "${keyword}"` : 'Latest Products'}
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
              {data.data.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
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
