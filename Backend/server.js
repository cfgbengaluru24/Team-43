// server.js
// import dotenv from 'dotenv';     !!this part not wrkng
// dotenv.config();
console.log(process.env.DATABASE_PASSWORD)
import express from 'express';
import { db2, db3 } from './config/dbConnection.js';
import cors from 'cors';
import { sendMailsToCollege } from './controllers/sendCollegeMails.js';
import { sendMailsToHR } from './controllers/sendHRMails.js';

import cookieParser from "cookie-parser";
import Auth from "../Backend/routes/auth.route.js"
const app = express();
const PORT = 5000;
// app.use('/api', Auth)




app.use(express.json());

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/api/colleges', async (req, res) => {
  try {
    const result = await db2.query("SELECT * FROM collegeData");
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ message: 'Error fetching colleges', error: error.toString() });
  }
});

app.get('/api/companies', async (req, res) => {
  try {
    const result = await db3.query("SELECT * FROM hrInfo");
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching HRs:', error);
    res.status(500).json({ message: 'Error fetching HRs', error: error.toString() });
  }
});

app.post('/api/sendEmails', async (req, res) => {
  const { selectedColleges } = req.body;
  if (!selectedColleges || !Array.isArray(selectedColleges)) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  try {
    await sendMailsToCollege(selectedColleges);
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Error sending emails', error: error.toString() });
  }
});

app.post('/api/sendHREmails', async (req, res) => {
  const { hrId } = req.body;
  if (!hrId) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  try {
    await sendMailsToHR(hrId);
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending HR emails:', error);
    res.status(500).json({ message: 'Error sending HR emails', error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
