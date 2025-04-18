import React, { Component } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md my-4">
          <div className="flex items-center text-red-600 mb-2">
            <FaExclamationTriangle className="mr-2" />
            <h2 className="text-lg font-semibold">Something went wrong</h2>
          </div>
          <p className="text-gray-700 mb-2">
            We're sorry, but there was an error loading this component.
          </p>
          <details className="text-sm text-gray-600 bg-white p-2 rounded border border-gray-200">
            <summary className="cursor-pointer font-medium">Error details</summary>
            <p className="mt-2 text-red-500">{this.state.error && this.state.error.toString()}</p>
            <pre className="mt-2 text-xs overflow-auto p-2 bg-gray-100 rounded">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
