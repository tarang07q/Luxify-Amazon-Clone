import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaEye,
  FaImage,
  FaHeart,
  FaRegHeart,
  FaCheck,
  FaTrophy
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import usePriceFormatter from '../../hooks/usePriceFormatter';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { theme, currentTheme } = useTheme();
  const { formatPrice } = usePriceFormatter();

  // Early return if product is not provided
  if (!product) {
    return (
      <div className="product-card themed-card">
        <div className="fallback-image">
          <div className="fallback-icon">
            <FaImage size={50} />
          </div>
          <p className="fallback-title">Product not available</p>
        </div>
      </div>
    );
  }

  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  // Check if product is already in cart
  useEffect(() => {
    if (product?._id) {
      const productInCart = cartItems.find(item => item._id === product._id);
      setIsAddedToCart(!!productInCart);
    }
  }, [cartItems, product?._id]);

  const addToCartHandler = () => {
    if (!product) return;

    dispatch(
      addToCart({
        ...product,
        qty: 1,
      })
    );
    setIsAddedToCart(true);
    toast.success(`${product?.title || 'Product'} added to cart!`);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted
      ? `${product?.title || 'Product'} removed from wishlist!`
      : `${product?.title || 'Product'} added to wishlist!`
    );
  };

  // Handle image error
  const handleImageError = (e) => {
    console.error("Image failed to load:", e.target.src);
    setImageError(true);
  };

  // Get optimized image URL
  const getImageUrl = (imagePath, index = 0) => {
    if (!imagePath) return '/placeholder.jpg';

    // If it's already a full URL
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // If it's a relative path from the API
    if (imagePath.startsWith('/uploads/')) {
      return `http://localhost:5000${imagePath}`;
    }

    // If it's a relative path from the API with /api prefix
    if (imagePath.startsWith('/api/uploads/')) {
      return `http://localhost:5000${imagePath.substring(4)}`;
    }

    // Fallback
    return '/placeholder.jpg';
  };

  // Preload images to ensure they're loaded before displaying
  useEffect(() => {
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      const preloadImages = () => {
        product.images.forEach((imgPath) => {
          if (imgPath) {
            const img = new Image();
            img.src = getImageUrl(imgPath);
          }
        });
      };
      preloadImages();
    }
  }, [product?.images]);

  // Calculate discount percentage - with safe fallbacks
  const discountPercentage = product?.mrp && product?.price && product.mrp > product.price
    ? ((product.mrp - product.price) / product.mrp) * 100
    : product?.discount || 0;

  // Rating stars
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star" />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star" />);
    }

    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star" />);
    }

    return stars;
  };

  return (
    <div
      className="product-card themed-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="discount-badge themed-badge">
          {discountPercentage.toFixed(0)}% OFF
        </div>
      )}

      {/* Featured Badge */}
      {product?.featured && (
        <div className="featured-badge themed-badge" style={{
          top: discountPercentage > 0 ? '40px' : '10px',
          backgroundColor: '#FFD700',
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <FaTrophy size={12} /> Featured
        </div>
      )}

      {/* Wishlist Button */}
      <button
        className={`wishlist-button ${isWishlisted ? 'wishlisted' : ''}`}
        onClick={toggleWishlist}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Product Image */}
      <div className="product-image-container">
        <Link to={`/product/${product._id}`}>
          {imageError ? (
            <div className="fallback-image">
              <div className="fallback-icon">
                <FaImage size={50} />
              </div>
              <p className="fallback-title">{product?.title && product.title.length > 30
                ? `${product.title.substring(0, 30)}...`
                : product?.title || 'Product'}
              </p>
              <p className="fallback-category">{product?.category || 'Category'}</p>
            </div>
          ) : (
            <div className="image-wrapper" style={{
              width: '100%',
              aspectRatio: '1/1',
              background: '#181a20',
              borderRadius: '12px',
              border: '1.5px solid #23263a',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <img
                src={product?.images && Array.isArray(product.images) && product.images.length > 0 ?
                  getImageUrl(product.images[0]) : '/placeholder.jpg'}
                alt={product?.title || 'Product'}
                className="product-image"
                onError={handleImageError}
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  background: '#23263a',
                  transition: 'transform 0.5s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              />
              {/* Second image for hover effect */}
              {product?.images && Array.isArray(product.images) && product.images.length > 1 && (
                <img
                  src={getImageUrl(product.images[1])}
                  alt={`${product?.title || 'Product'} - alternate view`}
                  className={`product-image-hover ${isHovered ? 'visible' : ''}`}
                  onError={handleImageError}
                  loading="eager"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    background: '#23263a',
                    transition: 'transform 0.5s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                />
              )}
              {imageError && (
                <div className="fallback-image" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#23263a',
                  color: '#888',
                  borderRadius: '12px',
                }}>
                  <FaImage size={48} />
                  <span style={{ marginTop: 8, fontSize: 14 }}>No Image</span>
                </div>
              )}
            </div>
          )}
        </Link>

        {/* Quick Action Buttons */}
        <div className={`product-actions ${isHovered ? 'visible' : ''}`} style={{ gap: '10px', justifyContent: 'center' }}>
          <Link
            to={`/product/${product?._id}`}
            className="action-button quick-view"
            title="Quick View"
            style={{ borderRadius: '8px', background: '#23263a', color: '#00f2ff', border: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
          >
            <FaEye />
          </Link>
          <button
            onClick={addToCartHandler}
            disabled={(product?.stock || 0) === 0 || isAddedToCart}
            className={`action-button add-cart ${isAddedToCart ? 'added' : ''}`}
            title={isAddedToCart ? "Added to Cart" : "Add to Cart"}
            style={{ borderRadius: '8px', background: '#23263a', color: isAddedToCart ? '#00ff99' : '#ffaa00', border: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
          >
            {isAddedToCart ? <FaCheck /> : <FaShoppingCart />}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="product-details">
        {/* Category */}
        <div className="product-category">
          <Link to={`/search/${product?.category || 'all'}`} className="category-link">
            {product?.category || 'Category'}
          </Link>
        </div>

        {/* Title */}
        <Link to={`/product/${product?._id}`} className="product-title-link">
          <h2 className="product-title">
            {product?.title && product.title.length > 40
              ? `${product.title.substring(0, 40)}...`
              : product?.title || 'Product Name'
            }
          </h2>
        </Link>

        {/* Rating */}
        <div className="rating-container">
          <div className="stars">
            {renderRatingStars(product?.rating || 0)}
          </div>
          <span className="review-count">({product?.numReviews || 0})</span>
        </div>

        {/* Price */}
        <div className="price-container">
          <span className="current-price">{formatPrice(product?.price || 0)}</span>
          {discountPercentage > 0 && product?.mrp && (
            <span className="original-price">
              {formatPrice(product.mrp)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="product-meta">
          <span className={`stock-status ${(product?.stock || 0) > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {(product?.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
          {product?.brand && (
            <span className="brand">{product.brand}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={addToCartHandler}
          disabled={(product?.stock || 0) === 0 || isAddedToCart}
          className={`add-to-cart-button ${isAddedToCart ? 'added' : (product?.stock || 0) > 0 ? 'enabled' : 'disabled'}`}
        >
          {isAddedToCart ? (
            <>
              <FaCheck className="cart-icon" /> Added to Cart
            </>
          ) : (
            <>
              <FaShoppingCart className="cart-icon" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
