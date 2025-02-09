import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Teaching from "./pages/Teaching";
import About from "./pages/About";
import Conferences from "./pages/Conferences";
import Achievements from "./pages/Achievements";
import Awards from "./pages/Awards";
import Blogs from "./pages/Blogs";
import Research from "./pages/Research";
import AdminBlogs from './pages/AdminBlogs';
import AdminProjects from './pages/AdminProjects';
import AdminTeaching from './pages/AdminTeaching';
import ProtectedRoute from "./components/ProtectedRoute";
import { jwtDecode } from 'jwt-decode'; // Corrected import


const App = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        console.log("Decoded jwt:",decoded);
        console.log("User:", user);
        console.log({user});

      } catch (error) {
        // Invalid token - remove it
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, []);

  console.log("User after useeffect:", user);  // Debugging

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
      
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded jwt:",decoded);
      setUser(decoded);

      console.log("User:", user); // Debugging  
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/research" element={<Research />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/conferences" element={<Conferences />} />
          <Route path="/about" element={<About />} />
          <Route 
             path="/login" 
             element={<LoginPage onLogin={handleLogin} />} 
          />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                user={user}
                requiredRole="admin" // Check for "admin" role
                children={<AdminPage />}  
              >
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute

                user={user}
                requiredRole="admin"
                children={<AdminBlogs />}
              >
                <AdminBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute
                user={user}
                requiredRole="admin"
              >
                <AdminProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/teaching"
            element={
              <ProtectedRoute
                user={user}
                requiredRole="admin"
              >
                <AdminTeaching />
              </ProtectedRoute>
            }
          />
                   <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
