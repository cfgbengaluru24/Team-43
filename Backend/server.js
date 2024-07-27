import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import { sendMailsToCollege } from './controllers/sendCollegeMails.js';
import { sendMailsToHR } from './controllers/sendHRMails.js';
import { todoListActivated } from './controllers/todolist.js';

const app = express();
const port = 3000;

// Serve static CSS from the public folder
app.use(express.static('public'));
// For body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    // Trigger email sending on server start
    // sendMailsToCollege();
    sendMailsToHR();
    todoListActivated();
});
