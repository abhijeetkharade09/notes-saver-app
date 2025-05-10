import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id == id)[0];
  console.log("Final Paste: ", paste);


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-md">
        <input
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none mb-4"
          type="text"
          value={paste?.title || ""}
          placeholder="Enter Title Here"
          disabled
        />
  
        <textarea
          className="w-full h-60 p-4 rounded-xl border border-gray-300 resize-none"
          value={paste?.content || ""}
          placeholder="Content here"
          disabled
        />
      </div>
    </div>
  );
  
}

export default ViewPaste