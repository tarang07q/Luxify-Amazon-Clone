import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const AdminRoute = () => {
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

  // If not admin, redirect to login with return path
  if (!isAdmin) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // If admin, render the outlet (child routes)
  return <Outlet />;
};

export default AdminRoute;
