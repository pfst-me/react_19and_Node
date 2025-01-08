import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // If not logged in, redirect to login page
    return <Navigate to="/" />;
  }

  // If logged in, render the children (protected content)
  return children;
};

export default ProtectedRoute;
