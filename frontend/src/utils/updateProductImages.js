import { getRandomCategoryImage } from './categoryImageMap';

/**
 * Utility function to update product images based on their category
 * This can be used in the admin panel to quickly assign relevant images to products
 * 
 * @param {Object} product - The product object to update
 * @param {number} imageCount - Number of images to generate (default: 2)
 * @returns {Array} - Array of image URLs
 */
export const generateRelevantProductImages = (product, imageCount = 2) => {
  if (!product || !product.category) {
    return [];
  }
  
  const images = [];
  
  // Generate the specified number of images
  for (let i = 0; i < imageCount; i++) {
    const imageUrl = getRandomCategoryImage(product.category);
    
    // Avoid duplicate images
    if (!images.includes(imageUrl)) {
      images.push(imageUrl);
    } else {
      // Try again if we got a duplicate
      i--;
    }
  }
  
  return images;
};

/**
 * Utility function to update a batch of products with relevant images
 * 
 * @param {Array} products - Array of product objects
 * @param {number} imageCount - Number of images per product (default: 2)
 * @returns {Array} - Updated products array
 */
export const updateBatchProductImages = (products, imageCount = 2) => {
  if (!products || !Array.isArray(products)) {
    return [];
  }
  
  return products.map(product => {
    const updatedProduct = { ...product };
    updatedProduct.images = generateRelevantProductImages(product, imageCount);
    return updatedProduct;
  });
};

export default {
  generateRelevantProductImages,
  updateBatchProductImages
};
