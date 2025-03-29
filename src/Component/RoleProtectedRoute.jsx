import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Loading from '../Common/Loading';

// This component checks if the user is authorized before showing a page
const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useContext(AuthContext);

  // Show loading spinner while user role is being determined
  if (!role) {
    return <Loading />;
  }

  // Redirect to login if the user is not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to unauthorized page if user's role is not allowed
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" />;
  }

  // Render the protected component if authorized
  return children;
};

export default RoleProtectedRoute;
