import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col bg-gray-100">
      <h1 className="text-4xl font-bold">Welcome to Professor's Portfolio</h1>
      <p className="text-gray-600 mt-4">Explore research, projects, and achievements.</p>
      <Link to="/projects" className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
        View Projects
      </Link>
    </div>
  );
};

export default Home;
