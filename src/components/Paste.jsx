import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import {
  PencilSquareIcon,
  EyeIcon,
  TrashIcon,
  ClipboardDocumentIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

const Paste = () => {
  const pastes = useSelector((state) => state.pastes.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mt-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        PASTES
      </h1>
      <input
        className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="search"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {filterData.length > 0 ? (
          filterData.map((paste) => {
            return (
              <div
                className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
                key={paste?._id}
              >
                <div className="text-lg font-semibold text-gray-800">
                  {paste.title}
                </div>
                <div className="text-gray-600">{paste.content}</div>

                <div className="flex flex-wrap gap-4 mt-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 cursor-pointer">
                    <NavLink
                      to={`/?pasteId=${paste?._id}`}
                      className="flex items-center gap-2"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </NavLink>
                  </button>

                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2 cursor-pointer">
                    <NavLink
                      to={`/pastes/${paste?._id}`}
                      className="flex items-center gap-2"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </NavLink>
                  </button>

                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 cursor-pointer"
                    onClick={() => handleDelete(paste?._id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>

                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    <ClipboardDocumentIcon className="h-5 w-5" />
                  </button>

                  <button
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      const shareLink = `${window.location.origin}/pastes/${paste?._id}`;
                      navigator.clipboard.writeText(shareLink);
                      toast.success("Shareable link copied to clipboard!");
                    }}
                  >
                    {" "}
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="text-sm text-gray-500 mt-2">
                  {new Date(paste.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-600 mt-6">No pastes found.</div>
        )}
      </div>
    </div>
  );
};

export default Paste;