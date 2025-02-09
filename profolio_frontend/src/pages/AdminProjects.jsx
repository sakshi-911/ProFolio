import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import ProjectForm from '../components/ProjectForm';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await API.get('/projects');
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleCreateProject = () => {
    setSelectedProject({}); // Empty object for creating a new project
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
  };

  const handleDeleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      fetchProjects(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleSubmitProject = async (data) => {
    try {
      if (data._id) {
        // Update existing project
        await API.put(`/projects/${data._id}`, data);
      } else {
        // Create new project
        await API.post('/projects', data);
      }
      fetchProjects(); // Refresh the list
      setSelectedProject(null); // Close the form
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">Manage Projects</h1>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handleCreateProject} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Create New Project
        </button>
      </div>

      {selectedProject && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{selectedProject._id ? "Edit Project" : "Create Project"}</h2>
          <ProjectForm initialValues={selectedProject} onSubmit={handleSubmitProject} />
        </div>
      )}

      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project._id} className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-700">{project.description.substring(0, 100)}...</p>
            </div>
            <div>
              <button onClick={() => handleEditProject(project)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Edit
              </button>
              <button onClick={() => handleDeleteProject(project._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProjects;
