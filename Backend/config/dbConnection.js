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

<<<<<<< HEAD
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

=======
export { db, db2, db3 };
>>>>>>> 0f2deab3b821c6e23dd363e68c493b35e4e2380f
