import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/services/productService';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import { useTheme } from '../../context/ThemeContext';
import { FaArrowLeft, FaUpload, FaTrash, FaPlus } from 'react-icons/fa';

const ProductCreatePage = () => {
  const navigate = useNavigate();
  const { theme, currentTheme } = useTheme();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [mrp, setMrp] = useState(0);
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

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log('Upload response:', res);
      toast.success('Image uploaded successfully');

      // Check if the response has the expected structure
      if (res.image) {
        setImage(res.image);
        setImages([...images, res.image]);
      } else if (res.data && res.data.filePath) {
        setImage(res.data.filePath);
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

  const removeImageHandler = (imageToRemove) => {
    setImages(images.filter((img) => img !== imageToRemove));
  };

  const addSpecificationHandler = () => {
    if (specKey.trim() && specValue.trim()) {
      setSpecifications({
        ...specifications,
        [specKey.trim()]: specValue.trim(),
      });
      setSpecKey('');
      setSpecValue('');
    } else {
      toast.error('Please enter both key and value for specification');
    }
  };

  const removeSpecificationHandler = (key) => {
    const updatedSpecs = { ...specifications };
    delete updatedSpecs[key];
    setSpecifications(updatedSpecs);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !description || !brand || !category || images.length === 0) {
      toast.error('Please fill all required fields and add at least one image');
      return;
    }

    // Calculate discount if MRP and price are provided
    const calculatedDiscount = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;

    try {
      const result = await createProduct({
        title,
        price: Number(price),
        mrp: Number(mrp),
        discount: calculatedDiscount,
        brand,
        category,
        subCategory,
        stock: Number(stock),
        description,
        images,
        specifications,
        deliveryAvailable,
        featured,
      }).unwrap();

      toast.success('Product created successfully');
      navigate(`/admin/product/${result.data._id}/edit`);
    } catch (err) {
      toast.error(err?.data?.error || err.error || 'An error occurred');
    }
  };

  const categories = [
    'Electronics',
    'Computers',
    'Smart Home',
    'Home & Kitchen',
    'Books',
    'Fashion',
    'Beauty & Personal Care',
    'Sports & Outdoors',
    'Toys & Games',
    'Automotive',
    'Health & Household',
    'Other'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg shadow-md p-6" style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
        boxShadow: theme.shadow
      }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/admin/products" style={{ color: theme.primary }} className="hover:opacity-80 mr-4">
              <FaArrowLeft /> Back to Products
            </Link>
            <h1 className="text-2xl font-bold" style={{ color: theme.text }}>Create New Product</h1>
          </div>
        </div>

        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <div className="p-4 rounded-lg mb-6" style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.inputBg,
                borderColor: theme.border
              }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>Basic Information</h2>
                <div className="mb-4">
                  <label htmlFor="title" className="block font-medium mb-2" style={{ color: theme.text }}>
                    Product Title <span style={{ color: theme.error }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="input-field"
                    placeholder="Enter product title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{
                      backgroundColor: theme.inputBg,
                      borderColor: theme.inputBorder,
                      color: theme.text
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block font-medium mb-2" style={{ color: theme.text }}>
                    Description <span style={{ color: theme.error }}>*</span>
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="input-field"
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{
                      backgroundColor: theme.inputBg,
                      borderColor: theme.inputBorder,
                      color: theme.text
                    }}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label htmlFor="brand" className="block font-medium mb-2" style={{ color: theme.text }}>
                      Brand <span style={{ color: theme.error }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="brand"
                      className="input-field"
                      placeholder="Enter brand name"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                      style={{
                        backgroundColor: theme.inputBg,
                        borderColor: theme.inputBorder,
                        color: theme.text
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="category" className="block font-medium mb-2" style={{ color: theme.text }}>
                      Category <span style={{ color: theme.error }}>*</span>
                    </label>
                    <select
                      id="category"
                      className="input-field"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      style={{
                        backgroundColor: theme.inputBg,
                        borderColor: theme.inputBorder,
                        color: theme.text
                      }}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="subCategory" className="block font-medium mb-2" style={{ color: theme.text }}>
                    Sub Category
                  </label>
                  <input
                    type="text"
                    id="subCategory"
                    className="input-field"
                    placeholder="Enter sub category (optional)"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    style={{
                      backgroundColor: theme.inputBg,
                      borderColor: theme.inputBorder,
                      color: theme.text
                    }}
                  />
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="p-4 rounded-lg mb-6" style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.inputBg,
                borderColor: theme.border
              }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>Pricing & Inventory</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="mb-4">
                    <label htmlFor="price" className="block font-medium mb-2" style={{ color: theme.text }}>
                      Selling Price <span style={{ color: theme.error }}>*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center" style={{ color: theme.textLight }}>
                        $
                      </span>
                      <input
                        type="number"
                        id="price"
                        className="input-field pl-8"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                        style={{
                          backgroundColor: theme.inputBg,
                          borderColor: theme.inputBorder,
                          color: theme.text
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="mrp" className="block font-medium mb-2" style={{ color: theme.text }}>
                      MRP <span style={{ color: theme.error }}>*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center" style={{ color: theme.textLight }}>
                        $
                      </span>
                      <input
                        type="number"
                        id="mrp"
                        className="input-field pl-8"
                        placeholder="0.00"
                        value={mrp}
                        onChange={(e) => setMrp(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                        style={{
                          backgroundColor: theme.inputBg,
                          borderColor: theme.inputBorder,
                          color: theme.text
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="stock" className="block font-medium mb-2" style={{ color: theme.text }}>
                      Stock <span style={{ color: theme.error }}>*</span>
                    </label>
                    <input
                      type="number"
                      id="stock"
                      className="input-field"
                      placeholder="0"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      min="0"
                      required
                      style={{
                        backgroundColor: theme.inputBg,
                        borderColor: theme.inputBorder,
                        color: theme.text
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="deliveryAvailable"
                      className="mr-2"
                      checked={deliveryAvailable}
                      onChange={(e) => setDeliveryAvailable(e.target.checked)}
                      style={{
                        accentColor: currentTheme === 'dark' ? theme.primary : theme.primary
                      }}
                    />
                    <label htmlFor="deliveryAvailable" style={{ color: theme.text }}>
                      Delivery Available
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      className="mr-2"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      style={{
                        accentColor: currentTheme === 'dark' ? theme.primary : theme.primary
                      }}
                    />
                    <label htmlFor="featured" style={{ color: theme.text }}>
                      Featured Product
                    </label>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="p-4 rounded-lg" style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.inputBg,
                borderColor: theme.border
              }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>Specifications</h2>

                {Object.keys(specifications).length > 0 && (
                  <div className="mb-4 p-3 rounded border" style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'white',
                    borderColor: theme.border
                  }}>
                    <h3 className="font-medium mb-2" style={{ color: theme.text }}>Current Specifications:</h3>
                    <div className="space-y-2">
                      {Object.entries(specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-2 rounded" style={{
                          backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.inputBg
                        }}>
                          <div style={{ color: theme.text }}>
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSpecificationHandler(key)}
                            style={{ color: theme.error }}
                            className="hover:opacity-80"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Key (e.g. Color)"
                    className="input-field"
                    value={specKey}
                    onChange={(e) => setSpecKey(e.target.value)}
                    style={{
                      backgroundColor: theme.inputBg,
                      borderColor: theme.inputBorder,
                      color: theme.text
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. Blue)"
                    className="input-field"
                    value={specValue}
                    onChange={(e) => setSpecValue(e.target.value)}
                    style={{
                      backgroundColor: theme.inputBg,
                      borderColor: theme.inputBorder,
                      color: theme.text
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={addSpecificationHandler}
                  className="px-3 py-1 rounded flex items-center"
                  style={{
                    backgroundColor: theme.secondary,
                    color: theme.buttonText
                  }}
                >
                  <FaPlus className="mr-1" /> Add Specification
                </button>
              </div>
            </div>

            {/* Images */}
            <div className="md:col-span-1">
              <div className="p-4 rounded-lg" style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.inputBg,
                borderColor: theme.border
              }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>Product Images</h2>

                <div className="mb-4">
                  <label className="block font-medium mb-2" style={{ color: theme.text }}>
                    Upload Images <span style={{ color: theme.error }}>*</span>
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-opacity-50" style={{
                      backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : theme.inputBg,
                      borderColor: theme.border
                    }}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaUpload className="w-8 h-8 mb-3" style={{ color: theme.textLight }} />
                        <p className="mb-2 text-sm" style={{ color: theme.textLight }}>
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs" style={{ color: theme.textLight }}>PNG, JPG or JPEG (MAX. 2MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={uploadFileHandler}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  {loadingUpload && <Loader />}
                </div>

                {images.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-medium mb-2" style={{ color: theme.text }}>Product Images:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img.startsWith('/uploads/') ? `http://localhost:5000${img}` : img}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                            style={{ borderColor: theme.border }}
                            onError={(e) => {
                              console.error("Image failed to load:", e.target.src);
                              e.target.onerror = null;
                              e.target.src = '/placeholder.jpg';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removeImageHandler(img)}
                            className="absolute top-1 right-1 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: theme.error, color: 'white' }}
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="btn-primary"
              disabled={loadingCreate || loadingUpload}
              style={{
                backgroundColor: theme.buttonPrimary,
                color: theme.buttonText,
                opacity: (loadingCreate || loadingUpload) ? 0.7 : 1
              }}
            >
              {loadingCreate ? <Loader size="small" /> : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCreatePage;
