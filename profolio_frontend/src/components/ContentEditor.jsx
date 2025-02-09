import React from 'react';

const ContentEditor = ({ value, onChange }) => {
  return (
    <textarea
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ContentEditor;
