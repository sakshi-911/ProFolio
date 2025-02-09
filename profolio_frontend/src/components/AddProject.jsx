import ProjectList from "../components/ProjectList";
import AddProject from "../components/AddProject";

const Projects = () => {
  return (
    <div>
      <h1>Manage Projects</h1>
      <AddProject onProjectAdded={() => window.location.reload()} />
      <ProjectList />
    </div>
  );
};

export default Projects;
