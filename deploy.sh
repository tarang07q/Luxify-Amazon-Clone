#!/bin/bash

# Luxify Deployment Script
echo "🚀 Starting Luxify deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies for backend
echo "📦 Installing backend dependencies..."
cd backend
npm install --production
cd ..

# Install dependencies for frontend
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Build frontend for production
echo "🏗️ Building frontend for production..."
cd frontend
npm run build
cd ..

# Run tests (if available)
echo "🧪 Running tests..."
if [ -f "backend/package.json" ] && grep -q "test" backend/package.json; then
    cd backend
    npm test
    cd ..
fi

if [ -f "frontend/package.json" ] && grep -q "test" frontend/package.json; then
    cd frontend
    npm test
    cd ..
fi

# Check for environment variables
echo "🔍 Checking environment configuration..."
if [ ! -f "backend/.env.production" ]; then
    echo "⚠️ Warning: backend/.env.production not found. Make sure to set environment variables in Vercel."
fi

if [ ! -f "frontend/.env.production" ]; then
    echo "⚠️ Warning: frontend/.env.production not found. Make sure to set environment variables in Vercel."
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
if command -v vercel &> /dev/null; then
    vercel --prod
else
    echo "❌ Vercel CLI not found. Please install it with: npm i -g vercel"
    echo "📝 Manual deployment steps:"
    echo "1. Install Vercel CLI: npm i -g vercel"
    echo "2. Login to Vercel: vercel login"
    echo "3. Deploy: vercel --prod"
    exit 1
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Your application should be available at your Vercel domain."
echo ""
echo "📋 Post-deployment checklist:"
echo "1. ✅ Set environment variables in Vercel dashboard"
echo "2. ✅ Configure custom domain (if needed)"
echo "3. ✅ Test all functionality in production"
echo "4. ✅ Monitor application performance"
echo "5. ✅ Set up monitoring and alerts"
