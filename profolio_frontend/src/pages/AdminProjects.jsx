import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true); // Initialize as true
    const [selectedProject, setSelectedProject] = useState(null);    // Initialize as null
    // selectedProject 
    const [error, setError] = useState(null); // Initialize as null
    
    const [expandedProjects, setExpandedProjects] = useState({});  //

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await API.get('/projects');
            setProjects(response.data);
        } catch (err) {
            setError(err.message || 'Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = () => {
        setSelectedProject({
            title: '',
            description: '',
            technologies: [],
            fieldOfStudy: '',
            collaborators: [],
            startDate: '',
            endDate: '',
            status: 'planning',
            fundingSource: '',
            fundingAmount: 0,
            publications: [],
            githubLink: '',
            liveDemo: '',
            images: [], // Initialize as empty array
            videos: []   // Initialize as empty array
        });
    };

    const handleEditProject = (project) => {
        setSelectedProject(project);
    };

    const handleDeleteProject = async (id) => {
        try {
            await API.delete(`/projects/${id}`);
            setProjects(projects.filter(project => project._id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete project');
        } finally {
            fetchProjects();
        }
    };

    const handleSubmitProject = async (data) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                if (key === 'images' || key === 'videos') {
                    if (Array.isArray(data[key])) {
                        data[key].forEach(file => formData.append(key, file)); // here we append each file to the form data
                    }
                } else {
                    formData.append(key, data[key]);
                }
            }

            if (data._id) {
                await API.put(`/projects/${data._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await API.post('/projects', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            fetchProjects();
            setSelectedProject(null);
        } catch (err) {
            setError(err.message || 'Failed to save project');
            console.error("Error submitting project:", err);
        }
    };

    //New Function
    const handleToggleExpand = (projectId) => {
        setExpandedProjects(prev => ({
            ...prev,
            [projectId]: !prev[projectId] // Toggle the state for this project
        }));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans py-8 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-4xl font-bold text-center mb-8">Manage Projects</h1>

                {error && (
                    <div className="bg-red-700 text-white p-3 rounded mb-4">{error}</div>
                )}

                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={handleCreateProject}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded shadow"
                    >
                        Create New Project
                    </button>
                </div>

                {selectedProject && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-300">
                            {selectedProject._id ? "Edit Project" : "Create Project"}
                        </h2>
                        {/* <ProjectForm //Remove for simplicity with all fields
                            initialValues={selectedProject}
                            onSubmit={handleSubmitProject}
                            onCancel={() => setSelectedProject(null)}
                        /> */}
                    </div>
                )}

                {loading ? (
                    <div className="text-center text-gray-400">Loading...</div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <div key={project._id} className="bg-gray-800 p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 text-gray-200">{project.title}</h3>
                                <button  
                                onClick={() => handleToggleExpand(project._id)}
                                className="text-gray-400 hover:text-gray-300 focus:outline-none mb-2">Read Full Description </button>
                                <p className="text-gray-400 mb-4">{project.description?.substring(0, 100)}...</p>

                                {/* Expand Button */}
                                <button
                                    onClick={() => handleToggleExpand(project._id)}
                                    className="text-gray-500 hover:text-gray-300 focus:outline-none"
                                >
                                    {expandedProjects[project._id] ? 'Hide Details' : 'Show Details'}
                                </button>

                                {/* Conditionally Render Extra Details */}
                                {expandedProjects[project._id] && (
                                    <div className="mt-4">
                                        <p className="text-gray-400">Technologies: {project.technologies?.join(', ')}</p>
                                        <p className="text-gray-400">Field of Study: {project.fieldOfStudy}</p>
                                        {/* Display other project details here */}
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleEditProject(project)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProject(project._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProjects;
