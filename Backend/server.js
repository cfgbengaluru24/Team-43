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
// sendMailsToCollege();
// sendMailsToHR();
// todoListActivated();

app.post('/sendEmails', async (req, res) => {
    const { selectedColleges, emailContent } = req.body;
    try {
        await sendMailsToCollege(selectedColleges, emailContent);
        res.status(200).send({ message: 'Emails sent successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error sending emails', error });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    // Trigger email sending on server start
});