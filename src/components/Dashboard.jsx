import React, { Fragment, useState, useEffect } from 'react';

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";


const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState('');
    const [allTodos, setAllTodos] = useState([]);
    const [todosChange, setTodosChange] = useState(false);

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

    useEffect(() => {
        getName();
        setTodosChange(false);
    }, [todosChange]);

    return (
        <Fragment>
            {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav> */}

            {/* <h1 className='text-center my-3'>Dashboard</h1>
            <h2 className='text-center'>Welcome back {name}!</h2>
            <button className='btn btn-primary' onClick={e => logout(e)}>Logout</button> */}
            <div>
                <div className="d-flex mt-5 justify-content-around">
                    <h2>{name} 's Todo List</h2>
                    <button onClick={(e) => logout(e)} className="btn btn-primary">
                    Logout
                    </button>
                </div>

                <InputTodo setTodosChange={setTodosChange} />
                <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
            </div>
        </Fragment>
    );
};

export default Dashboard;