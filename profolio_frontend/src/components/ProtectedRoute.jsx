import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, requiredRole, children }) => {
  console.log(user);  // Debugging
  console.log(requiredRole);  // Debugging
  console.log(children);  // Debugging
  console.log(user.role);  // Debugging
  if (!user) {
    // Not authenticated
    return <Navigate to="/login" replace />;
    console.log("Not authenticated going back to login");  // Debugging
  }

  if (requiredRole && user.role !== requiredRole) {
    // Not authorized
    return <Navigate to="/" replace />; // Or another unauthorized page
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
