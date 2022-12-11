const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

//require routes
const authRoute = require('./routes/jwtAuth');
const dashboardRoute = require('./routes/dashboard');

app.use(express.json());
app.use(cors());

//ROUTES

//register and login routes

app.use('/auth', authRoute);

//dashboard route

app.use('/dashoboard', dashboardRoute);

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})