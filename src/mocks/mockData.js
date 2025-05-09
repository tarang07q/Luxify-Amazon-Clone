// Mock product data
export const mockProducts = [
  {
    _id: '6815e506b6d1423a8e11ca66',
    title: 'Samsung Galaxy S21 Ultra 5G',
    description: 'The Samsung Galaxy S21 Ultra 5G is a high-end smartphone with a 6.8-inch Dynamic AMOLED 2X display, Exynos 2100 processor, and a quad-camera setup.',
    price: 1199.99,
    mrp: 1399.99,
    discount: 14,
    category: 'Electronics',
    brand: 'Samsung',
    stock: 25,
    rating: 4.7,
    numReviews: 124,
    featured: true,
    images: [
      '/uploads/electronics/electronics-3.jpg',
      '/uploads/electronics/electronics-4.jpg',
      '/uploads/electronics/electronics-5.jpg'
    ],
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Processor': 'Exynos 2100',
      'RAM': '12GB/16GB',
      'Storage': '128GB/256GB/512GB',
      'Battery': '5000mAh',
      'Camera': 'Quad 108MP + 10MP + 10MP + 12MP'
    }
  },
  {
    _id: '6815e506b6d1423a8e11ca67',
    title: 'Apple MacBook Pro 16-inch',
    description: 'The Apple MacBook Pro 16-inch features an M1 Pro chip, 16GB RAM, 512GB SSD, and a stunning Retina display.',
    price: 2399.99,
    mrp: 2499.99,
    discount: 4,
    category: 'Electronics',
    brand: 'Apple',
    stock: 15,
    rating: 4.9,
    numReviews: 87,
    featured: true,
    images: [
      '/uploads/electronics/electronics-1.jpg',
      '/uploads/electronics/electronics-2.jpg'
    ],
    specifications: {
      'Processor': 'Apple M1 Pro',
      'RAM': '16GB',
      'Storage': '512GB SSD',
      'Display': '16-inch Retina',
      'Battery': 'Up to 21 hours',
      'Weight': '2.1 kg'
    }
  },
  {
    _id: '6815e506b6d1423a8e11ca68',
    title: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
    description: 'Industry-leading noise cancellation with Dual Noise Sensor technology, 30-hour battery life, and touch sensor controls.',
    price: 349.99,
    mrp: 399.99,
    discount: 12,
    category: 'Electronics',
    brand: 'Sony',
    stock: 30,
    rating: 4.8,
    numReviews: 156,
    featured: false,
    images: [
      '/uploads/electronics/electronics-6.jpg',
      '/uploads/electronics/electronics-7.jpg'
    ],
    specifications: {
      'Type': 'Over-ear',
      'Connectivity': 'Bluetooth 5.0',
      'Battery Life': 'Up to 30 hours',
      'Noise Cancellation': 'Active',
      'Weight': '254g',
      'Charging': 'USB-C'
    }
  }
];

// Mock user data
export const mockUsers = [
  {
    _id: '60d0fe4f5311236168a109ca',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user'
  },
  {
    _id: '60d0fe4f5311236168a109cb',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  }
];
