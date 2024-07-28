import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'toDoListCFG',
    : process.env.DATABASE_PASSWORD,
    port: 5432
});
db.connect(); 

const db2 = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'collegeData',
    : process.env.DATABASE_PASSWORD,
    port: 5432
});
db2.connect(); 

const db3 = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'HRData',
    : process.env.DATABASE_PASSWORD,
    port: 5432
});
db3.connect(); 

// db.js
// const { Pool } = require('pg');

const pool = new pg.Pool({connectionString: process.env.DATABASE_URL, ssl: {rejectUnauthorized: false}});
pool.connect();
// module.exports = pool;

export { db, db2,db3,pool};


