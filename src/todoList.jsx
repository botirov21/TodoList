import React, { useReducer, useState } from 'react'
import img from "../src/assets/deletbtn.png"
import img2 from "../src/assets/editPng.png"


const initialState = {
    todos: [],
};

const Todoreducer=(state, action) => {
   switch(action.type){
    case "add-todo":
        return { todos: [...state.todos, action.text] };
    case 'edit-todo':
      const updatedTodos = state.todos.map((todo, index) => {
          if (index === action.index) {
              return action.text;
            }
          else {
                return todo;
            }
        });
        return { todos: updatedTodos };
    case 'delete-todo':
      const filteredTodos = state.todos.filter((_, index) => index !== action.index);
        return { todos: filteredTodos };
    default:
        return state;
 }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(Todoreducer, initialState);
  const [inputText, setInputText] = useState('');
  const [editText, setEditText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (inputText === '') return;
    dispatch({ type: 'add-todo', text: inputText });
    setInputText('');
  };
  const editTodo = () => {
    if (editText === '') return;
    dispatch({ type: 'edit-todo', text: editText, index: editIndex });
    setEditIndex(null);
    setEditText('');
  };
  const deleteTodo = (index) => {
    dispatch({ type: 'delete-todo', index });
  };

  return (
    <div className="container">
      <h1>TODO List Demo App</h1>
      <p>Do it now</p>
      <div className="input-btn">
        <input
          type="text"
          placeholder="Add a new task"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="input-text"
        />
        <button onClick={addTodo} className="add-button">
          Add
        </button>
      </div>
      <div className='ActionName'>
        <h3>Task Name</h3>
        <h3 className='editnName'>Edit</h3>
        <h3>Delete</h3>
      </div>
      {state.todos.map((todo, index) => (
        <div key={index} className="todo-item">
          {editIndex === index ? (
            <div>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
              <button onClick={editTodo} className="save-button">
                Save
              </button>
            </div>
          ) : (
            <div>
              {todo}
              <div className="edit-buttons">
                <button onClick={() => setEditIndex(index)} className="edit-button">
                <img src={img2} alt="" />
                </button>
                <button onClick={() => deleteTodo(index)} className="delete-button">
                  <img src={img} alt="" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default TodoList;
