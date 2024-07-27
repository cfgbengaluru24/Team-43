// import pg from 'pg';
// Database connection for `collegeData`
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Database connection for `todo`
const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'toDoListCFG',
    : process.env.DATABASE_PASSWORD,
    port: 5432
});
db.connect();   // Start connection to db

const db2 = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'collegeData',
    : process.env.DATABASE_PASSWORD,
    port: 5432
});
db2.connect(); 

// Database connection for `HRData`
const db3 = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'HRData',
    : process.env.DATABASE_PASSWORD,
    port: 5432
});
db3.connect();   // Start connection to db

export { db,db2, db3 };
