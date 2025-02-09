import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {/* Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover object-center"
        />
      )}

      {/* Content */}
      <div className="p-6 flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
        <p className="text-gray-700 leading-relaxed">{blog.content.substring(0, 200)}...</p> {/* Short excerpt */}
        <p className="text-gray-500 text-sm mt-2">
          Author: {blog.author}
        </p>
        {/* Add a "Read More" link if needed */}
      </div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <span className="text-gray-600 text-sm font-medium">Tags:</span>
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogCard;
