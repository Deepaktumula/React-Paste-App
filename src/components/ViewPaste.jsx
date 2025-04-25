import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.pastes.pastes);

  const paste = allPastes.find((p) => p?._id === id);
  console.log("Final Paste :: ", paste);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">View Paste</h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">Title</label>
          <input
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            type="text"
            placeholder="Enter the text here"
            value={paste?.title || ""}
            disabled
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">Content</label>
          <textarea
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            value={paste?.content || ""}
            disabled
            placeholder="Enter content here"
            rows={10}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;