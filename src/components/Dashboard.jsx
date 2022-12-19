import React, { Fragment, useState, useEffect } from 'react';

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";
import './themes/theme.css';


const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState('');
    const [allTodos, setAllTodos] = useState([]);
    const [todosChange, setTodosChange] = useState(false);
    const [theme, setTheme] = useState('dark');

    async function getName() {
        try {
            const response = await fetch('http://localhost:3000/dashboard', {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();

            console.log(parseRes)

            setAllTodos(parseRes);

            setName(parseRes[0].user_name);

        } catch (error) {
            console.error(error.message);
        }
    }

    const logout = e => {
        e.preventDefault();
        localStorage.removeItem('token');
        setAuth(false);
    }

    const toggleTheme = () => {
        if(theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    useEffect(() => {
        getName();
        setTodosChange(false);
    }, [todosChange]);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <Fragment>
            <div>
                <div className="d-flex mt-5 justify-content-around">
                    <h1>{name}'s Todo List</h1>
                    <button id='logout-btn' onClick={(e) => logout(e)} className="btn btn-primary btn-sm">
                    Logout
                    </button>
                </div>

                <InputTodo setTodosChange={setTodosChange} />
                <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
            </div>
            <button className='btn btn-secondary btn-sm' onClick={toggleTheme}>Toggle Theme</button>
        </Fragment>
    );
};

export default Dashboard;