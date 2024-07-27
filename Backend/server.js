//npm init
//npm install express body-parser axios ejs pg
import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import ejs from 'ejs';
import 'dotenv/config';

const app = express();
const port = 3000;
//to serve static css from public folder:
app.use(express.static('public'));
//for body parser
app.use(bodyParser.urlencoded({ extended: true }));