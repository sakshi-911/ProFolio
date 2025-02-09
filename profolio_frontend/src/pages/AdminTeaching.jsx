import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import TeachingForm from '../components/TeachingForm';

const AdminTeaching = () => {
  const [teaching, setTeaching] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeaching, setSelectedTeaching] = useState(null);

  useEffect(() => {
    fetchTeaching();
  }, []);

  const fetchTeaching = async () => {
    try {
      const response = await API.get('/teaching');
      setTeaching(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching teaching:", error);
    }
  };

  const handleCreateTeaching = () => {
    setSelectedTeaching({}); // Empty object for creating a new teaching
  };

  const handleEditTeaching = (teachingItem) => {
    setSelectedTeaching(teachingItem);
  };

  const handleDeleteTeaching = async (id) => {
    try {
      await API.delete(`/teaching/${id}`);
      fetchTeaching(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting teaching:", error);
    }
  };

  const handleSubmitTeaching = async (data) => {
    try {
      if (data._id) {
        // Update existing teaching
        await API.put(`/teaching/${data._id}`, data);
      } else {
        // Create new teaching
        await API.post('/teaching', data);
      }
      fetchTeaching(); // Refresh the list
      setSelectedTeaching(null); // Close the form
    } catch (error) {
      console.error("Error submitting teaching:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">Manage Teaching Experiences</h1>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handleCreateTeaching} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Create New Teaching Experience
        </button>
      </div>

      {selectedTeaching && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{selectedTeaching._id ? "Edit Teaching Experience" : "Create Teaching Experience"}</h2>
          <TeachingForm initialValues={selectedTeaching} onSubmit={handleSubmitTeaching} />
        </div>
      )}

      <ul className="space-y-4">
        {teaching.map((teachingItem) => (
          <li key={teachingItem._id} className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{teachingItem.courseName}</h3>
              <p className="text-gray-700">{teachingItem.description ? teachingItem.description.substring(0, 100) + "..." : "No description available."}</p>
            </div>
            <div>
              <button onClick={() => handleEditTeaching(teachingItem)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Edit
              </button>
              <button onClick={() => handleDeleteTeaching(teachingItem._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTeaching;
