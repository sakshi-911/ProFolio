// AdminPage.jsx
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import AddProject from '../components/AddProject';
import AdminBlogs from './AdminBlogs'; 
import ProtectedRoute from "../components/ProtectedRoute";

const AdminPage = ({user}) => {
  return (
    <div>
      <h2>Admin Area</h2>
      <nav>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/addproject">Add Project</Link>
        <Link to="/admin/blogs">Blogs</Link>
      </nav>
      <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route
            path="/addproject"
            element={
              <ProtectedRoute user={user} requiredRole="admin">
                <AddProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs"
            element={
              <ProtectedRoute user={user} requiredRole="admin">
                <AdminBlogs />
              </ProtectedRoute>
            }
          />
          {/* If no match, redirect to dashboard */}
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
    </div>
  );
};

export default AdminPage;
