import React, { Fragment, useState } from 'react';
// import './App.css';

import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';

//componnets

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App () {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Fragment>
            <Router>
                <div className = "container">
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/dashboard' element={<Dashboard/>}/>
                    </Routes>
                </div>
            </Router>
        </Fragment>
    );
}

export default App;