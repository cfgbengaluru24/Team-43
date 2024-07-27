// to do list CRUD on user page:
const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'totoDoListCFGdo',      //my db is named 'todo'
    : process.env.DATABASE_PASSWORD,   //my 
    port: 5432
});
db.connect();   //start connection to db