import React, { useState } from 'react';

const DetailChecklist = ({ title, initialTodos }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [checkedItems, setCheckedItems] = useState(
    initialTodos.map(() => false)
  );
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const handleCheck = (index) => {
    setCheckedItems((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  const handleDelete = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
    setCheckedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setCheckedItems([...checkedItems, false]);
      setNewTodo("");
    }
  };

  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-bold text-xl">{title}</div>
          <button
            onClick={() => setIsCollapseOpen(!isCollapseOpen)}
            className="text-blue-500 hover:text-blue-700"
          >
            {isCollapseOpen ? 'Close' : 'Add'}
          </button>
        </div>

        {isCollapseOpen && (
          <div className="mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
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
        )}

        <ul className="list-none space-y-2 mt-4">
          {todos.map((todo, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  onChange={() => handleCheck(index)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span
                  className={
                    checkedItems[index] ? "line-through text-gray-500" : ""
                  }
                >
                  {todo}
                </span>
              </div>    
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailChecklist;
