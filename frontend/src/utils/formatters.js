/**
 * Utility functions for formatting data
 */

/**
 * Format a price with currency symbol
 * This is a fallback function when the currency context is not available
 * @param {number} price - The price to format
 * @param {string} currency - The currency symbol (default: $)
 * @returns {string} Formatted price with currency symbol
 */
export const formatPrice = (price, currency = '$') => {
  return `${currency}${parseFloat(price).toFixed(2)}`;
};

/**
 * Format a date to a readable string
 * @param {string|Date} date - The date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(dateObj);
};

/**
 * Truncate text to a specified length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
