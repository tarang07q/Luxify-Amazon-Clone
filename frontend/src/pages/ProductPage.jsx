import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetProductDetailsQuery,
} from '../slices/services/productService';
import { addToCart } from '../slices/cartSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import Rating from '../components/ui/Rating';
import ProductReviews from '../components/product/ProductReviews';
import { FaArrowLeft, FaShoppingCart, FaRegHeart, FaImage, FaBox } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import usePriceFormatter from '../hooks/usePriceFormatter';
import ProductBox3D from '../components/3d/ProductBox3D';



const ProductPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, currentTheme } = useTheme();
  const { formatPrice } = usePriceFormatter();

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const { user } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  useEffect(() => {
    if (error && (error.status === 404 || error.status === 'FETCH_ERROR' || error.data?.error?.toLowerCase().includes('not found'))) {
      navigate('/');
    }
  }, [error, navigate]);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product.data,
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
                {product.data.images && product.data.images[activeImg] ? (
                  <img
                    src={product.data.images[activeImg]?.startsWith('http') ?
                      product.data.images[activeImg] :
                      product.data.images[activeImg]}
                    alt={product.data.title}
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
              {product.data.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.data.images.map((img, index) => (
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
                        alt={`${product.data.title} - ${index}`}
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
                {product.data.title}
              </h1>
              <div className="mb-2 flex items-center">
                <Rating
                  value={product.data.rating}
                  text={`${product.data.numReviews} reviews`}
                />
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold" style={{ color: theme.primary }}>
                  {formatPrice(product.data.price)}
                </span>
                {product.data.discount > 0 && (
                  <>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {formatPrice(product.data.mrp)}
                    </span>
                    <span className="ml-2 text-sm text-green-600">
                      {Math.round(
                        ((product.data.mrp - product.data.price) / product.data.mrp) * 100
                      )}
                      % off
                    </span>
                  </>
                )}
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>Description:</h3>
                <p style={{ color: theme.textLight }}>{product.data.description}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>Brand:</h3>
                <p style={{ color: theme.textLight }}>{product.data.brand}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>Category:</h3>
                <p style={{ color: theme.textLight }}>{product.data.category}</p>
              </div>
              {Object.keys(product.data.specifications).length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>Specifications:</h3>
                  <ul className="list-disc list-inside" style={{ color: theme.textLight }}>
                    {Object.entries(product.data.specifications).map(([key, value]) => (
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
                    <span className="font-bold" style={{ color: theme.primary }}>{formatPrice(product.data.price)}</span>
                  </div>
                </div>

                <div className="mb-4 flex justify-between">
                  <div>
                    <span style={{ color: theme.textLight }}>Status:</span>
                  </div>
                  <div>
                    <span
                      style={{
                        color: product.data.stock > 0 ? '#10b981' : '#ef4444'
                      }}
                    >
                      {product.data.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {product.data.stock > 0 && (
                  <div className="mb-4 flex justify-between">
                    <div>
                      <span className="text-gray-700">Qty:</span>
                    </div>
                    <div>
                      <select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="border rounded p-1"
                      >
                        {[...Array(Math.min(product.data.stock, 10)).keys()].map(
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
                  disabled={product.data.stock === 0}
                  onClick={addToCartHandler}
                  style={{
                    backgroundColor: product.data.stock > 0 ? theme.buttonPrimary : theme.border,
                    color: product.data.stock > 0 ? theme.buttonText : theme.textLight,
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

              {/* 3D Product Box Viewer */}
              <div className="rounded-lg shadow-md p-4 mb-6" style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
                boxShadow: theme.shadow
              }}>
                <h3 className="text-lg font-semibold mb-2 text-center" style={{ color: theme.text }}>
                  3D Product View
                </h3>
                <div className="flex justify-center items-center h-64 rounded-md" style={{
                  backgroundColor: 'transparent',
                  backgroundImage: `radial-gradient(circle, ${currentTheme === 'light' ? '#f8fafc, #e2e8f0' : '#1e293b, #0f172a'})`,
                }}>
                  <ProductBox3D
                    size={240}
                    color={currentTheme === 'dark' ? '#ff00e4' : '#f0338d'}
                    floatingAnimation={true}
                    glowEffect={true}
                    icon={<FaBox size={60} />}
                  />
                </div>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Interactive 3D product visualization
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <ProductReviews productId={productId} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
