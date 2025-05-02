import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

/**
 * Main layout component that wraps all pages
 * Includes header, footer, and toast notifications
 */
const MainLayout = () => {
  const { theme } = useTheme();
  
  return (
    <div className="app-container" style={{ 
      backgroundColor: theme.background,
      color: theme.text,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      
      <main className="main-content" style={{ flex: 1 }}>
        <Outlet />
      </main>
      
      <Footer />
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.currentTheme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  );
};

export default MainLayout;
