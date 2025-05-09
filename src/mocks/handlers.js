import { rest } from 'msw';
import { mockProducts } from './mockData';

// Mock API handlers
export const handlers = [
  // Get all products
  rest.get('/api/products', (req, res, ctx) => {
    const keyword = req.url.searchParams.get('q') || '';
    const category = req.url.searchParams.get('category') || '';
    const featured = req.url.searchParams.get('featured') === 'true';

    let filteredProducts = [...mockProducts];

    // Filter by keyword
    if (keyword) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(keyword.toLowerCase()) ||
        product.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter featured products
    if (featured) {
      filteredProducts = filteredProducts.filter(product => product.featured);
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        count: filteredProducts.length,
        data: filteredProducts
      })
    );
  }),

  // Get product by ID
  rest.get('/api/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const product = mockProducts.find(p => p._id === id);

    if (!product) {
      return res(
        ctx.status(404),
        ctx.json({
          success: false,
          error: 'Product not found'
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: product
      })
    );
  }),

  // Create order
  rest.post('/api/orders', (req, res, ctx) => {
    const orderData = req.body;

    // Generate a random order ID
    const orderId = Math.random().toString(36).substring(2, 15);

    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: {
          _id: orderId,
          ...orderData,
          user: req.body.user || '60d0fe4f5311236168a109ca',
          createdAt: new Date().toISOString(),
          status: 'Pending',
          isPaid: false
        }
      })
    );
  }),

  // Get order by ID
  rest.get('/api/orders/:id', (req, res, ctx) => {
    const { id } = req.params;

    console.log('Mock API: Fetching order with ID:', id);

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          _id: id,
          user: {
            _id: '60d0fe4f5311236168a109ca',
            name: 'John Doe',
            email: 'john@example.com'
          },
          orderItems: [
            {
              name: 'Samsung Galaxy S21 Ultra 5G',
              quantity: 2,
              image: '/uploads/electronics/electronics-3.jpg',
              price: 1199.99,
              product: '6815e506b6d1423a8e11ca66'
            }
          ],
          shippingAddress: {
            name: 'John Doe',
            phone: '555-123-4567',
            street: '123 Main St',
            city: 'Boston',
            state: 'Massachusetts',
            zipCode: '02108',
            country: 'United States'
          },
          paymentMethod: 'Cash on Delivery',
          taxPrice: 180.00,
          shippingPrice: 0.00,
          totalPrice: 2579.98,
          isPaid: false,
          status: 'Pending',
          createdAt: new Date().toISOString()
        }
      })
    );
  })
];
