import React, { useEffect, useState } from 'react'
import ModalComponent from './ModalComponent'
import { useDispatch } from 'react-redux'
import { deleteChecklistItem, openDetail, postChecklistItem, renameChecklistItem } from '../features/checklistSlice'

const DetailChecklistItem = ({token, isOpen, dataChecklist, idChecklist}) => {
    const dispatch = useDispatch()
    const [newTodoName, setNewTodoName] = useState('');
    const [editIndex, setEditIndex] = useState(null); // New state for tracking the index being edited
    const [editedTodoName, setEditedTodoName] = useState("");
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedTodoName(dataChecklist[index].name);
      };
    const handleAddTodo = (e) =>{
        e.preventDefault()
        dispatch(postChecklistItem({token: token, name: newTodoName, id: idChecklist}))
    }

    const handleSave = (id) => {
        
        dispatch(renameChecklistItem({token: token, idChecklist: idChecklist, idChecklistItem: id}))
    };
    const handleDelete = (id) => {

        dispatch(deleteChecklistItem({token: token, name: editedTodoName, idChecklist: idChecklist, idChecklistItem: id}))
    };
    return (
        <ModalComponent isOpen={isOpen} onClose={() => dispatch(openDetail({isOpen: !isOpen, data: [], idChecklist: 0}))}>
            <div className="mb-4">
                <input
                    type="text"
                    value={newTodoName}
                    onChange={(e) => setNewTodoName(e.target.value)}
                    className="border p-2 w-full rounded mb-2"
                    placeholder="New Todo"
                />
                <button
                    onClick={handleAddTodo}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
                >
                    Add Todo
                </button>
            </div>

            <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataChecklist.map((todo, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedTodoName}
                      onChange={(e) => setEditedTodoName(e.target.value)}
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    todo.name
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2 text-center">
                  {editIndex === index ? (
                    <button
                      onClick={() => handleSave(index)}
                      className="text-green-500 hover:text-green-700"
                    >
                        Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(todo.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                        Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </ModalComponent>
    )
}

export default DetailChecklistItem