import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.DATABASE_PASSWORD);
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

const db4 = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'userData',
    : process.env.DATABASE_PASSWORD,
    port: 5432
    
});
db4.connect();

export { db, db2, db3,db4};
