import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import {
  FaStar,
  FaRegStar,
  FaThumbsUp,
  FaThumbsDown,
  FaFlag,
  FaTrash,
  FaCheckCircle,
  FaUser,
  FaCalendarAlt
} from 'react-icons/fa';
import Loader from '../ui/Loader';

const ProductReviews = ({ productId, canReview = false }) => {
  const { theme } = useTheme();
  const { user } = useSelector((state) => state.auth);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    text: ''
  });
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!reviewForm.title.trim() || !reviewForm.text.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/reviews/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(reviewForm),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      toast.success('Review submitted successfully!');
      setShowReviewForm(false);
      setReviewForm({ rating: 5, title: '', text: '' });

      // Refresh reviews
      fetchReviews();
    } catch (error) {
      toast.error(error.message || 'Failed to submit review');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= rating;
      const StarIcon = isFilled ? FaStar : FaRegStar;

      stars.push(
        <button
          key={i}
          type={interactive ? 'button' : undefined}
          onClick={interactive ? () => onRatingChange(i) : undefined}
          className={interactive ? 'hover:scale-110 transition-transform' : ''}
          disabled={!interactive}
        >
          <StarIcon
            style={{
              color: isFilled ? '#fbbf24' : '#d1d5db',
              cursor: interactive ? 'pointer' : 'default'
            }}
          />
        </button>
      );
    }

    return <div className="flex items-center gap-1">{stars}</div>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="rounded-lg shadow-lg p-6" style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`
      }}>
        <h3 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
          Customer Reviews
        </h3>

        <div className="text-center">
          <div className="text-4xl font-bold mb-2" style={{ color: theme.text }}>
            4.5
          </div>
          <div className="mb-2">
            {renderStars(5)}
          </div>
          <p style={{ color: theme.textLight }}>
            Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>
      </div>

      {/* Write Review Button */}
      {canReview && user && (
        <div className="text-center">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-6 py-3 rounded-lg font-medium"
            style={{
              backgroundColor: theme.primary,
              color: '#ffffff'
            }}
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <div className="rounded-lg shadow-lg p-6" style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`
        }}>
          <h4 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
            Write Your Review
          </h4>

          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
                Rating
              </label>
              {renderStars(reviewForm.rating, true, (rating) =>
                setReviewForm(prev => ({ ...prev, rating }))
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
                Review Title
              </label>
              <input
                type="text"
                value={reviewForm.title}
                onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Summarize your experience"
                className="w-full px-3 py-2 rounded-lg border"
                style={{
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: theme.inputBorder
                }}
                required
              />
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
                Your Review
              </label>
              <textarea
                value={reviewForm.text}
                onChange={(e) => setReviewForm(prev => ({ ...prev, text: e.target.value }))}
                placeholder="Tell others about your experience with this product"
                rows={4}
                className="w-full px-3 py-2 rounded-lg border"
                style={{
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: theme.inputBorder
                }}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 rounded-lg font-medium"
              style={{
                backgroundColor: theme.primary,
                color: '#ffffff',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              {isLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <p style={{ color: theme.textLight }}>
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-lg shadow p-6"
              style={{
                backgroundColor: theme.cardBg,
                border: `1px solid ${theme.border}`
              }}
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: theme.primary }}>
                    <FaUser style={{ color: '#ffffff' }} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-semibold" style={{ color: theme.text }}>
                        {review.user?.name || 'Anonymous'}
                      </h5>
                      {review.verified && (
                        <FaCheckCircle style={{ color: '#10b981' }} title="Verified Purchase" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: theme.textLight }}>
                      <FaCalendarAlt size={12} />
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating and Title */}
              <div className="mb-3">
                <div className="flex items-center gap-3 mb-2">
                  {renderStars(review.rating)}
                  <h4 className="font-semibold" style={{ color: theme.text }}>
                    {review.title}
                  </h4>
                </div>
              </div>

              {/* Review Text */}
              <p className="mb-4" style={{ color: theme.text }}>
                {review.text}
              </p>

              {/* Review Actions */}
              <div className="flex items-center gap-4 pt-3 border-t" style={{ borderColor: theme.border }}>
                <button
                  className="flex items-center gap-2 text-sm hover:underline"
                  style={{ color: theme.textLight }}
                >
                  <FaThumbsUp size={14} />
                  Helpful (0)
                </button>

                <button
                  className="flex items-center gap-2 text-sm hover:underline"
                  style={{ color: theme.textLight }}
                >
                  <FaThumbsDown size={14} />
                  Not Helpful
                </button>

                <button
                  className="flex items-center gap-2 text-sm hover:underline"
                  style={{ color: theme.textLight }}
                >
                  <FaFlag size={14} />
                  Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
