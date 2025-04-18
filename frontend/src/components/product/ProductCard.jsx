import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaEye } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';
import { toast } from 'react-toastify';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty: 1,
      })
    );
    toast.success(`${product.title} added to cart!`);
  };

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
    <div className="product-card">
      {product.discount > 0 && (
        <div className="discount-badge">
          {discountPercentage.toFixed(0)}% OFF
        </div>
      )}

      <div className="product-image-container">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images[0]}
            alt={product.title}
            className="product-image"
          />
        </Link>
        <div className="image-overlay">
          <Link
            to={`/product/${product._id}`}
            className="quick-view-button"
          >
            <FaEye />
          </Link>
        </div>
      </div>

      <div className="product-details">
        <div className="rating-container">
          {renderRatingStars(product.rating)}
          <span className="review-count">({product.numReviews})</span>
        </div>

        <Link to={`/product/${product._id}`}>
          <h2 className="product-title">
            {product.title}
          </h2>
        </Link>

        <div className="price-container">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="original-price">
              ${product.mrp.toFixed(2)}
            </span>
          )}
        </div>

        <div className="product-meta">
          <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
          <span className="brand">{product.brand}</span>
        </div>

        <button
          onClick={addToCartHandler}
          disabled={product.stock === 0}
          className={`add-to-cart-button ${product.stock > 0 ? 'enabled' : 'disabled'}`}
        >
          <FaShoppingCart className="cart-icon" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
