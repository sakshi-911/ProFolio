import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      className="bg-white shadow-md p-4 rounded-lg"
    >
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{project.title}</h2>
      <p className="text-gray-600">{project.description}</p>
    </motion.div>
  );
};

export default ProjectCard;
