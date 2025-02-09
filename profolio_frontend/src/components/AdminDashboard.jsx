import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
      <p className="mb-4">Manage your website content here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/admin/blogs" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Manage Blogs
        </Link>
        <Link to="/admin/projects" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Manage Projects
        </Link>
        <Link to="/admin/teaching" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Manage Teaching
        </Link>
        {/* Add links to other management sections (awards, achievements, etc.) */}
      </div>
    </div>
  );
};

export default AdminDashboard;
