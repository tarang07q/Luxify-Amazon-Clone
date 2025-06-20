# 🛍️ Luxify - Premium E-commerce Platform

A full-stack, production-ready e-commerce platform built with modern technologies. Luxify offers a complete shopping experience with advanced features like real-time order tracking, Stripe payment processing, product reviews, wishlist management, and comprehensive admin analytics.

## ✨ Features

### 🛒 **Core E-commerce Features**
- **Product Catalog**: Browse 100+ products with advanced search and filtering
- **Shopping Cart**: Add, remove, and manage items with real-time updates
- **Secure Checkout**: Stripe payment integration with multiple payment methods
- **Order Management**: Real-time order tracking with status updates
- **User Authentication**: JWT-based secure authentication system

### 🎯 **Advanced Features**
- **Product Reviews & Ratings**: Verified purchase reviews with helpful voting
- **Wishlist Management**: Save products for later with priority settings
- **Email Notifications**: Automated emails for orders, shipping, and account updates
- **Admin Analytics**: Comprehensive dashboard with sales insights and charts
- **Mobile Responsive**: Optimized for all devices and screen sizes

### 🎨 **User Experience**
- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **3D Icons**: Interactive 3D elements using Three.js
- **Advanced Search**: Filter by category, price, rating, and more
- **Real-time Updates**: Live cart updates and order status changes

### 🔐 **Security & Performance**
- **Rate Limiting**: Protection against spam and abuse
- **Data Validation**: Comprehensive input validation and sanitization
- **Security Headers**: CORS, XSS protection, and security best practices
- **Docker Support**: Containerized deployment with Docker Compose

## 🚀 Tech Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **Redux Toolkit** - State management with RTK Query
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics and animations
- **Chart.js** - Data visualization for analytics
- **Stripe Elements** - Secure payment processing

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Token authentication
- **Stripe API** - Payment processing
- **Nodemailer** - Email notifications
- **Multer** - File upload handling

### **DevOps & Tools**
- **Docker** - Containerization
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📦 Installation

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### **Quick Start**

1. **Clone the repository**
```bash
git clone https://github.com/tarang07q/Luxify-Amazon-Clone.git
cd Luxify-Amazon-Clone
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Setup**
```bash
# Backend environment
cd backend
cp .env.example .env
# Edit .env with your configuration

# Frontend environment
cd ../frontend
cp .env.example .env
# Edit .env with your configuration
```

4. **Database Setup**
```bash
# Start MongoDB service
# Then seed the database
cd backend
npm run seed
```

5. **Start Development Servers**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

6. **Access the Application**
- Frontend: http://localhost:3004
- Backend API: http://localhost:5000

## 🌍 Deployment Guide

### 🚀 Vercel Deployment (Recommended)
1. **Connect your GitHub repository to Vercel** ([vercel.com](https://vercel.com)).
2. **Set the following in Vercel project settings:**
   - **Root Directory:** `./`
   - **Build Command:** `cd frontend && npm run build`
   - **Output Directory:** `frontend/dist`
   - **Environment Variables:** Add all required backend and frontend variables (see below).
3. **Deploy:** Vercel will build and deploy both frontend and backend (see `vercel.json` for routing/API config).

### 🌐 Netlify Deployment (Frontend Only)
1. **Build the frontend locally:**
   ```sh
   npm run build --prefix frontend
   ```
2. **Set Netlify Publish Directory:**
   - Use `frontend/dist` as the publish directory in Netlify site settings.
3. **Add SPA Redirects:**
   - In `frontend/public/`, create a file named `_redirects` with:
     ```
     /*    /index.html   200
     ```
   - This ensures React Router works and prevents 404 errors on refresh.
4. **Deploy:** Drag and drop the `frontend/dist` folder in Netlify UI or connect your repo and set the build command to `npm run build` and publish directory to `frontend/dist`.

### 🐳 Docker Compose (Full Stack)
- See the `docker-compose.yml` for running MongoDB, backend, and frontend together.
- Use `docker-compose up -d` from the project root.

### 🔑 Environment Variables
- **Backend:** See `.env.example` in `backend/` and deployment guides for required variables (MongoDB URI, JWT secret, Stripe keys, etc).
- **Frontend:** See `.env.example` in `frontend/` (API URL, Stripe publishable key, etc).
- **Set these in your deployment platform's environment settings.**

### 🛠️ Troubleshooting
- **Netlify 404 Errors:**
  - Ensure `_redirects` file is present in `frontend/public/`.
  - Confirm `index.html` is in `frontend/dist` after build.
  - Set publish directory to `frontend/dist`.
- **Vercel API Issues:**
  - Check `vercel.json` for correct API routing.
  - Set all environment variables in Vercel dashboard.
- **General:**
  - Check build logs for errors.
  - Make sure all dependencies are installed and up to date.

For advanced deployment, monitoring, and troubleshooting, see `DEPLOYMENT.md` and `DEPLOYMENT_GUIDE.md`.

## 🐳 Docker Deployment

### **Using Docker Compose**
```bash
# Clone and navigate to project
git clone https://github.com/tarang07q/Luxify-Amazon-Clone.git
cd Luxify-Amazon-Clone

# Create environment file
cp .env.example .env
# Edit .env with your configuration

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost
# Backend: http://localhost:5000
```

## 🧪 Testing

### **Backend Tests**
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage
```

## 📊 API Documentation

### **Authentication Endpoints**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### **Product Endpoints**
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### **Order Endpoints**
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (Admin)

### **Payment Endpoints**
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `POST /api/payments/webhook` - Stripe webhook

### **Wishlist Endpoints**
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/add` - Add item to wishlist
- `DELETE /api/wishlist/remove/:productId` - Remove from wishlist

### **Analytics Endpoints** (Admin)
- `GET /api/analytics` - Get dashboard analytics
- `GET /api/analytics/revenue` - Revenue chart data
- `GET /api/analytics/top-products` - Top selling products

## 🔧 Configuration

### **Environment Variables**

#### **Backend (.env)**
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/luxify
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CLIENT_URL=http://localhost:3004
```

#### **Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

## 🏗️ Project Structure

```
Luxify-Amazon-Clone/
├── backend/
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── scripts/           # Database seeding scripts
│   ├── tests/             # Test files
│   ├── utils/             # Utility functions
│   └── server.js          # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── slices/        # Redux slices
│   │   ├── context/       # React context
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
├── docker-compose.yml     # Docker compose configuration
└── README.md             # Project documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Stripe** for payment processing
- **MongoDB** for database solutions
- **React** team for the amazing framework
- **Node.js** community for the runtime environment

---

**Made with ❤️ by the Luxify Team**
