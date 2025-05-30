import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    // Debug log to check user and role
    console.log('AdminRoute - Current user:', user);
    if (user) {
      console.log('AdminRoute - User role:', user.role);
    }
  }, [user]);

  // Check if user exists and has admin role
  const isAdmin = user && user.role === 'admin';

  console.log('AdminRoute - Is admin?', isAdmin);

  // If not logged in, redirect to login with return path
  if (!user) {
    toast.error('Please log in to access the admin area');
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // If logged in but not admin, redirect to home with error message
  if (!isAdmin) {
    toast.error('You do not have permission to access the admin area');
    return <Navigate to="/shop" replace />;
  }

  // If admin, render the children
  return children;
};

export default AdminRoute;
