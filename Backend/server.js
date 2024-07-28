<<<<<<< HEAD
﻿import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import { sendMailsToCollege } from './emailService.js';
import { db2 } from './config/dbConnection.js';
import { getStudents } from './controllers/testData.js';
=======
﻿// server.js
import express from 'express';
import { db2 } from './config/dbConnection.js';
import { db3 } from './config/dbConnection.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { sendMailsToCollege } from './controllers/sendCollegeMails.js';
import { sendMailsToHR } from './controllers/sendHRMails.js';
>>>>>>> 0f2deab3b821c6e23dd363e68c493b35e4e2380f

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

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
app.get('/students', async (req, res) => {
    try {
      const students = await getStudents();
      res.json(students);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
