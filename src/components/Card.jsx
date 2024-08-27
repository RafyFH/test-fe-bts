// CardComponent.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChecklist, editStatusChecklistItem, getChecklistItemList, openDetail } from '../features/checklistSlice';

const CardComponent = ({ title, idChecklist }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state)=>state.auth)
    // const { dataChecklistItem } = useSelector((state)=>state.checklist) gunakan ketika hit dispatch
    const [todos, setTodos] = useState([]);
    const handleCheck = (id) => {
        dispatch(editStatusChecklistItem({user: user.token, idChecklist: idChecklist, idChecklistItem: id}))
    };

    useEffect(()=>{
        // dispatch(getChecklistItemList({token: user.token, id: idChecklist}))
        setTodos([
            { id: 1, name: 'Adam', checked: true, idChecklist: 2 },
            { id: 2, name: 'Eve', checked: false, idChecklist: 2 },
            { id: 3, name: 'John', checked: true, idChecklist: 3 },
            { id: 4, name: 'Jane', checked: false, idChecklist: 3 },
        ]);
    },[])
    return (
        <div className="max-w-lg rounded overflow-hidden shadow-lg bg-white">
        <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-xl">{title}</div>
                    <button
                        onClick={() => dispatch(openDetail({isOpen: true, data: todos, idChecklist: idChecklist}))}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Manage Todos
                    </button>

                    <button
                        onClick={() => dispatch(deleteChecklist({token: user.token, idChecklist: idChecklist}))}
                        className="text-red-500 hover:text-red-700"
                    >
                        Delet
                    </button>
                </div>
            <ul className="list-none space-y-2 mt-4">
            {todos.map((todo, index) => (
                <li key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={todo.checked}
                        onChange={() => handleCheck(todo.id)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className={todo.checked ? "line-through text-gray-500" : ""}>
                        {todo.name}
                    </span>
                </div>    
                {/* <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700"
                >
                    Delete
                </button> */}
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
};

export default CardComponent;
