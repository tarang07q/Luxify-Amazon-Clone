import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  useGetProductsQuery, 
  useUpdateProductMutation 
} from '../../slices/services/productService';
import Loader from '../ui/Loader';
import Message from '../ui/Message';
import { useTheme } from '../../context/ThemeContext';
import { FaStar, FaRegStar, FaSearch, FaFilter, FaSave } from 'react-icons/fa';

const FeaturedProductsManager = () => {
  const { theme, currentTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Get all products
  const { 
    data: productsData, 
    isLoading, 
    error, 
    refetch 
  } = useGetProductsQuery({ limit: 200 });

  const [updateProduct] = useUpdateProductMutation();

  // Extract unique categories from products
  useEffect(() => {
    if (productsData && productsData.data) {
      const uniqueCategories = [...new Set(productsData.data.map(product => product.category))];
      setCategories(uniqueCategories);
    }
  }, [productsData]);

  // Initialize selected products with current featured products
  useEffect(() => {
    if (productsData && productsData.data) {
      const featuredProductIds = productsData.data
        .filter(product => product.featured)
        .map(product => product._id);
      setSelectedProducts(featuredProductIds);
    }
  }, [productsData]);

  // Filter products based on search term and category
  const filteredProducts = productsData?.data?.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  // Toggle product selection
  const toggleProductSelection = (productId) => {
    setSelectedProducts(prevSelected => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter(id => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  // Save featured products
  const saveFeaturedProducts = async () => {
    setIsSaving(true);
    try {
      // Get all products that need to be updated (both to feature and unfeature)
      const productsToUpdate = productsData.data.filter(product => {
        const isSelected = selectedProducts.includes(product._id);
        return isSelected !== product.featured; // Only update if the status has changed
      });

      // Update each product
      const updatePromises = productsToUpdate.map(product => {
        const isSelected = selectedProducts.includes(product._id);
        return updateProduct({
          productId: product._id,
          productData: {
            ...product,
            featured: isSelected
          }
        }).unwrap();
      });

      await Promise.all(updatePromises);
      toast.success(`Successfully updated ${productsToUpdate.length} products`);
      refetch();
    } catch (err) {
      toast.error(err?.data?.error || err.error || 'An error occurred while updating featured products');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="featured-products-manager">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2" style={{ color: theme.text }}>
          Manage Featured Products
        </h2>
        <p style={{ color: theme.textLight }}>
          Select products to feature on the homepage. Featured products will be displayed prominently to users.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 pl-10 rounded-lg"
            style={{
              backgroundColor: theme.inputBg,
              borderColor: theme.inputBorder,
              color: theme.text
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch style={{ color: theme.textLight }} />
          </div>
        </div>
        
        <div className="relative">
          <select
            className="w-full md:w-48 px-4 py-2 pl-10 rounded-lg appearance-none"
            style={{
              backgroundColor: theme.inputBg,
              borderColor: theme.inputBorder,
              color: theme.text
            }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaFilter style={{ color: theme.textLight }} />
          </div>
        </div>
        
        <button
          className="px-4 py-2 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: theme.buttonPrimary,
            color: theme.buttonText
          }}
          onClick={saveFeaturedProducts}
          disabled={isSaving}
        >
          {isSaving ? (
            <Loader size="small" />
          ) : (
            <>
              <FaSave className="mr-2" /> Save Changes
            </>
          )}
        </button>
      </div>

      {/* Selected Count */}
      <div className="mb-4 p-3 rounded-lg" style={{
        backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(80, 70, 229, 0.1)',
        borderColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)',
      }}>
        <p style={{ color: theme.text }}>
          <span className="font-bold">{selectedProducts.length}</span> products selected as featured
        </p>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.error || error.error || 'An error occurred'}
        </Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div 
              key={product._id} 
              className="p-4 rounded-lg cursor-pointer transition-all"
              style={{
                backgroundColor: selectedProducts.includes(product._id) 
                  ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(80, 70, 229, 0.1)')
                  : theme.cardBg,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: selectedProducts.includes(product._id)
                  ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : 'rgba(80, 70, 229, 0.3)')
                  : theme.border,
                boxShadow: theme.shadow
              }}
              onClick={() => toggleProductSelection(product._id)}
            >
              <div className="flex items-start">
                <div className="h-16 w-16 flex-shrink-0 mr-4">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-full w-full object-cover rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium" style={{ color: theme.text }}>
                      {product.title}
                    </h3>
                    {selectedProducts.includes(product._id) ? (
                      <FaStar style={{ color: '#FFD700' }} />
                    ) : (
                      <FaRegStar style={{ color: theme.textLight }} />
                    )}
                  </div>
                  <p className="text-sm" style={{ color: theme.textLight }}>
                    {product.category} • ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProductsManager;
