import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import BlogForm from '../components/BlogForm';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await API.get('/blogs');
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleCreateBlog = () => {
    setSelectedBlog({}); // Empty object for creating a new blog
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
  };

  const handleDeleteBlog = async (id) => {
    try {
      await API.delete(`/blogs/${id}`);
      fetchBlogs(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleSubmitBlog = async (data) => {
    try {
      if (data._id) {
        // Update existing blog
        await API.put(`/blogs/${data._id}`, data);
      } else {
        // Create new blog
        await API.post('/blogs', data);
      }
      fetchBlogs(); // Refresh the list
      setSelectedBlog(null); // Close the form
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">Manage Blogs</h1>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handleCreateBlog} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Create New Blog
        </button>
      </div>

      {selectedBlog && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{selectedBlog._id ? "Edit Blog" : "Create Blog"}</h2>
          <BlogForm initialValues={selectedBlog} onSubmit={handleSubmitBlog} />
        </div>
      )}

      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog._id} className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-700">{blog.content.substring(0, 100)}...</p>
            </div>
            <div>
              <button onClick={() => handleEditBlog(blog)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Edit
              </button>
              <button onClick={() => handleDeleteBlog(blog._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBlogs;
