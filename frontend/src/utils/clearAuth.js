// Utility to clear all authentication data
export const clearAuthData = () => {
  // Clear localStorage
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  
  // Clear all cookies
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  
  console.log('All authentication data cleared');
};

// Call this function to clear auth data
if (typeof window !== 'undefined') {
  window.clearAuthData = clearAuthData;
}
