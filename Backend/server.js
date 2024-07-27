import express from 'express';
import { db2 } from './config/dbConnection.js';
import nodemailer from 'nodemailer';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { sendMailsToCollege } from './controllers/sendCollegeMails.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 5000;

app.use(express.json());
import cors from 'cors';
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

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

app.post('/api/sendEmails', async (req, res) => {
  const { selectedColleges } = req.body;
  if (!selectedColleges || !Array.isArray(selectedColleges)) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  try {
    await sendMailsToCollege(selectedColleges);//call this from sendCollegeMails.js
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending emails', error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
