import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, requiredRole, children }) => {
  if (!user) {
    // Not authenticated
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Not authorized
    return <Navigate to="/" replace />; // Or another unauthorized page
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
