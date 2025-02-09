import { useEffect, useState } from "react";
import API from "../utils/api";
import EditProject from "./EditProject"; // Import Edit Component

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await API.delete(`/projects/${id}`);
        alert("Project deleted!");
        fetchProjects(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      {projects.map((project) => (
        <div key={project._id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <button onClick={() => setEditingProjectId(project._id)}>Edit</button>
          <button onClick={() => handleDelete(project._id)}>Delete</button>
        </div>
      ))}

      {/* Show Edit Form when a project is being edited */}
      {editingProjectId && (
        <EditProject projectId={editingProjectId} onProjectUpdated={fetchProjects} />
      )}
    </div>
  );
};

export default ProjectList;
