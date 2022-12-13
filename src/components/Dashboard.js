import React, { Fragment, useState, useEffect } from 'react';

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState('');

    async function getName() {
        try {
            const response = await fetch('http://localhost:3000/dashboard', {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();

            setName(parseRes.user_name);

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
    }, []);

    return (
        <Fragment>
            <h1>Dashboard {name}</h1>
            <button className='btn btn-primary' onClick={e => logout(e)}>Logout</button>
        </Fragment>
    );
};

export default Dashboard;