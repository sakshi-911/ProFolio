import React, { useState, useEffect } from "react";
import API from "../utils/api";

const Conferences = () => {
  const [conferences, setConferences] = useState([]);
  const [filteredConferences, setFilteredConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [expandedConferenceIndex, setExpandedConferenceIndex] = useState(null);

  useEffect(() => {
    API.get("/conferences")
      .then((res) => {
        setConferences(res.data);
        setFilteredConferences(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching conferences", err));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterConferences(e.target.value, selectedLocation, selectedYear);
  };

  const handleLocationFilter = (e) => {
    setSelectedLocation(e.target.value);
    filterConferences(searchQuery, e.target.value, selectedYear);
  };

  const handleYearFilter = (e) => {
    setSelectedYear(e.target.value);
    filterConferences(searchQuery, selectedLocation, e.target.value);
  };

  const filterConferences = (query, location, year) => {
    let filtered = conferences;

    if (query) {
      filtered = filtered.filter((conference) =>
        conference.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter((conference) =>
        conference.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (year) {
      filtered = filtered.filter(
        (conference) =>
          new Date(conference.date).getFullYear() === parseInt(year)
      );
    }

    setFilteredConferences(filtered);
  };

  const toggleAccordion = (index) => {
    setExpandedConferenceIndex(expandedConferenceIndex === index ? null : index);
  };

  if (loading) return <div className="text-center text-xl font-semibold">Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Conferences</h1>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by Title"
            className="p-2 border rounded-md w-64"
            value={searchQuery}
            onChange={handleSearch}
          />

          <select
            className="p-2 border rounded-md"
            value={selectedLocation}
            onChange={handleLocationFilter}
          >
            <option value="">Filter by Location</option>
            {[...new Set(conferences.map((conf) => conf.location))].map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select
            className="p-2 border rounded-md"
            value={selectedYear}
            onChange={handleYearFilter}
          >
            <option value="">Filter by Year</option>
            {Array.from(new Set(conferences.map((conf) => new Date(conf.date).getFullYear())))
              .sort((a, b) => b - a)
              .map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
          </select>
        </div>
      </div>

      {/* Conferences List */}
      <div className="space-y-6">
        {filteredConferences.map((conference, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            {/* Title - Click to toggle the accordion */}
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion(index)}>
              <h3 className="text-2xl font-semibold text-gray-800">{conference.title}</h3>
              <span className="text-blue-600">{expandedConferenceIndex === index ? "Hide Details" : "View Details"}</span>
            </div>

            {/* Accordion Content - Shows when conference is expanded */}
            {expandedConferenceIndex === index && (
              <div className="mt-4">
                <p className="text-gray-600">{conference.details}</p>
                <p className="text-gray-500 mt-2 text-sm">
                  <strong>Location:</strong> {conference.location}
                </p>
                <p className="text-gray-500 mt-1 text-sm">
                  <strong>Date:</strong> {new Date(conference.date).toLocaleDateString()}
                </p>
                <div className="mt-4">
                  <a
                    href={conference.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all duration-300"
                  >
                    More Info
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conferences;
