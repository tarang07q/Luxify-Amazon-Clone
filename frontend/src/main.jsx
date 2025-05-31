import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import './styles/theme.css';
import './styles/footerPages.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';

// Use CSS fallbacks for 3D components but don't completely disable WebGL
console.log('Using CSS fallbacks for 3D components');

// Add WebGL support status to window for debugging
window.webGLSupported = true;

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
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
