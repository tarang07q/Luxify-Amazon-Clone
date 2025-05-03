import { useCurrency } from '../context/CurrencyContext';
import { formatPrice as fallbackFormatPrice } from '../utils/formatters';

/**
 * Custom hook to format prices using the currency context
 * @returns {Object} Object containing formatting functions
 */
const usePriceFormatter = () => {
  const { formatPrice, convertPrice, currency } = useCurrency();

  /**
   * Format a price with the current currency
   * @param {number} price - The price to format
   * @returns {string} Formatted price with currency symbol
   */
  const formatPriceWithCurrency = (price) => {
    if (!price && price !== 0) return '';
    
    try {
      return formatPrice(price);
    } catch (error) {
      // Fallback to basic formatter if currency context is not available
      return fallbackFormatPrice(price, currency?.symbol || '$');
    }
  };

  /**
   * Convert a price to the current currency without formatting
   * @param {number} price - The price to convert
   * @returns {number} Converted price
   */
  const convertPriceOnly = (price) => {
    if (!price && price !== 0) return 0;
    
    try {
      return convertPrice(price);
    } catch (error) {
      return price;
    }
  };

  return {
    formatPrice: formatPriceWithCurrency,
    convertPrice: convertPriceOnly,
    currencyCode: currency?.code || 'USD',
    currencySymbol: currency?.symbol || '$'
  };
};

export default usePriceFormatter;
