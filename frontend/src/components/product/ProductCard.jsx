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
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  // Check if product is already in cart
  useEffect(() => {
    const productInCart = cartItems.find(item => item._id === product._id);
    setIsAddedToCart(!!productInCart);
  }, [cartItems, product._id]);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty: 1,
      })
    );
    setIsAddedToCart(true);
    toast.success(`${product.title} added to cart!`);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted
      ? `${product.title} removed from wishlist!`
      : `${product.title} added to wishlist!`
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
    if (product.images && product.images.length > 0) {
      const preloadImages = () => {
        product.images.forEach((imgPath) => {
          const img = new Image();
          img.src = getImageUrl(imgPath);
        });
      };
      preloadImages();
    }
  }, [product.images]);

  // Calculate discount percentage
  const discountPercentage = ((product.mrp - product.price) / product.mrp) * 100;

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
      {product.discount > 0 && (
        <div className="discount-badge themed-badge">
          {discountPercentage.toFixed(0)}% OFF
        </div>
      )}

      {/* Featured Badge */}
      {product.featured && (
        <div className="featured-badge themed-badge" style={{
          top: product.discount > 0 ? '40px' : '10px',
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
              <p className="fallback-title">{product.title.length > 30
                ? `${product.title.substring(0, 30)}...`
                : product.title}
              </p>
              <p className="fallback-category">{product.category}</p>
            </div>
          ) : (
            <div className="image-wrapper">
              <img
                src={product.images && product.images.length > 0 ?
                  getImageUrl(product.images[0]) : '/placeholder.jpg'}
                alt={product.title}
                className="product-image"
                onError={handleImageError}
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  margin: 'auto',
                  padding: '15px',
                  transition: 'transform 0.5s ease'
                }}
              />
              {/* Second image for hover effect */}
              {product.images && product.images.length > 1 && (
                <img
                  src={getImageUrl(product.images[1])}
                  alt={`${product.title} - alternate view`}
                  className={`product-image-hover ${isHovered ? 'visible' : ''}`}
                  onError={handleImageError}
                  loading="eager"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    margin: 'auto',
                    padding: '15px',
                    transition: 'transform 0.5s ease'
                  }}
                />
              )}
            </div>
          )}
        </Link>

        {/* Quick Action Buttons */}
        <div className={`product-actions ${isHovered ? 'visible' : ''}`}>
          <Link
            to={`/product/${product._id}`}
            className="action-button quick-view"
            title="Quick View"
          >
            <FaEye />
          </Link>
          <button
            onClick={addToCartHandler}
            disabled={product.stock === 0 || isAddedToCart}
            className={`action-button add-cart ${isAddedToCart ? 'added' : ''}`}
            title={isAddedToCart ? "Added to Cart" : "Add to Cart"}
          >
            {isAddedToCart ? <FaCheck /> : <FaShoppingCart />}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="product-details">
        {/* Category */}
        <div className="product-category">
          <Link to={`/search/${product.category}`} className="category-link">
            {product.category}
          </Link>
        </div>

        {/* Title */}
        <Link to={`/product/${product._id}`} className="product-title-link">
          <h2 className="product-title">
            {product.title.length > 40
              ? `${product.title.substring(0, 40)}...`
              : product.title
            }
          </h2>
        </Link>

        {/* Rating */}
        <div className="rating-container">
          <div className="stars">
            {renderRatingStars(product.rating)}
          </div>
          <span className="review-count">({product.numReviews})</span>
        </div>

        {/* Price */}
        <div className="price-container">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.discount > 0 && (
            <span className="original-price">
              {formatPrice(product.mrp)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="product-meta">
          <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
          {product.brand && (
            <span className="brand">{product.brand}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={addToCartHandler}
          disabled={product.stock === 0 || isAddedToCart}
          className={`add-to-cart-button ${isAddedToCart ? 'added' : product.stock > 0 ? 'enabled' : 'disabled'}`}
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
