import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import './styles/theme.css';
import './styles/footerPages.css';
import './styles/landing.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';

// Initialize mock service worker in development
async function initMocks() {
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import('./mocks/browser');
      return worker.start({
        onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
      });
    } catch (error) {
      console.error('Error starting mock service worker:', error);
    }
  }
  return Promise.resolve();
}

// Start the app after initializing mocks
initMocks().then(() => {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
});
