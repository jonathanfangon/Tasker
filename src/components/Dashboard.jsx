import React, { Fragment, useState, useEffect } from 'react';

//inport components and styles
import InputTodo from './todolist/InputTodo';
import ListTodos from './todolist/ListTodos';
import './themes/theme.css';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);
  const [theme, setTheme] = useState('dark');

  //get the username for the current user
  async function getName() {
    try {
      const response = await fetch('http://localhost:3000/dashboard', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setAllTodos(parseRes);

      setName(parseRes[0].user_name);
    } catch (error) {
      console.error(error.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
  };

  //on click functionality for changing themes
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    getName();
    setTodosChange(false);
  }, [todosChange]);

  //effect for changing the background image/color
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Fragment>
      <div>
        <div className='d-flex mt-5 justify-content-around'>
          <h1>{name}'s Todo List</h1>
        </div>

        <InputTodo setTodosChange={setTodosChange} />

        <h2 className='d-flex mt-5 justify-content-center'>Your Tasks</h2>
        <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
      </div>
      <div id='bottom-btns'>
        {/* <button className='btn btn-secondary btn-sm' onClick={toggleTheme}>
          Toggle Theme
        </button> */}
        <button
          id='logout-btn'
          onClick={(e) => logout(e)}
          className='btn btn-primary btn-sm'
        >
          Logout
        </button>
      </div>
    </Fragment>
  );
};

export default Dashboard;
