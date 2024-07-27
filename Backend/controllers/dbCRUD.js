// to do list CRUD on user page:
function todoListActivated() {
    // CREATE TABLE items(
    // 	id SERIAL PRIMARY KEY,
    // 	title VARCHAR(10),
    // 	user_id INT REFERENCES users(id)
    // );
    let items = []
    let usersList = []
    let currentUserId = 0;

    async function getUsers() {
        const result = await db.query("SELECT * FROM users");
        usersList = result.rows;

        //find user having currentUserId
        if (currentUserId === 0) {
            return null;
        }
        else {
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

    })

    // "/new" to enter new to do
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

        // console.log(req.body["userInput"]); returns whatever user has written to add
        console.log(`User has written new to do: ${req.body["userInput"]}`);
        //insert this in db & redirect to home page
        const result = await db.query("INSERT INTO items(title,user_id) VALUES($1,$2)", [req.body["userInput"], currentUserId]);
        res.redirect('/');

    })

    // "/edit" to edit existing to do & update it
    app.post('/edit', async (req, res) => {
        const currentUser = await getUsers();

        //get id of which todo has to be edited
        console.log(`User has to edit to do with id: ${req.body.editBtn}`);

        //edit it in db & redirect to home page
        const getTitle = await db.query("SELECT title FROM items WHERE id=$1 AND user_id=$2", [req.body.editBtn, currentUserId]);

        console.log(`User-${currentUserId} has to edit to do with name: "${getTitle.rows[0].title}"`);

        //highlight that text & allow user to modify it
    })

    app.post('/tick', async (req, res) => {
        const currentUser = await getUsers();

        //to save updated changes in db
        // console.log(req.body);       op:{ doneBtn: '9' }
        console.log(`User:${currentUserId} has to edited to do with id: ${req.body.doneBtn} as: "${req.body.updatedText}"`);

        //update this modified text in db also
        const result = await db.query("UPDATE items SET title=$1 WHERE id=$2 AND user_id=$3", [req.body.updatedText, req.body.idTask, currentUserId]);
        res.redirect('/');
    });

    // "/delete" to delete that task
    app.post('/delete', async (req, res) => {
        //get id of which todo has to be deleted
        // console.log(req.body.deleteBtn); //returns whatever user has written to add
        console.log(`User:${currentUserId} has to delete to do with id: ${req.body.deleteBtn}`);

        //delete from db & redirect to home page
        const result = await db.query("DELETE FROM items WHERE id=$1 AND user_id=$2", [req.body.deleteBtn, currentUserId]);
        res.redirect('/');
    })

    // in items table :
    // delete from items;
    // ALTER SEQUENCE public.items_id_seq RESTART WITH 1;
    // select * from items;

    //view:
    // SELECT items.id,items.title,items.user_id,users.name,users.color FROM items
    // JOIN users
    // ON items.user_id=users.id
}

//to create new user profile
app.post('/newMem', async (req, res) => {
    try {
        //store name n color choice in user database
        // CREATE TABLE users(
        //     id SERIAL PRIMARY KEY,
        //     name VARCHAR(20)
        // );
        console.log(req.body);

        //USE RETURNING KEYWORD :
        const result = await db.query("INSERT INTO users(name) VALUES ($1) RETURNING *", [req.body.name])

        //get id of this user
        currentUserId = result.rows[0].id;

        console.log(`\nNew record inserted in users table here with id: ${result.rows[0].id}`);

        res.redirect("/");

    } catch (err) {
        console.error("Some error occurred: ", err.stack);
    }
})
todoListActivated();

// mail send to selected college principals

// create tranporter--> copy from https://nodemailer.com/
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.MAILID,
        pass: process.env.PASSWORD, //use gmail APP PASSWORD (not gmail passowrd)
    },
});

const mailOptions = {
    from: {
        name: "JOINING THE DOTS FOUNDATION",
        address: process.env.MAILID,
    }, // sender address
    to: "", // list of receivers goes fetch from db
    subject: "Join", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    // cc:[],
    // bcc:[],
    attachments: [
        {
            filename: 'data.txt',
            path: path.join(__dirname, 'data.txt'),      //using path module
            contentType: 'text/plain',
        },
        {
            filename: 'image.png',
            path: path.join(__dirname, 'image.png'),      //using path module
            contentType: 'image/png',
        },
    ]//array of objects
}

const sendMail = async function (tranporter, mailOptions) {
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        // alert('Email sent successfully!')
    } catch (error) {
        console.log(error);
    }
}

// if clicked on send mail then send automated mail:
sendMail(transporter, mailOptions);