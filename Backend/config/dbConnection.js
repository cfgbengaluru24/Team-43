import pg from 'pg';

// Database connection for `todo`
const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'toDoListCFG',
    : process.env.DATABASE_PASSWORD,
    port: 5432
});
db.connect();   // Start connection to db

// Database connection for `collegeData`
const db2 = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'collegeData',
    : process.env.DATABASE_PASSWORD,
    port: 5432
});
db2.connect();   // Start connection to db

// Database connection for `HRData`
const db3 = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'HRData',
    : process.env.DATABASE_PASSWORD,
    port: 5432
});
db3.connect();   // Start connection to db

// db.js
// const { Pool } = require('pg');

const db4 = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    : process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
db4.connect();
// module.exports = pool;

export { db, db2,db3,db4 };

