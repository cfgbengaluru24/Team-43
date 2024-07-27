import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sendMailsToCollege } from './emailService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post('/sendEmails', async (req, res) => {
    const { selectedColleges, emailContent } = req.body;
    try {
        await sendMailsToCollege(selectedColleges, emailContent);
        res.status(200).send({ message: 'Emails sent successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error sending emails', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
