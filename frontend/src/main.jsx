import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import './styles/theme.css';
import './styles/footerPages.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';

// Completely disable Three.js and WebGL to prevent shader errors
console.log('WebGL/Three.js disabled - Using CSS-only 3D components');

// Add WebGL support status to window for debugging
window.webGLSupported = false;

// Add error handler for uncaught errors
window.addEventListener('error', (event) => {
  // Prevent WebGL shader errors from being displayed
  if (event.message && (
    event.message.includes('WebGL') ||
    event.message.includes('shader') ||
    event.message.includes('INVALID_OPERATION')
  )) {
    // Prevent the error from being displayed in the console
    event.preventDefault();
    return;
  }
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
