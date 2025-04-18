import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useGetProductReviewsQuery,
} from '../slices/services/productService';
import { addToCart } from '../slices/cartSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import Rating from '../components/ui/Rating';
import { FaArrowLeft, FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls } from '@react-three/drei';

// 3D Product Model Component
const ProductModel = ({ color = '#ff9900' }) => {
  // This is a placeholder - in a real app, you'd use an actual model based on the product
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const ProductPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [activeImg, setActiveImg] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const { data: reviews, isLoading: reviewsLoading } = useGetProductReviewsQuery(
    productId
  );

  const [createReview, { isLoading: loadingReview }] = useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product.data,
        qty,
      })
    );
    navigate('/cart');
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        reviewData: {
          rating,
          title: comment.substring(0, 50),
          text: comment,
        },
      }).unwrap();
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
      setShowReviewForm(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.error || err.error || 'An error occurred');
    }
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
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                <img
                  src={product.data.images[activeImg]}
                  alt={product.data.title}
                  className="w-full h-96 object-contain"
                />
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
                        src={img}
                        alt={`${product.data.title} - ${index}`}
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:col-span-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {product.data.title}
              </h1>
              <div className="mb-2 flex items-center">
                <Rating
                  value={product.data.rating}
                  text={`${product.data.numReviews} reviews`}
                />
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-800">
                  ${product.data.price.toFixed(2)}
                </span>
                {product.data.discount > 0 && (
                  <>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${product.data.mrp.toFixed(2)}
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
                <h3 className="text-lg font-semibold mb-2">Description:</h3>
                <p className="text-gray-700">{product.data.description}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Brand:</h3>
                <p className="text-gray-700">{product.data.brand}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Category:</h3>
                <p className="text-gray-700">{product.data.category}</p>
              </div>
              {Object.keys(product.data.specifications).length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Specifications:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {Object.entries(product.data.specifications).map(([key, value]) => (
                      <li key={key}>
                        <span className="font-medium">{key}:</span> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Purchase Box & 3D Model */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="mb-4 flex justify-between">
                  <div>
                    <span className="text-gray-700">Price:</span>
                  </div>
                  <div>
                    <span className="font-bold">${product.data.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-4 flex justify-between">
                  <div>
                    <span className="text-gray-700">Status:</span>
                  </div>
                  <div>
                    <span
                      className={
                        product.data.stock > 0 ? 'text-green-600' : 'text-red-600'
                      }
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
                  className="w-full btn-primary flex items-center justify-center mb-2"
                  disabled={product.data.stock === 0}
                  onClick={addToCartHandler}
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>

                <button className="w-full border border-primary text-primary hover:bg-primary hover:text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center">
                  <FaRegHeart className="mr-2" /> Add to Wishlist
                </button>
              </div>

              {/* 3D Model Viewer */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2 text-center">
                  3D Product View
                </h3>
                <div className="h-64 bg-gray-100 rounded-md">
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <PresentationControls
                      global
                      zoom={0.8}
                      rotation={[0, 0, 0]}
                      polar={[-Math.PI / 4, Math.PI / 4]}
                      azimuth={[-Math.PI / 4, Math.PI / 4]}
                    >
                      <ProductModel color={product.data.category === 'Electronics' ? '#3498db' : '#ff9900'} />
                    </PresentationControls>
                    <OrbitControls enableZoom={false} />
                  </Canvas>
                </div>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Drag to rotate the model
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {reviewsLoading ? (
              <Loader />
            ) : reviews?.data?.length === 0 ? (
              <Message>No Reviews Yet</Message>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {reviews?.data?.map((review) => (
                  <div key={review._id} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-between mb-2">
                      <strong>{review.user.name}</strong>
                      <span className="text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Rating value={review.rating} />
                    <h4 className="font-semibold mt-2">{review.title}</h4>
                    <p className="mt-1">{review.text}</p>
                  </div>
                ))}
              </div>
            )}

            {user ? (
              <div className="mt-4">
                {!showReviewForm ? (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="btn-primary"
                  >
                    Write a Review
                  </button>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-xl font-bold mb-4">Write a Review</h3>
                    <form onSubmit={submitReviewHandler}>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Rating</label>
                        <select
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                          className="input-field"
                          required
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Comment</label>
                        <textarea
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="input-field"
                          required
                        ></textarea>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="submit"
                          className="btn-primary"
                          disabled={loadingReview}
                        >
                          {loadingReview ? <Loader size="small" /> : 'Submit'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <Message>
                Please <Link to="/login" className="text-primary hover:underline">sign in</Link> to write a review
              </Message>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
