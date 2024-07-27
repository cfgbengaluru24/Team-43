//npm init
//npm install express body-parser axios ejs pg path url nodemailer dotenv
import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import ejs from 'ejs';
import 'dotenv/config';
import 'dotenv/config';
import nodemailer from "nodemailer";
import path from "path";                   //for __dirname
import { join } from "path";                   //for __dirname
import { dirname } from "path";                   //for __dirname
import { fileURLToPath } from "url";              //for __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));              //for __dirname

const app = express();
const port = 3000;
//to serve static css from public folder:
app.use(express.static('public'));
//for body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server running on  http://localhost:${port}/`)
})