import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center shadow-lg fixed w-full z-50 top-0 left-0">
      <h1 className="text-2xl font-bold">Professor's Portfolio</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/about" className="hover:text-gray-400">About</Link>
        <Link to="/projects" className="hover:text-gray-400">Projects</Link>
        <Link to="/research" className="hover:text-gray-400">Research</Link>
        <Link to="/conferences" className="hover:text-gray-400">Conferences</Link>
        <Link to="/achievements" className="hover:text-gray-400">Achievements</Link> 
        <Link to= "/awards" className="hover:text-gray-400">Awards</Link>  
        <Link to="/teaching" className="hover:text-gray-400">Teaching</Link>       
        <Link to="/blogs" className="hover:text-gray-400">Blogs</Link>
        <Link to="/admin" className="bg-blue-600 px-4 py-2 rounded-lg">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
