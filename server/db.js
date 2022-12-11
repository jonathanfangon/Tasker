const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: "jono",
    password: process.env.PG_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "solo2"
});

module.exports = pool;