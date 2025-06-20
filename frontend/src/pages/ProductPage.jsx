import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  useGetProductDetailsQuery,
} from '../slices/services/productService';
import { addToCart } from '../slices/cartSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import Rating from '../components/ui/Rating';
import { FaArrowLeft, FaShoppingCart, FaRegHeart, FaImage } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import usePriceFormatter from '../hooks/usePriceFormatter';



const ProductPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, currentTheme } = useTheme();
  const { formatPrice } = usePriceFormatter();

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const {
    data: productResponse,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  // Extract product data from API response
  const product = productResponse?.data;

  useEffect(() => {
    // Validate product ID format
    if (productId && !/^[0-9a-fA-F]{24}$/.test(productId)) {
      console.error('Invalid product ID format:', productId);
      navigate('/shop');
      return;
    }

    if (error && (error.status === 404 || error.status === 'FETCH_ERROR' || error.data?.error?.toLowerCase().includes('not found'))) {
      navigate('/shop');
    }
  }, [error, navigate, productId]);

  const addToCartHandler = () => {
    if (!product) return;

    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Link to="/" className="flex items-center text-primary mb-4 hover:underline">
        <FaArrowLeft className="mr-1" /> Back to Products
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.error || error.error || 'An error occurred'}
        </Message>
      ) : !product ? (
        <Message variant="danger">Product not found</Message>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Product Images */}
            <div className="lg:col-span-1">
              <div className="rounded-lg shadow-md overflow-hidden mb-4" style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
                boxShadow: theme.shadow
              }}>
                {product?.images && product.images[activeImg] ? (
                  <img
                    src={product.images[activeImg]?.startsWith('http') ?
                      product.images[activeImg] :
                      product.images[activeImg]}
                    alt={product?.title || 'Product'}
                    className="w-full h-96 object-contain p-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-96 flex flex-col items-center justify-center p-4" style={{ backgroundColor: currentTheme === 'light' ? '#f8fafc' : '#1e293b' }}>
                    <FaImage size={50} color={currentTheme === 'light' ? '#cbd5e1' : '#475569'} />
                    <p style={{ color: theme.textLight, marginTop: '16px' }}>Image not available</p>
                  </div>
                )}
              </div>
              {product?.images && product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer border-2 rounded ${
                        activeImg === index
                          ? 'border-primary'
                          : 'border-transparent'
                      }`}
                      onClick={() => setActiveImg(index)}
                    >
                      <img
                        src={img?.startsWith('http') ? img : img}
                        alt={`${product?.title || 'Product'} - ${index}`}
                        className="w-20 h-20 object-contain p-2"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder.jpg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:col-span-1">
              <h1 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>
                {product?.title || 'Product Name'}
              </h1>
              <div className="mb-2 flex items-center">
                <Rating
                  value={product?.rating || 0}
                  text={`${product?.numReviews || 0} reviews`}
                />
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold" style={{ color: theme.primary }}>
                  {formatPrice(product?.price || 0)}
                </span>
                {(product?.discount || 0) > 0 && product?.mrp && (
                  <>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {formatPrice(product.mrp)}
                    </span>
                    <span className="ml-2 text-sm text-green-600">
                      {Math.round(
                        ((product.mrp - product.price) / product.mrp) * 100
                      )}
                      % off
                    </span>
                  </>
                )}
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>Description:</h3>
                <p style={{ color: theme.textLight }}>{product?.description || 'No description available'}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>Brand:</h3>
                <p style={{ color: theme.textLight }}>{product?.brand || 'Unknown'}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>Category:</h3>
                <p style={{ color: theme.textLight }}>{product?.category || 'Uncategorized'}</p>
              </div>
              {product?.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>Specifications:</h3>
                  <ul className="list-disc list-inside" style={{ color: theme.textLight }}>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <li key={key}>
                        <span className="font-medium" style={{ color: theme.text }}>{key}:</span> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Purchase Box & 3D Model */}
            <div className="lg:col-span-1">
              <div className="rounded-lg shadow-md p-4 mb-6" style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
                boxShadow: theme.shadow
              }}>
                <div className="mb-4 flex justify-between">
                  <div>
                    <span style={{ color: theme.textLight }}>Price:</span>
                  </div>
                  <div>
                    <span className="font-bold" style={{ color: theme.primary }}>{formatPrice(product?.price || 0)}</span>
                  </div>
                </div>

                <div className="mb-4 flex justify-between">
                  <div>
                    <span style={{ color: theme.textLight }}>Status:</span>
                  </div>
                  <div>
                    <span
                      style={{
                        color: (product?.stock || 0) > 0 ? '#10b981' : '#ef4444'
                      }}
                    >
                      {(product?.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {(product?.stock || 0) > 0 && (
                  <div className="mb-4 flex justify-between">
                    <div>
                      <span className="text-gray-400">Qty:</span>
                    </div>
                    <div>
                      <select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="border rounded p-1 text-black"
                      >
                        {[...Array(Math.min(product?.stock || 1, 10)).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                )}

                <button
                  className="w-full flex items-center justify-center mb-2 font-bold py-2 px-4 rounded transition-colors"
                  disabled={(product?.stock || 0) === 0}
                  onClick={addToCartHandler}
                  style={{
                    backgroundColor: (product?.stock || 0) > 0 ? theme.buttonPrimary : theme.border,
                    color: (product?.stock || 0) > 0 ? theme.buttonText : theme.textLight,
                    boxShadow: theme.shadow
                  }}
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>

                <button
                  className="w-full font-bold py-2 px-4 rounded transition-colors flex items-center justify-center"
                  style={{
                    backgroundColor: 'transparent',
                    color: theme.primary,
                    border: `1px solid ${theme.primary}`
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = theme.primary;
                    e.currentTarget.style.color = theme.buttonText;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = theme.primary;
                  }}
                >
                  <FaRegHeart className="mr-2" /> Add to Wishlist
                </button>
              </div>


            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
