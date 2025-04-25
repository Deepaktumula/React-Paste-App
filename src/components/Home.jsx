import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.pastes.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pasteId]);

  // Create the paste and send it to the slice
  function createPaste() {
    if (!title.trim() || !value.trim()) {
      alert('Title and Content cannot be empty!');
      return;
    }
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // update
      dispatch(updateToPastes(paste));
    } else {
      // create
      dispatch(addToPastes(paste));
    }

    // Clear the title, content, and searchParams after creation or update
    setTitle('');
    setValue('');
    setSearchParams('');
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mt-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">CREATE PASTE</h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">Title</label>
          <input
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            required
            placeholder="Enter the title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-2">Content</label>
          <textarea
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter content here"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={10}
          />
        </div>
        <button
          onClick={createPaste}
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
        >
          {pasteId ? 'Update My Paste' : 'Create My Paste'}
        </button>
      </div>
    </div>
  );
};

export default Home;