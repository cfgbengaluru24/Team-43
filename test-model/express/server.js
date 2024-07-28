const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
const app = express();


// Enable CORS for all origins
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this URL if needed
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json()); // Parse JSON bodies

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to database successfully');
  }
});

app.post('/api/save-results', async (req, res) => {
  console.log('Received request body:', req.body);
  const { name, college, email, quizResults, predictionLabel } = req.body;

  try {
    // Ensure quizResults has the right length
    if (!Array.isArray(quizResults) || quizResults.length !== 4) {
      return res.status(400).json({ message: 'Invalid quiz results' });
    }

    // Query to insert data
    const query = `
      INSERT INTO results (name, college, email, extraversion, conscientiousness, aptitude, domain, prediction_label)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    // Execute query
    await pool.query(query, [
      name,
      college,
      email,
      quizResults[0] || null,
      quizResults[1] || null,
      quizResults[2] || null,
      quizResults[3] || null,
      predictionLabel || null,
    ]);

    console.log('Query executed successfully');
    res.status(200).json({ message: 'Results saved successfully' });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ message: 'Database error', error: error.toString() });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});