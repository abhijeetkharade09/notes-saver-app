import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import './Home.css'

const Home = () => {
    const [title, setTitle] = useState('');  // title will track here
    const [value, setValue] = useState('') ;   // content will track here
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(()=>{
      if(pasteId) {
        const paste = allPastes.find((p) => p._id === pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
      
    }, [pasteId])


    function createPaste() {
      const paste = {
        title: title,
        content: value,
        _id: pasteId || Date.now().toString(36),
        createdAt: new Date().toISOString(),
    }

      if(pasteId){
        // update
        dispatch(updateToPastes(paste));

      }
      else{
        // create
        dispatch(addToPastes(paste));
      }

    // after creation or updation
        setTitle('');
        setValue('');
        setSearchParams({});

      
    }

    return (
      <div className="w-full min-h-screen flex flex-col items-center px-4 py-8 bg-gray-100 text-black">
        {/* Input and Button Row */}
        <div className='flex flex-col md:flex-row gap-4 w-full max-w-5xl'>
          <input
            className='p-3 rounded-xl flex-1 border border-gray-300 bg-gray-100'
            type='text'
            placeholder='Enter Title Here'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
    
          <button 
            onClick={createPaste} 
            className='text-white px-5 py-3 rounded-xl transition tap'>
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
        </div>
    
    {/* TextArea */}
                                                 {/* Outer Box */}
    <div className='w-full flex justify-center mt-12 px-4'>
                                                 {/* Inner Box */}
      <div className='w-full max-w-6xl bg-white p-6 rounded-2xl shadow-lg border border-gray-300 frame'>
        <textarea
          className='w-full min-h-[400px] p-4 rounded-xl border border-gray-300 bg-gray-100'
          value={value}
          placeholder='Enter Content Here'
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  </div>
    );
    
}

export default Home