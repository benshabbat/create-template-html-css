import React, { useState } from 'react';
import './TodoList.css';

/**
 * TodoList Component
 * A complete todo list with add, toggle, and delete functionality
 */
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="todo-add-btn">Add</button>
      </form>

      <div className="todo-stats">
        <span className="todo-stat">Active: {activeCount}</span>
        <span className="todo-stat">Completed: {completedCount}</span>
      </div>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="todo-empty">No tasks yet. Add one above! 🎯</li>
        ) : (
          todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content" onClick={() => toggleTodo(todo.id)}>
                <div className="todo-checkbox">
                  {todo.completed && <span className="todo-checkmark">✓</span>}
                </div>
                <span className="todo-text">{todo.text}</span>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="todo-delete-btn"
                aria-label="Delete task"
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
