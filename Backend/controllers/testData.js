// getStudents.js
import {db4} from '../config/dbConnection.js';

async function getStudents() {
  try {
    const res = await db4.query('SELECT * FROM results ');
    return res.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export { getStudents };
