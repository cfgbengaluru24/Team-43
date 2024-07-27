// server.js
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sendMailsToCollege } from './emailService.js';
import { db2 } from './config/dbConnection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post('/sendEmails', async (req, res) => {
    const { selectedColleges } = req.body;
    try {
        await sendMailsToCollege(selectedColleges);
        res.status(200).send({ message: 'Emails sent successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error sending emails', error });
    }
});

app.get('/colleges', async (req, res) => {
    try {
        const query = 'SELECT * FROM collegeData';
        const result = await db2.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching colleges', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
