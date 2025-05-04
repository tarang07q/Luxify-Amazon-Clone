/**
 * This utility maps product categories to relevant image URLs
 * Used to ensure product images are relevant to their categories
 */

const categoryImageMap = {
  // Electronics
  'Electronics': [
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
    'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&q=80',
    'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=800&q=80',
    'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=800&q=80',
    'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80'
  ],
  
  // Computers
  'Computers': [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80',
    'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=800&q=80',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
    'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80'
  ],
  
  // Smart Home
  'Smart Home': [
    'https://images.unsplash.com/photo-1558002038-bb0237f4e204?w=800&q=80',
    'https://images.unsplash.com/photo-1581267852212-25b0be9bf629?w=800&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
    'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80'
  ],
  
  // Home & Kitchen
  'Home & Kitchen': [
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
    'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80'
  ],
  
  // Clothing
  'Clothing': [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
    'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800&q=80',
    'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&q=80'
  ],
  
  // Beauty & Personal Care
  'Beauty & Personal Care': [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80'
  ],
  
  // Books
  'Books': [
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80',
    'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&q=80',
    'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=800&q=80'
  ],
  
  // Toys & Games
  'Toys & Games': [
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80',
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80',
    'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&q=80',
    'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=800&q=80'
  ],
  
  // Sports & Outdoors
  'Sports & Outdoors': [
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80'
  ],
  
  // Grocery & Gourmet Food
  'Grocery & Gourmet Food': [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    'https://images.unsplash.com/photo-1543168256-418811576931?w=800&q=80',
    'https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=800&q=80',
    'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800&q=80',
    'https://images.unsplash.com/photo-1616645258469-ec681c17f3ee?w=800&q=80'
  ],
  
  // Pet Supplies
  'Pet Supplies': [
    'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=800&q=80',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80',
    'https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?w=800&q=80',
    'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=800&q=80',
    'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80'
  ],
  
  // Automotive
  'Automotive': [
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'
  ],
  
  // Tools & Home Improvement
  'Tools & Home Improvement': [
    'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=800&q=80',
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80',
    'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80',
    'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80'
  ],
  
  // Health & Household
  'Health & Household': [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80',
    'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&q=80',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80'
  ],
  
  // Office Products
  'Office Products': [
    'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&q=80',
    'https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=800&q=80',
    'https://images.unsplash.com/photo-1519219788971-8d9797e0928e?w=800&q=80',
    'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&q=80',
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80'
  ],
  
  // Gift Cards
  'Gift Cards': [
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
    'https://images.unsplash.com/photo-1561715276-a2d087060f1d?w=800&q=80',
    'https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?w=800&q=80',
    'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&q=80',
    'https://images.unsplash.com/photo-1607344645866-009c320c5ab0?w=800&q=80'
  ]
};

/**
 * Get a random image URL for a specific category
 * @param {string} category - The product category
 * @returns {string} - A relevant image URL for the category
 */
export const getRandomCategoryImage = (category) => {
  // If category exists in our map
  if (categoryImageMap[category]) {
    const images = categoryImageMap[category];
    return images[Math.floor(Math.random() * images.length)];
  }
  
  // Default fallback images for unknown categories
  const defaultImages = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80'
  ];
  
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
};

export default categoryImageMap;
