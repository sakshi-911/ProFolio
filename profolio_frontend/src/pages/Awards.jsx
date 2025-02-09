import React, { useState, useEffect } from "react";
import API from "../utils/api.js";

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    API.get("/awards")
      .then((res) => {
        setAwards(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching awards", err));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Awards</h1>
      <ul className="space-y-4">
        {awards.map((award, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">{award.title}</h3>
            {award.organization && (
              <p className="text-gray-600 text-sm">
                <strong>Organization:</strong> {award.organization}
              </p>
            )}
            {award.date && (
              <p className="text-gray-600 text-sm">
                <strong>Date:</strong> {new Date(award.date).toLocaleDateString()}
              </p>
            )}
            <p className="text-gray-700">{award.description}</p>
            {award.citation && (
              <p className="text-gray-700 italic mt-2">
                <strong>Citation:</strong> {award.citation}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Awards;
