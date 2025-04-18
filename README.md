# Amazer - E-Commerce Platform

Amazer is a full-stack e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). It features a modern, responsive UI with 3D product visualization using Three.js.

## Features

- **User Authentication**: Secure JWT-based authentication with role-based access control
- **Product Management**: Admin panel for managing products, including image uploads
- **Shopping Cart**: Add/remove items, adjust quantities
- **Checkout Process**: Shipping, payment, and order placement
- **Order Management**: View order history, track order status
- **Product Reviews**: Leave reviews and ratings for products
- **3D Product Visualization**: Interactive 3D product icons using Three.js
- **Responsive Design**: Mobile-friendly interface using TailwindCSS

## Tech Stack

### Frontend
- React
- Redux Toolkit & RTK Query
- React Router
- TailwindCSS
- Three.js & React Three Fiber
- React Toastify

### Backend
- Node.js
- Express
- MongoDB & Mongoose
- JWT Authentication
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/amazer.git
cd amazer
```

2. Install backend dependencies
```
cd backend
npm install
```

3. Install frontend dependencies
```
cd ../frontend
npm install
```

4. Set up environment variables
   - Create a `.env` file in the backend directory
   - Add the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   COOKIE_EXPIRE=30
   ```

5. Seed the database (optional)
```
cd backend
node seeder.js -a
```

### Running the Application

1. Start the backend server
```
cd backend
npm run dev
```

2. Start the frontend development server
```
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## API Routes

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get logged-in user info
- `GET /api/auth/verify-admin` - Check if user is admin

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - View single product
- `GET /api/products/search?q=` - Search product by text
- `POST /api/products` - Add new product (Admin)
- `PUT /api/products/:id` - Edit product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Place new order
- `GET /api/orders/my-orders` - View user orders
- `GET /api/orders` - View all orders (Admin)
- `PUT /api/orders/:id` - Update order status (Admin)

### Reviews
- `POST /api/reviews/:productId` - Add review
- `GET /api/reviews/:productId` - Fetch product reviews

### File Upload
- `POST /api/upload` - Upload product image (Admin)

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/)
