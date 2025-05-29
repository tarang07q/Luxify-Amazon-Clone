const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/luxify-test';

describe('Product Endpoints', () => {
  let userToken;
  let adminToken;
  let userId;
  let adminId;
  let productId;

  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create regular user
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'user@example.com',
        password: 'password123'
      });

    userToken = userResponse.body.token;
    userId = userResponse.body.user.id;

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });
    await admin.save();

    const adminLoginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'password123'
      });

    adminToken = adminLoginResponse.body.token;
    adminId = adminLoginResponse.body.user.id;

    // Create a test product
    const product = new Product({
      title: 'Test Product',
      description: 'Test Description',
      price: 99.99,
      mrp: 129.99,
      brand: 'Test Brand',
      category: 'Electronics',
      stock: 10,
      user: adminId,
      images: ['test-image.jpg']
    });
    const savedProduct = await product.save();
    productId = savedProduct._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].title).toBe('Test Product');
    });

    it('should filter products by category', async () => {
      const response = await request(app)
        .get('/api/products?category=Electronics')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });

    it('should filter products by price range', async () => {
      const response = await request(app)
        .get('/api/products?minPrice=50&maxPrice=150')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });

    it('should search products by title', async () => {
      const response = await request(app)
        .get('/api/products?search=Test')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should get single product', async () => {
      const response = await request(app)
        .get(`/api/products/${productId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Test Product');
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/products/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/products', () => {
    it('should create product as admin', async () => {
      const productData = {
        title: 'New Product',
        description: 'New Description',
        price: 199.99,
        mrp: 249.99,
        brand: 'New Brand',
        category: 'Fashion',
        stock: 5,
        images: ['new-image.jpg']
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(productData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(productData.title);
    });

    it('should not create product as regular user', async () => {
      const productData = {
        title: 'New Product',
        description: 'New Description',
        price: 199.99,
        brand: 'New Brand',
        category: 'Fashion',
        stock: 5
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${userToken}`)
        .send(productData)
        .expect(403);

      expect(response.body.success).toBe(false);
    });

    it('should not create product without authentication', async () => {
      const productData = {
        title: 'New Product',
        description: 'New Description',
        price: 199.99,
        brand: 'New Brand',
        category: 'Fashion',
        stock: 5
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update product as admin', async () => {
      const updateData = {
        title: 'Updated Product',
        price: 149.99
      };

      const response = await request(app)
        .put(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
      expect(response.body.data.price).toBe(updateData.price);
    });

    it('should not update product as regular user', async () => {
      const updateData = {
        title: 'Updated Product',
        price: 149.99
      };

      const response = await request(app)
        .put(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateData)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete product as admin', async () => {
      const response = await request(app)
        .delete(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify product is deleted
      const getResponse = await request(app)
        .get(`/api/products/${productId}`)
        .expect(404);
    });

    it('should not delete product as regular user', async () => {
      const response = await request(app)
        .delete(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/products/:id/featured', () => {
    it('should toggle featured status as admin', async () => {
      const response = await request(app)
        .put(`/api/products/${productId}/featured`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ featured: true })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.featured).toBe(true);
    });

    it('should not toggle featured status as regular user', async () => {
      const response = await request(app)
        .put(`/api/products/${productId}/featured`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ featured: true })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });
});
