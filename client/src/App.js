import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        {/* Default Route to Login */}
        <Route path="/" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegistrationForm />} />
        {/* Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard setIsLoggedIn={setIsLoggedIn}/>
            </ProtectedRoute>
          }
        />
        {/* Redirect invalid routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
