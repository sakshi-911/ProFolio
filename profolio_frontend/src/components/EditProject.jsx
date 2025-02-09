import { useState, useEffect } from "react";
import API from "../utils/api";

const EditProject = ({ projectId, onProjectUpdated }) => {
  const [formData, setFormData] = useState({ title: "", description: "", technologies: "" });

  useEffect(() => {
    // Fetch project data when component loads
    const fetchProject = async () => {
      try {
        const { data } = await API.get(`/projects/${projectId}`);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/projects/${projectId}`, formData);
      alert("Project updated successfully!");
      onProjectUpdated(); // Refresh project list
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input name="title" value={formData.title} onChange={handleChange} required />
      <input name="description" value={formData.description} onChange={handleChange} required />
      <input name="technologies" value={formData.technologies} onChange={handleChange} required />
      <button type="submit">Update Project</button>
    </form>
  );
};

export default EditProject;
