import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaShoppingCart, FaTag, FaCreditCard, FaGift, FaBox, FaFileInvoiceDollar, FaUser, FaChartBar } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import ShoppingBag3D from '../components/3d/ShoppingBag3D';
import ProductBox3D from '../components/3d/ProductBox3D';
import OrderDoc3D from '../components/3d/OrderDoc3D';
import ProfileCard3D from '../components/3d/ProfileCard3D';
import DashboardPanel3D from '../components/3d/DashboardPanel3D';
import SpecializedIconShowcase from '../components/3d/SpecializedIconShowcase';



const LandingPage = () => {
  const { theme, currentTheme } = useTheme();

  return (
    <div className="landing-page" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Hero Section with Specialized 3D Icons */}
      <section className="hero-section py-20" style={{
        background: currentTheme === 'light'
          ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)'
          : 'linear-gradient(135deg, #1E3A8A 0%, #5B21B6 50%, #831843 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '0 0 20px 20px'
      }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 futuristic-title">Welcome to Amazer</h1>
              <p className="text-xl mb-8">
                Discover a new dimension of online shopping with our curated selection of premium products.
                Experience fast shipping, secure payments, and exceptional customer service.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="flex items-center font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{
                  backgroundColor: '#ffffff',
                  color: '#6366F1',
                }}>
                  <FaShoppingBag className="mr-2" /> Start Shopping
                </Link>
                <Link to="/about" className="flex items-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 h-64 md:h-96">
              <div className="w-full h-full">
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ShoppingBag3D
                    size={300}
                    color={currentTheme === 'dark' ? '#00f2ff' : '#5046e5'}
                    floatingAnimation={true}
                    glowEffect={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Specialized 3D Icons */}
      <section className="features-section py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 futuristic-title" style={{
            background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Explore Our Features
          </h2>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            Amazer brings you the best shopping experience with a wide range of products,
            fast shipping, secure payments, and exclusive deals. Discover why customers
            love shopping with us.
          </p>

          <SpecializedIconShowcase size={180} showTitles={true} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-16" style={{
        background: currentTheme === 'light'
          ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(91, 33, 182, 0.1) 50%, rgba(131, 24, 67, 0.1) 100%)',
      }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 futuristic-title" style={{
            background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Electronics',
                icon: <ProductBox3D
                  size={150}
                  color="#3b82f6"
                  floatingAnimation={true}
                  glowEffect={true}
                />
              },
              {
                name: 'Fashion',
                icon: <ShoppingBag3D
                  size={150}
                  color="#ec4899"
                  floatingAnimation={true}
                  glowEffect={true}
                />
              },
              {
                name: 'Home & Kitchen',
                icon: <ProductBox3D
                  size={150}
                  color="#10b981"
                  floatingAnimation={true}
                  glowEffect={true}
                />
              },
              {
                name: 'Beauty',
                icon: <ProductBox3D
                  size={150}
                  color="#f59e0b"
                  floatingAnimation={true}
                  glowEffect={true}
                />
              }
            ].map((category, index) => (
              <div
                key={index}
                className="category-card p-6 rounded-lg flex flex-col items-center justify-center"
                style={{
                  backgroundColor: theme.cardBg,
                  boxShadow: `0 10px 25px rgba(0, 0, 0, 0.2)`,
                  border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)'}`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'visible',
                  height: '280px',
                  backdropFilter: 'blur(5px)',
                }}
              >
                <div className="icon-container mb-6" style={{
                  height: '150px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 10
                }}>
                  {category.icon}
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{
                    color: theme.primary,
                    textShadow: currentTheme === 'dark' ? '0 0 8px rgba(0, 242, 255, 0.3)' : 'none',
                    fontFamily: "'Orbitron', sans-serif",
                    letterSpacing: '0.5px'
                  }}
                >
                  {category.name}
                </h3>
                <Link
                  to={`/search/${category.name}`}
                  className="text-sm font-medium mt-2 flex items-center"
                  style={{
                    color: theme.primary,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    background: currentTheme === 'dark'
                      ? 'rgba(0, 242, 255, 0.1)'
                      : 'rgba(99, 102, 241, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = currentTheme === 'dark'
                      ? 'rgba(0, 242, 255, 0.2)'
                      : 'rgba(99, 102, 241, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = currentTheme === 'dark'
                      ? 'rgba(0, 242, 255, 0.1)'
                      : 'rgba(99, 102, 241, 0.1)';
                  }}
                >
                  Browse Products <FaTag className="ml-1" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              View All Categories <FaShoppingCart className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-20" style={{
        background: currentTheme === 'light'
          ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)'
          : 'linear-gradient(135deg, #1E3A8A 0%, #5B21B6 50%, #831843 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '20px 20px 0 0',
        margin: '0 1rem'
      }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Amazer today and discover a new dimension of online shopping with our premium products and exceptional service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="flex items-center font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{
              backgroundColor: '#ffffff',
              color: '#6366F1',
            }}>
              <FaShoppingBag className="mr-2" /> Create Account
            </Link>
            <Link to="/shop" className="flex items-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
