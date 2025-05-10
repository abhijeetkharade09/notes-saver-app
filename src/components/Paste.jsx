import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const filteredData = (pastes || []).filter(  // just taken this line from gpt
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  } 

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 bg-gray-100">
      <input
        className="w-full max-w-4xl p-3 rounded-md border border-gray-400 mb-6 bg-gray-100"
        type="search"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
  
      <div className="w-full max-w-4xl bg-gradient-to-b from-gray-200 to-white p-5 rounded-md border border-gray-300 mb-4 frame">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">All Pastes</h1>          {/* here above we used frame from Home.css */}
  
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste._id} className="bg-gray-200 p-4 border border-gray-400 rounded-md mb-4">
              <h2 className="text-xl font-bold text-black">{paste.title}</h2>
              <p className="text-gray-700">{paste.content}</p>
  
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-3">
                  <a href={`/?pasteId=${paste._id}`} title="Edit">
                    <button className="border rounded p-2 hover:bg-gray-200">
                      ✏️
                    </button>
                  </a>
                  <a href={`/pastes/${paste._id}`} title="View">
                    <button className="border rounded p-2 hover:bg-gray-200">
                      👁️
                    </button>
                  </a>
                  <button
                    onClick={() => handleDelete(paste._id)}
                    title="Delete"
                    className="border rounded p-2 hover:bg-gray-200"
                  >
                    🗑️
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to clipboard");
                    }}
                    title="Copy"
                    className="border rounded p-2 hover:bg-gray-200"
                  >
                    📋
                  </button>
                  <button
                    title="Share"
                    className="border rounded p-2 hover:bg-gray-200"
                  >
                    📤
                  </button>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-1">📅</span>
                  {new Date(paste.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-600 text-lg">No pastes found.</div>
        )}
      </div>
    </div>
  );
  
  
}

export default Paste