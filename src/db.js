const { Pool } = require('pg');

const pool = new Pool({
    password: "2020",
    user: "postgres",
    database: "contacts",
    port: "5432",
    host: "localhost"
})

module.exports = pool