import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  console.log('PrivateRoute - User:', user, 'Location:', location.pathname);

  // If no user, redirect to login with return path
  if (!user) {
    console.log('PrivateRoute - No user, redirecting to login');
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  console.log('PrivateRoute - User authenticated, allowing access');
  // Allow all authenticated users (both admin and regular) to access protected routes
  // The admin-specific routing is handled by AdminRoute component
  return <Outlet />;
};

export default PrivateRoute;
