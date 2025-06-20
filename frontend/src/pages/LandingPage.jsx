import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaShoppingBag, FaShoppingCart, FaTag, FaCreditCard, FaGift, FaBox,
  FaFileInvoiceDollar, FaUser, FaChartBar, FaSignInAlt, FaUserShield,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserPlus, FaArrowRight
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import ShoppingBag3D from '../components/3d/ShoppingBag3D';
import ProductBox3D from '../components/3d/ProductBox3D';
import OrderDoc3D from '../components/3d/OrderDoc3D';
import ProfileCard3D from '../components/3d/ProfileCard3D';
import DashboardPanel3D from '../components/3d/DashboardPanel3D';
import SpecializedIconShowcase from '../components/3d/SpecializedIconShowcase';
import ModernCube from '../components/3d/ModernCube';



const LandingPage = () => {
  const { theme, currentTheme } = useTheme();
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="landing-page" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4" style={{
        backgroundColor: currentTheme === 'dark' ? 'rgba(10, 11, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: currentTheme === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center" style={{
                background: currentTheme === 'dark' ? 'linear-gradient(135deg, #00f2ff, #7928ca)' : 'linear-gradient(135deg, #5046e5, #f0338d)',
                borderRadius: '8px',
                boxShadow: currentTheme === 'dark' ? '0 0 10px rgba(0, 242, 255, 0.5)' : '0 0 10px rgba(80, 70, 229, 0.3)'
              }}>
                <ModernCube size={30} color={currentTheme === 'dark' ? '#00f2ff' : '#5046e5'} />
              </div>
              <span className="font-bold text-2xl ml-2" style={{
                color: currentTheme === 'dark' ? '#ffffff' : theme.text,
                textShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.5)' : 'none'
              }}>Luxify</span>
            </div>

            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => scrollToSection('home')}
                className={`font-medium transition-colors ${activeSection === 'home' ? 'font-bold' : ''}`}
                style={{
                  color: activeSection === 'home'
                    ? (currentTheme === 'dark' ? '#00f2ff' : '#5046e5')
                    : (currentTheme === 'dark' ? '#ffffff' : theme.text)
                }}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`font-medium transition-colors ${activeSection === 'about' ? 'font-bold' : ''}`}
                style={{
                  color: activeSection === 'about'
                    ? (currentTheme === 'dark' ? '#00f2ff' : '#5046e5')
                    : (currentTheme === 'dark' ? '#ffffff' : theme.text)
                }}
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className={`font-medium transition-colors ${activeSection === 'features' ? 'font-bold' : ''}`}
                style={{
                  color: activeSection === 'features'
                    ? (currentTheme === 'dark' ? '#00f2ff' : '#5046e5')
                    : (currentTheme === 'dark' ? '#ffffff' : theme.text)
                }}
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`font-medium transition-colors ${activeSection === 'contact' ? 'font-bold' : ''}`}
                style={{
                  color: activeSection === 'contact'
                    ? (currentTheme === 'dark' ? '#00f2ff' : '#5046e5')
                    : (currentTheme === 'dark' ? '#ffffff' : theme.text)
                }}
              >
                Contact
              </button>
            </div>

            <div className="relative">
              <button
                className="flex items-center font-semibold py-2 px-4 rounded-full transition duration-300 shadow-lg hover:shadow-xl"
                style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : '#5046e5',
                  color: '#ffffff',
                  border: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.3)' : 'none',
                }}
                onClick={() => setShowLoginOptions(!showLoginOptions)}
              >
                <FaSignInAlt className="mr-2" /> Sign In
              </button>
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 transition-all duration-300 ${showLoginOptions ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.95)' : '#ffffff',
                  border: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.2)' : 'none',
                }}
              >
                <div className="py-1">
                  <Link to="/login" className="block px-4 py-2 hover:bg-indigo-100 hover:text-indigo-600" style={{
                    color: currentTheme === 'dark' ? '#ffffff' : theme.text
                  }}>
                    <FaUser className="inline mr-2" /> User Login
                  </Link>
                  <Link to="/login?admin=true" className="block px-4 py-2 hover:bg-indigo-100 hover:text-indigo-600" style={{
                    color: currentTheme === 'dark' ? '#ffffff' : theme.text
                  }}>
                    <FaUserShield className="inline mr-2" /> Admin Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Specialized 3D Icons */}
      <section id="home" className="hero-section pt-32 pb-20" style={{
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 futuristic-title">Welcome to Luxify</h1>
              <p className="text-xl mb-8">
                Discover a new dimension of online shopping with our curated selection of premium products.
                Experience fast shipping, secure payments, and exceptional customer service.
              </p>
              
            </div>
            <div className="md:w-1/2 h-55 md:h-62">
              <div className="w-full h-full">
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ShoppingBag3D
                    size={300}
                    color={currentTheme === 'dark' ? '#00f2ff' : '#5046e5'}
                    rotation={true}
                    rotationSpeed={0.5}
                    rotationAxis="y"
                    rotationDuration={10}
                    rotationEasing="ease-in-out"
                    rotationDelay={0}
                    rotationCount={1}
                    rotationInfinite={true}
                    rotationInfiniteCount={1}
                    rotationInfiniteDelay={0}
                    rotationInfiniteEasing="ease-in-out"
                    floatingAnimation={true}
                    glowEffect={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 futuristic-title" style={{
            background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            About Luxify
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4" style={{ color: theme.primary }}>Our Mission</h3>
                <p className="text-lg" style={{ color: theme.text }}>
                  At Luxify, our mission is to revolutionize online shopping by providing a curated selection of premium products
                  with exceptional customer service. We believe in making luxury accessible to everyone through a seamless
                  shopping experience.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: theme.primary }}>Our Vision</h3>
                <p className="text-lg" style={{ color: theme.text }}>
                  We envision a world where quality products are accessible to all, where shopping is not just a transaction
                  but an experience, and where customer satisfaction is the ultimate measure of success. Luxify aims to be
                  the global leader in premium online retail.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <ModernCube
                size={300}
                color={currentTheme === 'dark' ? '#00f2ff' : '#5046e5'}
                floatingAnimation={true}
                glowEffect={true}
              />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg" style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
              border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
              boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.1)' : 'none'
            }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: theme.primary }}>Quality Products</h3>
              <p style={{ color: theme.text }}>
                We carefully select each product in our inventory to ensure the highest quality standards.
                Our team of experts evaluates products based on craftsmanship, materials, and customer reviews.
              </p>
            </div>

            <div className="p-6 rounded-lg" style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
              border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
              boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.1)' : 'none'
            }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: theme.primary }}>Customer First</h3>
              <p style={{ color: theme.text }}>
                Our customers are at the heart of everything we do. We strive to provide exceptional service,
                from browsing to delivery and beyond. Your satisfaction is our top priority.
              </p>
            </div>

            <div className="p-6 rounded-lg" style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
              border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
              boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.1)' : 'none'
            }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: theme.primary }}>Innovation</h3>
              <p style={{ color: theme.text }}>
                We continuously innovate our platform to enhance your shopping experience. From advanced search
                features to personalized recommendations, we leverage technology to make shopping effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Specialized 3D Icons */}
      <section id="features" className="features-section py-20" style={{
        backgroundColor: currentTheme === 'dark' ? 'rgba(10, 11, 30, 0.95)' : '#f9fafb',
      }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 futuristic-title" style={{
            background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Explore Our Features
          </h2>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto" style={{ color: theme.text }}>
            Luxify brings you the best shopping experience with a wide range of premium products,
            fast shipping, secure payments, and exclusive deals. Discover why customers
            love shopping with us.
          </p>

          <SpecializedIconShowcase size={180} showTitles={true} />
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="featured-section py-20" style={{
        background: currentTheme === 'light'
          ? 'linear-gradient(135deg, #f3f4f6 0%, #e0e7ff 100%)'
          : 'linear-gradient(135deg, #18181b 0%, #312e81 100%)',
      }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 futuristic-title" style={{
            background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Featured Products
          </h2>
          {/* Fetch and display featured products */}
          {/* You may need to import useGetProductsQuery from your productService */}
          {/* Example: */}
          {/* const { data: featuredData, isLoading: featuredLoading } = useGetProductsQuery({ featured: true, limit: 8 }); */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Replace with dynamic map over featuredData?.data */}
            {[1,2,3,4].map((_, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-2xl" style={{ minHeight: 340 }}>
                <ProductBox3D size={100} color={currentTheme === 'dark' ? '#00f2ff' : '#5046e5'} floatingAnimation={true} glowEffect={true} />
                <h3 className="text-lg font-bold mt-6 mb-2" style={{ color: theme.primary }}>Product Name</h3>
                <p className="text-gray-500 dark:text-gray-300 mb-4">Short product description goes here.</p>
                <Link to="/product/1" className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-lg hover:shadow-xl">
                  View Product <FaArrowRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/search/featured" className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl">
              View All Featured <FaArrowRight className="ml-2" />
            </Link>
          </div>
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
                name: 'Clothing',
                icon: <ShoppingBag3D
                  size={150}
                  color="#ec4899"
                  floatingAnimation={true}
                  glowEffect={true}
                />
              },
              {
                name: 'Home & Garden',
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

      {/* Authentication Section */}
      <section className="auth-section py-16" style={{
        background: currentTheme === 'light'
          ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(91, 33, 182, 0.1) 50%, rgba(131, 24, 67, 0.1) 100%)',
      }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Registration */}
            <div className="auth-card p-8 rounded-xl" style={{
              backgroundColor: theme.cardBg,
              boxShadow: `0 10px 25px rgba(0, 0, 0, 0.2)`,
              border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)'}`,
              backdropFilter: 'blur(5px)',
            }}>
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <ProfileCard3D
                    size={80}
                    color={currentTheme === 'dark' ? '#00f2ff' : '#5046e5'}
                    floatingAnimation={true}
                    glowEffect={true}
                  />
                </div>
                <h3 className="text-2xl font-bold" style={{
                  color: theme.primary,
                  textShadow: currentTheme === 'dark' ? '0 0 8px rgba(0, 242, 255, 0.3)' : 'none',
                  fontFamily: "'Orbitron', sans-serif",
                }}>User Account</h3>
              </div>
              <p className="mb-6" style={{ color: theme.text }}>
              Create an account to shop, track orders, and save favorites for a personalized Luxify experience.
              </p>
              <Link to="/register" className="flex items-center justify-center w-full font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : '#6366F1',
                color: '#ffffff',
                border: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.3)' : 'none',
              }}>
                <FaUserPlus className="mr-2" /> Create User Account
              </Link>
            </div>

            {/* Admin Registration */}
            <div className="auth-card p-8 rounded-xl" style={{
              backgroundColor: theme.cardBg,
              boxShadow: `0 10px 25px rgba(0, 0, 0, 0.2)`,
              border: `1px solid ${currentTheme === 'dark' ? 'rgba(255, 0, 228, 0.1)' : 'rgba(236, 72, 153, 0.1)'}`,
              backdropFilter: 'blur(5px)',
            }}>
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <DashboardPanel3D
                    size={80}
                    color={currentTheme === 'dark' ? '#ff00e4' : '#EC4899'}
                    floatingAnimation={true}
                    glowEffect={true}
                  />
                </div>
                <h3 className="text-2xl font-bold" style={{
                  color: currentTheme === 'dark' ? '#ff00e4' : '#EC4899',
                  textShadow: currentTheme === 'dark' ? '0 0 8px rgba(255, 0, 228, 0.3)' : 'none',
                  fontFamily: "'Orbitron', sans-serif",
                }}>Admin Portal</h3>
              </div>
              <p className="mb-6" style={{ color: theme.text }}>
                Access the admin dashboard to manage products, orders, and users.
                Control your store with powerful admin tools and analytics.
              </p>
              <Link to="/login?admin=true" className="flex items-center justify-center w-full font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(255, 0, 228, 0.2)' : '#EC4899',
                color: '#ffffff',
                border: currentTheme === 'dark' ? '1px solid rgba(255, 0, 228, 0.3)' : 'none',
              }}>
                <FaUserShield className="mr-2" /> Access Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 futuristic-title" style={{
            background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Contact Us
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-8">
                <div className="contact-card p-6 rounded-lg" style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
                  border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
                  boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.1)' : 'none'
                }}>
                  <div className="flex items-center mb-4">
                    <div className="icon-container mr-4" style={{ width: '50px', height: '50px' }}>
                      <div className="flex items-center justify-center w-full h-full rounded-full" style={{
                        backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                      }}>
                        <FaEnvelope size={20} style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1" style={{ color: theme.primary }}>Email Us</h3>
                      <p style={{ color: theme.text }}>We'll respond within 24 hours</p>
                    </div>
                  </div>
                  <div className="ml-16">
                    <p style={{ color: theme.text }}>support@luxify.com</p>
                    <p style={{ color: theme.text }}>sales@luxify.com</p>
                  </div>
                </div>

                <div className="contact-card p-6 rounded-lg" style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
                  border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
                  boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.1)' : 'none'
                }}>
                  <div className="flex items-center mb-4">
                    <div className="icon-container mr-4" style={{ width: '50px', height: '50px' }}>
                      <div className="flex items-center justify-center w-full h-full rounded-full" style={{
                        backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                      }}>
                        <FaPhone size={20} style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1" style={{ color: theme.primary }}>Call Us</h3>
                      <p style={{ color: theme.text }}>Mon-Fri: 9am - 6pm</p>
                    </div>
                  </div>
                  <div className="ml-16">
                    <p style={{ color: theme.text }}>+1 (800) 123-4567</p>
                    <p style={{ color: theme.text }}>+1 (800) 987-6543</p>
                  </div>
                </div>

                <div className="contact-card p-6 rounded-lg" style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
                  border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
                  boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.1)' : 'none'
                }}>
                  <div className="flex items-center mb-4">
                    <div className="icon-container mr-4" style={{ width: '50px', height: '50px' }}>
                      <div className="flex items-center justify-center w-full h-full rounded-full" style={{
                        backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                      }}>
                        <FaMapMarkerAlt size={20} style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1" style={{ color: theme.primary }}>Visit Us</h3>
                      <p style={{ color: theme.text }}>Our headquarters</p>
                    </div>
                  </div>
                  <div className="ml-16">
                    <p style={{ color: theme.text }}>123 Tech Plaza</p>
                    <p style={{ color: theme.text }}>San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 contact-form p-8 rounded-lg" style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
              border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
              boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.1)' : 'none'
            }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: theme.primary }}>Send Us a Message</h3>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 font-medium" style={{ color: theme.text }}>Your Name</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg"
                      style={{
                        backgroundColor: currentTheme === 'dark' ? 'rgba(10, 11, 30, 0.8)' : '#ffffff',
                        border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
                        color: theme.text
                      }}
                      placeholder="Tarang Bhargava"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium" style={{ color: theme.text }}>Your Email</label>
                    <input
                      type="email"
                      className="w-full p-3 rounded-lg"
                      style={{
                        backgroundColor: currentTheme === 'dark' ? 'rgba(10, 11, 30, 0.8)' : '#ffffff',
                        border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
                        color: theme.text
                      }}
                      placeholder="123@example.com"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 font-medium" style={{ color: theme.text }}>Subject</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg"
                    style={{
                      backgroundColor: currentTheme === 'dark' ? 'rgba(10, 11, 30, 0.8)' : '#ffffff',
                      border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
                      color: theme.text
                    }}
                    placeholder="How can we help you?"
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 font-medium" style={{ color: theme.text }}>Message</label>
                  <textarea
                    className="w-full p-3 rounded-lg"
                    style={{
                      backgroundColor: currentTheme === 'dark' ? 'rgba(10, 11, 30, 0.8)' : '#ffffff',
                      border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
                      color: theme.text
                    }}
                    rows="5"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="py-3 px-8 rounded-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl"
                  style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : '#5046e5',
                    color: '#ffffff',
                    border: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.3)' : 'none',
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
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
            Join Luxify today and discover a new dimension of online shopping with our premium products and exceptional service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="flex items-center font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{
              backgroundColor: '#ffffff',
              color: '#6366F1',
            }}>
              <FaUserPlus className="mr-2" /> Create Account
            </Link>
            <Link to="/shop" className="flex items-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <FaShoppingBag className="mr-2" /> Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{
        backgroundColor: currentTheme === 'dark' ? 'rgba(10, 11, 30, 0.95)' : '#f9fafb',
        borderTop: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(80, 70, 229, 0.1)'}`,
      }}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="h-10 w-10 flex items-center justify-center mr-2" style={{
              background: currentTheme === 'dark' ? 'linear-gradient(135deg, #00f2ff, #7928ca)' : 'linear-gradient(135deg, #5046e5, #f0338d)',
              borderRadius: '8px',
              boxShadow: currentTheme === 'dark' ? '0 0 10px rgba(0, 242, 255, 0.5)' : '0 0 10px rgba(80, 70, 229, 0.3)'
            }}>
              <ModernCube size={30} color={currentTheme === 'dark' ? '#00f2ff' : '#5046e5'} />
            </div>
            <span className="font-bold text-2xl" style={{
              color: currentTheme === 'dark' ? '#ffffff' : theme.text,
              textShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.5)' : 'none'
            }}>Luxify</span>
          </div>
          <p className="text-sm" style={{ color: theme.textLight }}>
            © {new Date().getFullYear()} Luxify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
