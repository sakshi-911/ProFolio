import React, { useState, useEffect } from "react";
import API from "../utils/api";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/achievements")
      .then((res) => {
        setAchievements(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching achievements", err));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Achievements</h1>
      <ul className="space-y-4">
        {achievements.map((item, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
