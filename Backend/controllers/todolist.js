// CREATE TABLE items(
// 	id SERIAL PRIMARY KEY,
// 	title VARCHAR(10),
// 	user_id INT REFERENCES users(id)
// );

// in items table :
// delete from items;
// ALTER SEQUENCE public.items_id_seq RESTART WITH 1;
// select * from items;

//view:
// SELECT items.id,items.title,items.user_id,users.name,users.color FROM items
// JOIN users
// ON items.user_id=users.id

import { db} from '../config/dbConnection.js';

const todoListActivated = (app) => {
    let items = [];
    let usersList = [];
    let currentUserId = 0;

    async function getUsers() {
        const result = await db.query("SELECT * FROM users");
        usersList = result.rows;

        if (currentUserId === 0) {
            return null;
        } else {
            return usersList.find((user) => user.id == currentUserId);
        }
    }

    app.get('/', async (req, res) => {
        const currentUser = await getUsers();
        console.log("Current user is: " + currentUser);

        const result = await db.query("SELECT * FROM items WHERE user_id=$1 ORDER BY id", [currentUserId]);
        items = result.rows;

        res.render("index.ejs", {
            todolist: items,
            users: usersList,
            IDcurrentUser: currentUserId,
        });
    });

    app.post('/new', async (req, res) => {
        const currentUser = await getUsers();

        if (currentUserId === 0) {
            items = [];
            res.render("index.ejs", {
                errorMsg: 'Cannot enter new todo. Please sign in first!',
                todolist: items,
                users: usersList,
                IDcurrentUser: currentUserId,
            });
            return;
        }

        console.log(`User has written new to do: ${req.body["userInput"]}`);
        const result = await db.query("INSERT INTO items(title,user_id) VALUES($1,$2)", [req.body["userInput"], currentUserId]);
        res.redirect('/');
    });

    app.post('/edit', async (req, res) => {
        const currentUser = await getUsers();
        console.log(`User has to edit to do with id: ${req.body.editBtn}`);

        const getTitle = await db.query("SELECT title FROM items WHERE id=$1 AND user_id=$2", [req.body.editBtn, currentUserId]);

        console.log(`User-${currentUserId} has to edit to do with name: "${getTitle.rows[0].title}"`);

        //highlight that text & allow user to modify it
    });

    app.post('/tick', async (req, res) => {
        const currentUser = await getUsers();

        console.log(`User:${currentUserId} has to edited to do with id: ${req.body.doneBtn} as: "${req.body.updatedText}"`);

        const result = await db.query("UPDATE items SET title=$1 WHERE id=$2 AND user_id=$3", [req.body.updatedText, req.body.idTask, currentUserId]);
        res.redirect('/');
    });

    app.post('/delete', async (req, res) => {
        console.log(`User:${currentUserId} has to delete to do with id: ${req.body.deleteBtn}`);

        const result = await db.query("DELETE FROM items WHERE id=$1 AND user_id=$2", [req.body.deleteBtn, currentUserId]);
        res.redirect('/');
    });

    app.post('/newMem', async (req, res) => {
        try {
            console.log(req.body);
            const result = await db.query("INSERT INTO users(name) VALUES ($1) RETURNING *", [req.body.name]);
            currentUserId = result.rows[0].id;
            console.log(`\nNew record inserted in users table here with id: ${result.rows[0].id}`);
            res.redirect("/");
        } catch (err) {
            console.error("Some error occurred: ", err.stack);
        }
    });
};

export { todoListActivated };
