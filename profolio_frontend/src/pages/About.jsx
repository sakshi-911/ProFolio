import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const About = () => {
  const [data, setData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle any errors

  useEffect(() => {
    // Fetch data from the API
    API.get("/about")
      .then(res => {
        setData(res.data);  // Set the fetched data
        setLoading(false);   // Set loading to false once data is fetched
      })
      .catch(err => {
        setError(err.message); // Handle any errors
        setLoading(false);     // Set loading to false even if there's an error
      });
  }, []);

  // Show loading state while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error state if there was an error fetching the data
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the About component once data is fetched
  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 text-gray-800 font-sans">
      {/* Image */}
      {data?.image && (
        <img
          src={data.image}
          alt={`Portrait of ${data.name}`}
          className="w-48 h-48 rounded-full object-cover mb-4 shadow-md"
        />
      )}

      {/* Name */}
      <h2 className="text-3xl font-bold mb-2 text-gray-900">{data?.name}</h2>

      {/* Bio */}
      <p className="text-lg leading-relaxed text-center mb-4 max-w-2xl">{data?.bio}</p>

      {/* Contact Information */}
      <div className="flex flex-col items-start mb-4">
        <p className="text-gray-700 text-sm mb-1">
          <strong className="font-medium">Email:</strong> {data?.contactEmail}
        </p>
        {data?.phone && (
          <p className="text-gray-700 text-sm mb-1">
            <strong className="font-medium">Phone:</strong> {data?.phone}
          </p>
        )}
      </div>

      {/* Address */}
      {data?.address && (
        <address className="text-gray-600 text-center mt-2">
          {data?.address.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </address>
      )}
    </div>
  );
};

export default About;
