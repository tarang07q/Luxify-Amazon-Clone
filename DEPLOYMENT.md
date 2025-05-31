# 🚀 Luxify Deployment Guide

## Overview
This guide covers deploying the Luxify e-commerce application to Vercel with MongoDB Atlas.

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Vercel account
- Git repository

## 🔧 Environment Setup

### 1. MongoDB Atlas Setup
1. Create a MongoDB Atlas cluster
2. Create a database user
3. Whitelist your IP addresses (0.0.0.0/0 for production)
4. Get your connection string

### 2. Environment Variables

#### Backend (.env.production)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/luxify-production
JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters
FRONTEND_URL=https://your-domain.vercel.app
CORS_ORIGIN=https://your-domain.vercel.app
```

#### Frontend (.env.production)
```env
VITE_API_URL=https://your-domain.vercel.app/api
VITE_NODE_ENV=production
VITE_APP_NAME=Luxify
VITE_APP_VERSION=1.0.0
```

## 🚀 Deployment Steps

### Option 1: Automatic Deployment (Recommended)
1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Run Deployment Script**
   ```bash
   npm run deploy
   ```

### Option 2: Manual Deployment
1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

### Option 3: GitHub Integration
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## ⚙️ Vercel Configuration

### Environment Variables in Vercel Dashboard
Set these in your Vercel project settings:

**Backend Variables:**
- `NODE_ENV`: production
- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Your JWT secret key
- `FRONTEND_URL`: Your Vercel app URL
- `CORS_ORIGIN`: Your Vercel app URL

**Frontend Variables:**
- `VITE_API_URL`: Your Vercel app URL + /api
- `VITE_NODE_ENV`: production

## 🔍 Post-Deployment Checklist

### 1. Functionality Testing
- [ ] User registration and login
- [ ] Product browsing and search
- [ ] Shopping cart functionality
- [ ] Order placement
- [ ] Admin panel access
- [ ] Product management

### 2. Performance Testing
- [ ] Page load times
- [ ] API response times
- [ ] Image loading
- [ ] Mobile responsiveness

### 3. Security Testing
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Environment variables secure
- [ ] No sensitive data exposed

## 🛠️ Troubleshooting

### Common Issues

#### 1. Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check for TypeScript/ESLint errors

#### 2. Database Connection Issues
- Verify MongoDB Atlas connection string
- Check IP whitelist settings
- Ensure database user has proper permissions

#### 3. CORS Errors
- Update CORS_ORIGIN environment variable
- Check frontend API URL configuration

#### 4. Environment Variable Issues
- Verify all required variables are set
- Check variable names (case-sensitive)
- Restart deployment after changes

## 📊 Monitoring

### 1. Vercel Analytics
- Enable Vercel Analytics in dashboard
- Monitor page views and performance

### 2. Application Monitoring
- Check `/health` endpoint regularly
- Monitor API response times
- Track error rates

### 3. Database Monitoring
- Monitor MongoDB Atlas metrics
- Set up alerts for high usage
- Regular backup verification

## 🔄 Updates and Maintenance

### 1. Code Updates
- Push changes to main branch
- Automatic deployment via Vercel
- Test in staging environment first

### 2. Dependency Updates
- Regular security updates
- Test compatibility before deployment
- Update package.json versions

### 3. Database Maintenance
- Regular backups
- Index optimization
- Performance monitoring

## 📞 Support

For deployment issues:
1. Check Vercel deployment logs
2. Review application logs
3. Verify environment configuration
4. Test locally first

## 🎯 Performance Optimization

### 1. Frontend Optimization
- Image optimization
- Code splitting
- Lazy loading
- CDN usage

### 2. Backend Optimization
- Database indexing
- Query optimization
- Caching strategies
- Rate limiting

### 3. Monitoring Tools
- Vercel Analytics
- MongoDB Atlas monitoring
- Custom logging
- Error tracking
