const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator.js');
const validInfo = require('../middleware/validinfo');
const authorization = require('../middleware/authorization');

//registering

router.post('/register', validInfo, async (req, res) => {
    try {

        //1.destructure req.body (username, passwword)
        const { name, password } = req.body;

        //2.check if user exists (if so throw err)
        const user = await pool.query('SELECT * FROM users WHERE user_name = $1', [
            name
        ])

        if(user.rows.length !== 0) {
            return res.status(401).send('User already exists.');
        }

        //3.Bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //4.enter the new user inside our database

        const newUser = await pool.query('INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING *', [name, bcryptPassword]);

        // res.json(newUser.rows[0]);
        // console.log(newUser.rows[0].user_id);

        //5.generating JWT token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//login route

router.post('/login', validInfo, async (req, res) => {
    try {
        
        //1.destructure req.body
        const { name, password } = req.body;

        //2.check if user doesnt exists (if not throw err)

        const user = await pool.query('SELECT * FROM users WHERE user_name = $1', [name]);

        if(user.rows.length === 0) {
            return res.status(401).json('Password or Username is incorrect.');
        }

        //3.check if incoming password is the same as db password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword) {
            return res.status(401).json('Password or Email is incorrect.');
        }

        // console.log(validPassword);

        //4.give them jwt token

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/is-verify', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;