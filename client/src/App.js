import React, { useState, useEffect } from 'react';
import APIHelper from './APIHelper';
import logo from './logo.svg';
import './App.css';

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos  = await APIHelper.getAllTodos()
      setTodos(todos)
    }
    fetchTodoAndSetTodos()
  }, []);

  const createTodo = async e => {
    e.preventDefault()
    if (!todo) {
      alert('you forgot to enter something')
      return
    }
    if (todos.some(({ task }) => task === todo)) {
      alert(`Task: ${todo} already exists`)
      return
    }
    const newTodo = await APIHelper.createTodo(todo)
    setTodos([...todos, newTodo])
  };

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation()
      await APIHelper.deleteTodo(id)
      setTodos(todos.filter(({ _id: i }) => id !== i))
    } catch (err) {}
  }

  const updateTodo = async (e, id) => {
    e.stopPropagation()
    const payload = {
      completed: !todos.find(todo => todo._id === id).completed,
    }
    const updatedTodo = await APIHelper.updateTodo(id, payload)
    setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)))
  }
  return (
    <div className="App">
      <header className='App-header'>
      <img src={logo} className="App-logo" alt="logo" />
        <div>
          <input
            id='todo-input'
            type='text'
            value={todo}
            onChange={({ target}) => setTodo(target.value)}
          />
          <button type='button' onClick={createTodo}>
            Add
          </button>
        </div>
        <div>
          <ul>
            {todos.map(({ _id, task, completed }, i) => (
              <li
                key={i}
                onClick={e => updateTodo(e, _id)}
                className={completed ? 'completed' : ''}
              >
              {task} <span onClick={e => deleteTodo(e, _id)}>FUCK</span>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
