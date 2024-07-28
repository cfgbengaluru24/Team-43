// getStudents.js
import {pool} from '../config/dbConnection.js';

async function getStudents() {
  try {
    const res = await pool.query('SELECT * FROM results ');
    return res.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export { getStudents };
