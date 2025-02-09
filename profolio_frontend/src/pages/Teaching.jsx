import React, { useState, useEffect } from "react";
import API from "../utils/api";

const Teaching = () => {
  const [teaching, setTeaching] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/teaching")
      .then((res) => {
        setTeaching(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching teaching data", err));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Teaching Experience</h1>
      <ul className="space-y-6">
        {teaching.map((course) => (
          <li key={course._id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {course.courseName}
            </h2>
            {course.courseCode && (
              <p className="text-gray-600 text-sm">
                <strong>Course Code:</strong> {course.courseCode}
              </p>
            )}
            <p className="text-gray-600 text-sm">
              <strong>Institution:</strong> {course.institution}
            </p>
            {course.department && (
              <p className="text-gray-600 text-sm">
                <strong>Department:</strong> {course.department}
              </p>
            )}
            <p className="text-gray-600 text-sm">
              <strong>Semester:</strong> {course.semester}
            </p>
            {course.duration && (
              <p className="text-gray-600 text-sm">
                <strong>Duration:</strong> {course.duration}
              </p>
            )}
            <p className="text-gray-600 text-sm">
              <strong>Level:</strong> {course.level}
            </p>
            {course.description && (
              <p className="text-gray-700 mt-2">{course.description}</p>
            )}

            {/* Display Methodologies */}
            {course.methodologies && course.methodologies.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  Methodologies:
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  {course.methodologies.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Display Materials */}
            {course.materials && course.materials.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  Materials:
                </h4>
                <ul>
                  {course.materials.map((material, index) => (
                    <li key={index} className="text-gray-600">
                      <a
                        href={material.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {material.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Display Student Feedback */}
            {course.studentFeedback && course.studentFeedback.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  Student Feedback:
                </h4>
                {course.studentFeedback.map((feedback, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-gray-600">
                      <strong>Year:</strong> {feedback.year}
                    </p>
                    <p className="text-gray-600">
                      <strong>Rating:</strong> {feedback.rating} / 5
                    </p>
                    {feedback.comments && (
                      <p className="text-gray-700 italic">
                        "{feedback.comments}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Display Guest Lectures */}
            {course.guestLectures && course.guestLectures.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  Guest Lectures:
                </h4>
                {course.guestLectures.map((lecture, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-gray-600">
                      <strong>Title:</strong> {lecture.title}
                    </p>
                    <p className="text-gray-600">
                      <strong>Speaker:</strong> {lecture.speaker}
                    </p>
                    <p className="text-gray-600">
                      <strong>Date:</strong>{" "}
                      {new Date(lecture.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teaching;
