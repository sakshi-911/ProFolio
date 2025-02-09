import React, { useState, useEffect } from "react";
import API from "../utils/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/projects")
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching projects", err));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Images (Carousel or Grid) */}
            {project.images && project.images.length > 0 && (
              <div className="relative h-64">
                <img
                  src={project.images[0]} // Display first image
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                />
                {/* TODO: Implement a simple carousel if multiple images exist */}
              </div>
            )}

            {/* Videos */}
            {project.videos && project.videos.length > 0 && (
              <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={project.videos[0]} // Display first video
                  title={project.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Project Details */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {project.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {project.description.substring(0, 200)}...
              </p>
              <p className="text-gray-600 text-sm mt-2">
                <strong>Technologies:</strong> {project.technologies.join(", ")}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Field:</strong> {project.fieldOfStudy}
              </p>
              {/* Add more project details as needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
