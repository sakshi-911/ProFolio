import React, { useState, useEffect } from "react";
import API from "../utils/api";

const Research = () => {
  const [researchPapers, setResearchPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJournal, setSelectedJournal] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [expandedPaperIndex, setExpandedPaperIndex] = useState(null);

  useEffect(() => {
    API.get("/research")
      .then((res) => {
        setResearchPapers(res.data);
        setFilteredPapers(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching research papers", err));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterPapers(e.target.value, selectedJournal, selectedDate);
  };

  const handleJournalFilter = (e) => {
    setSelectedJournal(e.target.value);
    filterPapers(searchQuery, e.target.value, selectedDate);
  };

  const handleDateFilter = (e) => {
    setSelectedDate(e.target.value);
    filterPapers(searchQuery, selectedJournal, e.target.value);
  };

  const filterPapers = (query, journal, date) => {
    let filtered = researchPapers;

    if (query) {
      filtered = filtered.filter(
        (paper) =>
          paper.title.toLowerCase().includes(query.toLowerCase()) ||
          paper.authors.some((author) =>
            author.toLowerCase().includes(query.toLowerCase())
          )
      );
    }

    if (journal) {
      filtered = filtered.filter((paper) =>
        paper.journal.toLowerCase().includes(journal.toLowerCase())
      );
    }

    if (date) {
      filtered = filtered.filter((paper) =>
        new Date(paper.publishedDate).getFullYear() === parseInt(date)
      );
    }

    setFilteredPapers(filtered);
  };

  const toggleAccordion = (index) => {
    if (expandedPaperIndex === index) {
      setExpandedPaperIndex(null); // Close the accordion if it's already open
    } else {
      setExpandedPaperIndex(index); // Open the clicked accordion
    }
  };

  if (loading) return <div className="text-center text-xl font-semibold">Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Research Papers</h1>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by Title or Author"
            className="p-2 border rounded-md w-64"
            value={searchQuery}
            onChange={handleSearch}
          />

          <select
            className="p-2 border rounded-md"
            value={selectedJournal}
            onChange={handleJournalFilter}
          >
            <option value="">Filter by Journal</option>
            {/* Example Journals */}
            <option value="Journal A">Journal A</option>
            <option value="Journal B">Journal B</option>
            <option value="Journal C">Journal C</option>
          </select>

          <select
            className="p-2 border rounded-md"
            value={selectedDate}
            onChange={handleDateFilter}
          >
            <option value="">Filter by Year</option>
            {/* Dynamically generate options for years based on available data */}
            {Array.from(new Set(researchPapers.map((paper) => new Date(paper.publishedDate).getFullYear())))
              .sort((a, b) => b - a)
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Research Papers List */}
      <div className="space-y-6">
        {filteredPapers.map((paper, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            {/* Title - Click to toggle the accordion */}
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion(index)}>
              <h3 className="text-2xl font-semibold text-gray-800">{paper.title}</h3>
              <span className="text-blue-600">{expandedPaperIndex === index ? "Hide Details" : "View Details"}</span>
            </div>

            {/* Accordion Content - Shows when paper is expanded */}
            {expandedPaperIndex === index && (
              <div className="mt-4">
                <p className="text-gray-600">{paper.abstract}</p>
                <p className="text-gray-500 mt-2 text-sm">
                  <strong>Authors:</strong> {paper.authors.join(", ")}
                </p>
                <p className="text-gray-500 mt-1 text-sm">
                  <strong>Published on:</strong> {new Date(paper.publishedDate).toLocaleDateString()}
                </p>
                {paper.journal && (
                  <p className="text-gray-500 mt-1 text-sm">
                    <strong>Journal:</strong> {paper.journal}
                  </p>
                )}
                <div className="mt-4">
                  <a
                    href={paper.paperLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all duration-300"
                  >
                    Read Full Paper
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

export default Research;
