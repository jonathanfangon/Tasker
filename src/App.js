import React, { Fragment } from 'react';
// import './App.css';

import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';

//componnets

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App () {
    return (
        <Fragment>
            <Router>
                <div className = "container">
                    <Routes>
                        <Route path='login' render = {props => <Login {...props} />}/>
                        <Route path='/register' render = {props => <Register {...props} />}/>
                        <Route path='/dashboard' render = {props => <Dashboard {...props} />}/>
                    </Routes>
                </div>
            </Router>
        </Fragment>
    );
}

export default App;