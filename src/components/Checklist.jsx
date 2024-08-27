import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/authSlice';
import CardComponent from './Card';
import ModalComponent from './ModalComponent';
import { openDetail, postChecklist } from '../features/checklistSlice';
import DetailChecklistItem from './DetailChecklistItem';

const Checklist = () => {
    const dispatch = useDispatch()
    const {isOpenDetail, dataChecklistItemById, idChecklist} = useSelector((state)=> state.checklist)
    const [inputValue, setInputValue] = useState('');
    const {dataChecklist} = useSelector((state)=> state.checklist)
    const {user} = useSelector((state)=> state.auth)
    
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(postChecklist({token: user.token, name: inputValue}))
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-gray-100">
      <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Masukan Checklist Baru"
            className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </div>
        <div className="flex grid grid-cols-4 gap-6 w-full">
            {dataChecklist.map((key,index)=> (
                <CardComponent title={key.name} idChecklist={key.id} />
            ))}
        </div>
        <DetailChecklistItem token={user.token} isOpen={isOpenDetail} dataChecklist={dataChecklistItemById} idChecklist={idChecklist}/>
          {/* <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Checklist'}
            </button>
          </div> */}
          {/* {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>} */}
      </div>
  );
};

export default Checklist;