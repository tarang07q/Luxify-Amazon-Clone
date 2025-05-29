import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaStar,
  FaDollarSign,
  FaTag,
  FaSort,
  FaGrid,
  FaList
} from 'react-icons/fa';

const AdvancedSearch = ({ onFiltersChange, totalResults = 0 }) => {
  const { theme, currentTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    brand: '',
    inStock: false,
    featured: false,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Categories for filter dropdown
  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Books',
    'Sports & Outdoors',
    'Beauty & Personal Care',
    'Automotive',
    'Toys & Games'
  ];

  // Sort options
  const sortOptions = [
    { value: 'createdAt', label: 'Newest First', order: 'desc' },
    { value: 'createdAt', label: 'Oldest First', order: 'asc' },
    { value: 'price', label: 'Price: Low to High', order: 'asc' },
    { value: 'price', label: 'Price: High to Low', order: 'desc' },
    { value: 'rating', label: 'Highest Rated', order: 'desc' },
    { value: 'numReviews', label: 'Most Reviewed', order: 'desc' },
    { value: 'title', label: 'Name: A to Z', order: 'asc' },
    { value: 'title', label: 'Name: Z to A', order: 'desc' }
  ];

  // Parse URL parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = {
      search: params.get('search') || '',
      category: params.get('category') || '',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
      rating: params.get('rating') || '',
      brand: params.get('brand') || '',
      inStock: params.get('inStock') === 'true',
      featured: params.get('featured') === 'true',
      sortBy: params.get('sortBy') || 'createdAt',
      sortOrder: params.get('sortOrder') || 'desc'
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  }, [location.search]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURL(newFilters);
    onFiltersChange(newFilters);
  };

  const updateURL = (newFilters) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== '' && value !== false) {
        params.set(key, value);
      }
    });

    const newURL = `${location.pathname}?${params.toString()}`;
    navigate(newURL, { replace: true });
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      brand: '',
      inStock: false,
      featured: false,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    };
    setFilters(clearedFilters);
    navigate(location.pathname, { replace: true });
    onFiltersChange(clearedFilters);
  };

  const handleSortChange = (sortOption) => {
    handleFilterChange('sortBy', sortOption.value);
    handleFilterChange('sortOrder', sortOption.order);
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'sortBy' || key === 'sortOrder') return false;
    return value && value !== '' && value !== false;
  }).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch style={{ color: theme.textLight }} />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:outline-none"
          style={{
            backgroundColor: theme.inputBg,
            color: theme.text,
            borderColor: theme.inputBorder,
            focusRingColor: theme.primary
          }}
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 rounded-lg border transition-colors"
            style={{
              backgroundColor: showFilters ? theme.primary : theme.cardBg,
              color: showFilters ? '#ffffff' : theme.text,
              borderColor: theme.border
            }}
          >
            <FaFilter className="mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 px-2 py-1 text-xs rounded-full" style={{
                backgroundColor: showFilters ? 'rgba(255,255,255,0.2)' : theme.primary,
                color: showFilters ? '#ffffff' : '#ffffff'
              }}>
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: theme.textLight }}>
              {totalResults} results
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              const sortOption = { value: sortBy, order: sortOrder };
              handleSortChange(sortOption);
            }}
            className="px-3 py-2 rounded-lg border"
            style={{
              backgroundColor: theme.inputBg,
              color: theme.text,
              borderColor: theme.inputBorder
            }}
          >
            {sortOptions.map((option, index) => (
              <option key={index} value={`${option.value}-${option.order}`}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex rounded-lg border" style={{ borderColor: theme.border }}>
            <button
              onClick={() => setViewMode('grid')}
              className="p-2 transition-colors"
              style={{
                backgroundColor: viewMode === 'grid' ? theme.primary : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : theme.text
              }}
            >
              <FaGrid />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className="p-2 transition-colors"
              style={{
                backgroundColor: viewMode === 'list' ? theme.primary : 'transparent',
                color: viewMode === 'list' ? '#ffffff' : theme.text
              }}
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="p-6 rounded-lg border" style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border"
                style={{
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: theme.inputBorder
                }}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme.inputBg,
                    color: theme.text,
                    borderColor: theme.inputBorder
                  }}
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme.inputBg,
                    color: theme.text,
                    borderColor: theme.inputBorder
                  }}
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
                Minimum Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border"
                style={{
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: theme.inputBorder
                }}
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
                <option value="1">1+ Stars</option>
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
                Brand
              </label>
              <input
                type="text"
                placeholder="Enter brand name"
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border"
                style={{
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: theme.inputBorder
                }}
              />
            </div>
          </div>

          {/* Checkbox Filters */}
          <div className="mt-6 flex flex-wrap gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                className="mr-2"
              />
              <span style={{ color: theme.text }}>In Stock Only</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.featured}
                onChange={(e) => handleFilterChange('featured', e.target.checked)}
                className="mr-2"
              />
              <span style={{ color: theme.text }}>Featured Products</span>
            </label>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-6 pt-6 border-t" style={{ borderColor: theme.border }}>
              <button
                onClick={clearFilters}
                className="flex items-center px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                <FaTimes className="mr-2" />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
