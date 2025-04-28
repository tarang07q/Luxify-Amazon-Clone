import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaStar, FaStarHalfAlt, FaRegStar, FaUser, FaCalendarAlt } from 'react-icons/fa';
import CubeIcon from '../3d/CubeIcon';
import { useTheme } from '../../context/ThemeContext';
import './ProductReviews.css';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/reviews/${productId}`);
        
        if (!response.ok) {
          // If the API returns 404, we'll just show an empty reviews list
          if (response.status === 404) {
            setReviews([]);
            setLoading(false);
            return;
          }
          throw new Error('Failed to fetch reviews');
        }
        
        const data = await response.json();
        setReviews(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message);
        setLoading(false);
        // Don't show error toast for 404 - just show empty reviews
        if (!err.message.includes('404')) {
          toast.error('Failed to load reviews. Please try again later.');
        }
      }
    };

    fetchReviews();
  }, [productId]);

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    
    if (!userInfo) {
      toast.error('Please sign in to leave a review');
      return;
    }
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    try {
      const response = await fetch(`/api/reviews/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          title: reviewTitle,
          text: reviewText,
          rating,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit review');
      }
      
      // Reset form
      setReviewTitle('');
      setReviewText('');
      setRating(0);
      
      // Refresh reviews
      const updatedResponse = await fetch(`/api/reviews/${productId}`);
      const updatedData = await updatedResponse.json();
      setReviews(updatedData.data || []);
      
      toast.success('Review submitted successfully!');
    } catch (err) {
      console.error('Error submitting review:', err);
      toast.error(err.message || 'Failed to submit review. Please try again.');
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          if (rating >= ratingValue) {
            return <FaStar key={index} className="text-yellow-500" />;
          } else if (rating >= ratingValue - 0.5) {
            return <FaStarHalfAlt key={index} className="text-yellow-500" />;
          } else {
            return <FaRegStar key={index} className="text-yellow-500" />;
          }
        })}
      </div>
    );
  };

  return (
    <div className="product-reviews-container" style={{ backgroundColor: theme.cardBg, boxShadow: theme.shadow }}>
      <div className="reviews-header">
        <div className="flex items-center">
          <div style={{ width: '50px', height: '50px', marginRight: '10px' }}>
            <CubeIcon iconType="user" size={50} autoRotate={true} color={theme.accent} />
          </div>
          <h2 className="reviews-title" style={{ color: theme.text }}>Customer Reviews</h2>
        </div>
        <div className="reviews-summary">
          {reviews.length > 0 ? (
            <p style={{ color: theme.textLight }}>
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} | Average rating: {
                (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
              }
            </p>
          ) : (
            <p style={{ color: theme.textLight }}>No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>

      {userInfo && (
        <div className="review-form-container" style={{ borderColor: theme.border }}>
          <h3 className="review-form-title" style={{ color: theme.text }}>Write a Review</h3>
          <form onSubmit={submitReviewHandler} className="review-form">
            <div className="form-group">
              <label htmlFor="rating" style={{ color: theme.text }}>Rating</label>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        style={{ display: 'none' }}
                      />
                      <FaStar
                        className="star"
                        color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                        size={24}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                        style={{ cursor: 'pointer' }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="title" style={{ color: theme.text }}>Title</label>
              <input
                type="text"
                id="title"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                required
                style={{ 
                  backgroundColor: theme.inputBg, 
                  color: theme.text,
                  borderColor: theme.inputBorder
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="text" style={{ color: theme.text }}>Review</label>
              <textarea
                id="text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                style={{ 
                  backgroundColor: theme.inputBg, 
                  color: theme.text,
                  borderColor: theme.inputBorder
                }}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="submit-review-btn"
              style={{
                backgroundColor: theme.primary,
                color: theme.buttonText
              }}
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      <div className="reviews-list">
        {loading ? (
          <p className="loading-text" style={{ color: theme.textLight }}>Loading reviews...</p>
        ) : error ? (
          <p className="error-text" style={{ color: theme.error }}>Error: {error}</p>
        ) : reviews.length === 0 ? (
          <p className="no-reviews-text" style={{ color: theme.textLight }}>No reviews yet for this product.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-item" style={{ borderColor: theme.border }}>
              <div className="review-header">
                <div className="review-user">
                  <FaUser style={{ color: theme.primary }} />
                  <span style={{ color: theme.text }}>{review.user ? review.user.name : 'Anonymous'}</span>
                </div>
                <div className="review-date">
                  <FaCalendarAlt style={{ color: theme.textLight }} />
                  <span style={{ color: theme.textLight }}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="review-rating">
                {renderStars(review.rating)}
                <span className="review-rating-text" style={{ color: theme.text }}>
                  {review.rating.toFixed(1)}
                </span>
              </div>
              <h4 className="review-title" style={{ color: theme.text }}>{review.title}</h4>
              <p className="review-text" style={{ color: theme.textLight }}>{review.text}</p>
            </div>
          ))
        )}
      </div>

      {!userInfo && (
        <div className="login-prompt" style={{ backgroundColor: theme.cardHoverBg }}>
          <p style={{ color: theme.text }}>Please <a href="/login" style={{ color: theme.primary }}>sign in</a> to leave a review.</p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
