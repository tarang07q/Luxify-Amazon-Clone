import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/services/productService';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import { FaArrowLeft, FaUpload, FaTrash } from 'react-icons/fa';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [mrp, setMrp] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState({});
  const [deliveryAvailable, setDeliveryAvailable] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setTitle(product.data.title);
      setPrice(product.data.price);
      setMrp(product.data.mrp);
      setDiscount(product.data.discount);
      setImages(product.data.images);
      setBrand(product.data.brand);
      setCategory(product.data.category);
      setSubCategory(product.data.subCategory || '');
      setStock(product.data.stock);
      setDescription(product.data.description);
      setSpecifications(product.data.specifications || {});
      setDeliveryAvailable(product.data.deliveryAvailable);
      setFeatured(product.data.featured);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Calculate discount if MRP and price are provided
    const calculatedDiscount = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;

    try {
      await updateProduct({
        productId,
        productData: {
          title,
          price,
          mrp,
          discount: calculatedDiscount,
          brand,
          category,
          subCategory,
          stock,
          description,
          images,
          specifications,
          deliveryAvailable,
          featured,
        },
      }).unwrap();
      toast.success('Product updated successfully');
      refetch();
      navigate('/admin/products');
    } catch (err) {
      toast.error(err?.data?.error || err.error || 'An error occurred');
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log('Upload response:', res);
      toast.success('Image uploaded successfully');

      // Check if the response has the expected structure
      if (res.image) {
        setImages([...images, res.image]);
      } else if (res.data && res.data.filePath) {
        setImages([...images, res.data.filePath]);
      } else {
        toast.warning('Image uploaded but path not returned correctly');
        console.error('Unexpected response format:', res);
      }
    } catch (err) {
      console.error('Upload error:', err);
      toast.error(err?.data?.error || err.error || 'An error occurred during upload');
    }
  };

  const removeImageHandler = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const addSpecificationHandler = () => {
    if (specKey.trim() && specValue.trim()) {
      setSpecifications({
        ...specifications,
        [specKey]: specValue,
      });
      setSpecKey('');
      setSpecValue('');
    }
  };

  const removeSpecificationHandler = (key) => {
    const updatedSpecs = { ...specifications };
    delete updatedSpecs[key];
    setSpecifications(updatedSpecs);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Link to="/admin/products" className="flex items-center text-primary hover:underline mr-4">
          <FaArrowLeft className="mr-1" /> Back to Products
        </Link>
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.error || error.error || 'An error occurred'}
        </Message>
      ) : (
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="input-field"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="brand" className="block text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    className="input-field"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="block text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    className="input-field"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="subCategory" className="block text-gray-700 mb-1">
                    Sub Category
                  </label>
                  <input
                    type="text"
                    id="subCategory"
                    className="input-field"
                    placeholder="Enter sub category (optional)"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="price" className="block text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      className="input-field"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="mrp" className="block text-gray-700 mb-1">
                      MRP
                    </label>
                    <input
                      type="number"
                      id="mrp"
                      className="input-field"
                      placeholder="Enter MRP"
                      value={mrp}
                      onChange={(e) => setMrp(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="stock" className="block text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    className="input-field"
                    placeholder="Enter stock"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="input-field"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    id="deliveryAvailable"
                    className="mr-2"
                    checked={deliveryAvailable}
                    onChange={(e) => setDeliveryAvailable(e.target.checked)}
                  />
                  <label htmlFor="deliveryAvailable" className="text-gray-700">
                    Delivery Available
                  </label>
                </div>

                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    className="mr-2"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  <label htmlFor="featured" className="text-gray-700">
                    Featured Product
                  </label>
                </div>
            </div>

            <div>
              <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Images</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                    {images.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-contain border rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImageHandler(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <label className="flex flex-col items-center px-4 py-2 bg-white text-primary rounded-lg shadow-lg border border-primary cursor-pointer hover:bg-primary hover:text-white">
                      <FaUpload className="mr-2" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        onChange={uploadFileHandler}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                    {loadingUpload && <Loader size="small" className="ml-2" />}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Specifications</label>
                  <div className="bg-gray-50 p-4 rounded-lg mb-2">
                    {Object.keys(specifications).length === 0 ? (
                      <p className="text-gray-500 text-sm">No specifications added yet</p>
                    ) : (
                      <ul className="space-y-2">
                        {Object.entries(specifications).map(([key, value]) => (
                          <li key={key} className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{key}:</span> {value}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeSpecificationHandler(key)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash size={14} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Key (e.g. Color)"
                      className="input-field"
                      value={specKey}
                      onChange={(e) => setSpecKey(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. Blue)"
                      className="input-field"
                      value={specValue}
                      onChange={(e) => setSpecValue(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addSpecificationHandler}
                    className="bg-secondary text-white px-3 py-1 rounded hover:bg-secondary-light"
                  >
                    Add Specification
                  </button>
                </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="btn-primary"
              disabled={loadingUpdate}
            >
              {loadingUpdate ? <Loader size="small" /> : 'Update Product'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductEditPage;
