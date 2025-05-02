# Luxify Project Structure

This document outlines the improved project structure for the Luxify e-commerce platform.

## Frontend Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, fonts, and other static assets
│   ├── components/         # Reusable UI components
│   │   ├── 3d/             # Three.js 3D components
│   │   ├── admin/          # Admin-specific components
│   │   ├── layout/         # Layout components (header, footer, etc.)
│   │   ├── product/        # Product-related components
│   │   └── ui/             # Generic UI components
│   ├── config/             # Configuration files
│   ├── constants/          # Application constants
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Page layout templates
│   ├── pages/              # Page components
│   │   └── admin/          # Admin pages
│   ├── services/           # API services
│   ├── slices/             # Redux slices and RTK Query services
│   ├── styles/             # Global styles and theme
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main application component
│   ├── index.css           # Global CSS
│   ├── main.jsx            # Application entry point
│   └── store.js            # Redux store configuration
├── .gitignore              # Git ignore file
├── package.json            # NPM package configuration
└── vite.config.js          # Vite configuration
```

### Key Improvements

1. **Organized Component Structure**
   - Separated 3D components into their own directory
   - Grouped admin, layout, product, and UI components

2. **Added New Directories**
   - `config/` - For configuration files
   - `constants/` - For application constants
   - `hooks/` - For custom React hooks
   - `layouts/` - For page layout templates
   - `services/` - For API services

3. **Utility Functions**
   - Added formatters and other utility functions

## Backend Structure

```
backend/
├── config/                 # Configuration files
├── controllers/            # Route controllers
├── data/                   # Seed data
├── middleware/             # Express middleware
├── models/                 # Mongoose models
├── routes/                 # API routes
├── scripts/                # Scripts for data import, etc.
│   ├── data-import/        # Data import scripts
│   └── utils/              # Utility scripts
├── uploads/                # Uploaded files
├── utils/                  # Utility functions
├── .env                    # Environment variables
├── package.json            # NPM package configuration
└── server.js               # Server entry point
```

### Key Improvements

1. **Organized Scripts**
   - Moved data import scripts to `scripts/data-import/`
   - Moved utility scripts to `scripts/utils/`

2. **Cleaned Up Root Directory**
   - Reduced clutter in the root directory
   - Improved organization of related files

## Development Guidelines

1. **Naming Conventions**
   - Use PascalCase for component files (e.g., `ProductCard.jsx`)
   - Use camelCase for utility functions and hooks (e.g., `useAuth.js`)
   - Use kebab-case for CSS files (e.g., `product-card.css`)

2. **File Organization**
   - Keep related files together
   - Use index.js files to export multiple components from a directory
   - Group related functionality in the same directory

3. **Code Style**
   - Use consistent indentation (2 spaces)
   - Add JSDoc comments for functions and components
   - Follow ESLint and Prettier configurations

4. **Best Practices**
   - Create reusable components and hooks
   - Use TypeScript for type safety
   - Write tests for critical functionality
   - Follow the principle of single responsibility
