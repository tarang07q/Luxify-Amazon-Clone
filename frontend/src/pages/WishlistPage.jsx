import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
  useMoveToCartMutation
} from '../slices/services/wishlistService';
import { addToCart } from '../slices/cartSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import { useTheme } from '../context/ThemeContext';
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaEye,
  FaStar,
  FaRegStar,
  FaShare,
  FaTimes,
  FaBoxOpen
} from 'react-icons/fa';

const WishlistPage = () => {
  const { theme, currentTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);

  const { data: wishlist, isLoading, error, refetch } = useGetWishlistQuery();
  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();
  const [clearWishlist, { isLoading: isClearing }] = useClearWishlistMutation();
  const [moveToCart] = useMoveToCartMutation();

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromWishlist(productId).unwrap();
      toast.success('Item removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item from wishlist');
    }
  };

  const handleClearWishlist = async () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      try {
        await clearWishlist().unwrap();
        toast.success('Wishlist cleared');
      } catch (error) {
        toast.error('Failed to clear wishlist');
      }
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      stock: product.stock,
      quantity: 1
    }));
    toast.success('Added to cart');
  };

  const handleMoveToCart = async (productId) => {
    try {
      await moveToCart({ productId, quantity: 1 }).unwrap();
      handleAddToCart(wishlist.data.items.find(item => item.product._id === productId).product);
      toast.success('Moved to cart');
    } catch (error) {
      toast.error('Failed to move to cart');
    }
  };

  const handleSelectItem = (productId) => {
    setSelectedItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === wishlist?.data?.items?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlist?.data?.items?.map(item => item.product._id) || []);
    }
  };

  const handleBulkAddToCart = () => {
    selectedItems.forEach(productId => {
      const item = wishlist.data.items.find(item => item.product._id === productId);
      if (item) {
        handleAddToCart(item.product);
      }
    });
    setSelectedItems([]);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} style={{ color: '#fbbf24' }} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" style={{ color: '#fbbf24', opacity: 0.5 }} />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} style={{ color: '#d1d5db' }} />);
    }

    return stars;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <Message variant="danger">
        Failed to load wishlist. Please try again.
      </Message>
    );
  }

  const wishlistItems = wishlist?.data?.items || [];

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: theme.background }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center" style={{ color: theme.text }}>
              <FaHeart className="mr-3" style={{ color: '#ef4444' }} />
              My Wishlist
            </h1>
            <p style={{ color: theme.textLight }} className="mt-2">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={handleSelectAll}
                className="px-4 py-2 rounded-lg font-medium"
                style={{
                  backgroundColor: theme.cardBg,
                  color: theme.text,
                  border: `1px solid ${theme.border}`
                }}
              >
                {selectedItems.length === wishlistItems.length ? 'Deselect All' : 'Select All'}
              </button>

              {selectedItems.length > 0 && (
                <button
                  onClick={handleBulkAddToCart}
                  className="px-4 py-2 rounded-lg font-medium flex items-center"
                  style={{
                    backgroundColor: theme.primary,
                    color: '#ffffff'
                  }}
                >
                  <FaShoppingCart className="mr-2" />
                  Add Selected to Cart ({selectedItems.length})
                </button>
              )}

              <button
                onClick={handleClearWishlist}
                disabled={isClearing}
                className="px-4 py-2 rounded-lg font-medium flex items-center"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                <FaTimes className="mr-2" />
                {isClearing ? 'Clearing...' : 'Clear All'}
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6">
              <FaBoxOpen size={80} style={{ color: theme.textLight, margin: '0 auto' }} />
            </div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: theme.text }}>
              Your wishlist is empty
            </h2>
            <p className="mb-6" style={{ color: theme.textLight }}>
              Save items you love to your wishlist and shop them later
            </p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 rounded-lg font-medium"
              style={{
                backgroundColor: theme.primary,
                color: '#ffffff'
              }}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.product._id}
                className="rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
                style={{
                  backgroundColor: theme.cardBg,
                  border: `1px solid ${theme.border}`
                }}
              >
                {/* Selection Checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.product._id)}
                    onChange={() => handleSelectItem(item.product._id)}
                    className="w-4 h-4 rounded"
                  />
                </div>

                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.product.images[0] || '/placeholder-image.jpg'}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      disabled={isRemoving}
                      className="p-2 rounded-full transition-colors"
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.9)',
                        color: '#ffffff'
                      }}
                    >
                      <FaTrash size={12} />
                    </button>

                    <Link
                      to={`/product/${item.product._id}`}
                      className="p-2 rounded-full transition-colors"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: '#ffffff'
                      }}
                    >
                      <FaEye size={12} />
                    </Link>
                  </div>

                  {/* Discount Badge */}
                  {item.product.discount > 0 && (
                    <div className="absolute bottom-3 left-3 px-2 py-1 rounded text-xs font-bold"
                         style={{ backgroundColor: '#ef4444', color: '#ffffff' }}>
                      {Math.round(((item.product.mrp - item.product.price) / item.product.mrp) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2" style={{ color: theme.text }}>
                    {item.product.title}
                  </h3>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
                      {renderStars(item.product.rating || 0)}
                    </div>
                    <span className="text-sm" style={{ color: theme.textLight }}>
                      ({item.product.numReviews || 0})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold" style={{ color: theme.text }}>
                        ${item.product.price}
                      </span>
                      {item.product.mrp > item.product.price && (
                        <span className="text-sm line-through ml-2" style={{ color: theme.textLight }}>
                          ${item.product.mrp}
                        </span>
                      )}
                    </div>

                    <span className="text-sm" style={{
                      color: item.product.stock > 0 ? '#10b981' : '#ef4444'
                    }}>
                      {item.product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Added Date */}
                  <p className="text-xs mb-3" style={{ color: theme.textLight }}>
                    Added {new Date(item.addedAt).toLocaleDateString()}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMoveToCart(item.product._id)}
                      disabled={item.product.stock === 0}
                      className="flex-1 py-2 px-3 rounded-lg font-medium flex items-center justify-center"
                      style={{
                        backgroundColor: item.product.stock > 0 ? theme.primary : theme.cardHoverBg,
                        color: item.product.stock > 0 ? '#ffffff' : theme.textLight,
                        opacity: item.product.stock > 0 ? 1 : 0.6
                      }}
                    >
                      <FaShoppingCart className="mr-2" size={14} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
