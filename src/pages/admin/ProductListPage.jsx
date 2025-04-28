import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/services/productService';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import Paginate from '../../components/ui/Paginate';
import CubeIcon from '../../components/3d/CubeIcon';
import { useTheme } from '../../context/ThemeContext';
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
} from 'react-icons/fa';

const ProductListPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({
    pageNumber: currentPage,
    sort: `${sortDirection === 'desc' ? '-' : ''}${sortField}`,
  });

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
        toast.success('Product deleted successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.error || err.error || 'An error occurred');
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        const result = await createProduct({
          title: 'Sample Product',
          price: 0,
          mrp: 0,
          brand: 'Sample Brand',
          category: 'Sample Category',
          description: 'Sample Description',
          stock: 0,
          images: ['/uploads/sample.jpg'],
        }).unwrap();
        toast.success('Product created successfully');
        navigate(`/admin/product/${result.data._id}/edit`);
      } catch (err) {
        toast.error(err?.data?.error || err.error || 'An error occurred');
      }
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort />;
    return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    // This would typically involve calling the API with a search parameter
    toast.info('Search functionality would be implemented here');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <div style={{ width: '50px', height: '50px', marginRight: '10px' }}>
            <CubeIcon iconType="product" size={50} autoRotate={true} color={theme.primary} />
          </div>
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Products</h1>
        </div>
        <button
          onClick={createProductHandler}
          className="btn-primary flex items-center"
          disabled={loadingCreate}
          style={{
            backgroundColor: theme.primary,
            color: theme.buttonText,
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: theme.shadow
          }}
        >
          {loadingCreate ? (
            <Loader size="small" />
          ) : (
            <>
              <FaPlus className="mr-1" /> Create Product
            </>
          )}
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6" style={{ backgroundColor: theme.cardBg, boxShadow: theme.shadow }}>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  backgroundColor: theme.inputBg, 
                  color: theme.text,
                  borderColor: theme.inputBorder,
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: '0.375rem',
                  width: '100%'
                }}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
            </div>
          </div>
          <button 
            type="submit" 
            className="btn-primary"
            style={{
              backgroundColor: theme.primary,
              color: theme.buttonText,
              padding: '0.75rem 1.5rem',
              borderRadius: '0.375rem',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: theme.shadow
            }}
          >
            Search
          </button>
        </form>
      </div>

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.error || error.error || 'An error occurred'}
        </Message>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ backgroundColor: theme.cardBg, boxShadow: theme.shadow }}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200" style={{ borderColor: theme.border }}>
                <thead style={{ backgroundColor: theme.cardHoverBg }}>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('_id')}
                      style={{ color: theme.textLight }}
                    >
                      <div className="flex items-center">
                        ID {getSortIcon('_id')}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('title')}
                      style={{ color: theme.textLight }}
                    >
                      <div className="flex items-center">
                        Name {getSortIcon('title')}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('price')}
                      style={{ color: theme.textLight }}
                    >
                      <div className="flex items-center">
                        Price {getSortIcon('price')}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('category')}
                      style={{ color: theme.textLight }}
                    >
                      <div className="flex items-center">
                        Category {getSortIcon('category')}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('brand')}
                      style={{ color: theme.textLight }}
                    >
                      <div className="flex items-center">
                        Brand {getSortIcon('brand')}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('stock')}
                      style={{ color: theme.textLight }}
                    >
                      <div className="flex items-center">
                        Stock {getSortIcon('stock')}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ color: theme.textLight }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200" style={{ borderColor: theme.border }}>
                  {data.data.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50" style={{ ':hover': { backgroundColor: theme.cardHoverBg } }}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.textLight }}>
                        {product._id.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 object-cover rounded"
                              src={product.images[0]}
                              alt={product.title}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/placeholder.png';
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium" style={{ color: theme.text }}>
                              {product.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.textLight }}>
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.textLight }}>
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.textLight }}>
                        {product.brand}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          style={{
                            backgroundColor: product.stock === 0 
                              ? 'rgba(239, 68, 68, 0.1)' 
                              : product.stock < 5 
                              ? 'rgba(245, 158, 11, 0.1)' 
                              : 'rgba(16, 185, 129, 0.1)',
                            color: product.stock === 0 
                              ? theme.error 
                              : product.stock < 5 
                              ? theme.warning 
                              : theme.success,
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px'
                          }}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/admin/product/${product._id}/edit`}
                            className="text-blue-600 hover:text-blue-900"
                            style={{ color: theme.primary }}
                          >
                            <FaEdit size={18} />
                          </Link>
                          <button
                            onClick={() => deleteHandler(product._id)}
                            className="text-red-600 hover:text-red-900"
                            style={{ color: theme.error }}
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4">
            <Paginate
              pages={data.pages}
              page={data.page}
              isAdmin={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListPage;
