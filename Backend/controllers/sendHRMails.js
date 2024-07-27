import { db2 } from '../config/dbConnection.js';
import nodemailer from 'nodemailer';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create transporter --> copy from https://nodemailer.com/
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.MAILID,
        pass: process.env.PASSWORD, // Use Gmail APP PASSWORD (not Gmail )
    },
});

const sendMail = async function (transporter, mailOptions) {
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.log(error);
    }
};

// CREATE TABLE hrInfo(
// 	id SERIAL PRIMARY KEY,
// 	companyName VARCHAR(30),
// 	emailId VARCHAR(30)
// );
// INSERT INTO hrInfo VALUES(1,'Google','apathak1_be22@thapar.edu');
// INSERT INTO hrInfo VALUES(2,'Adobe','aryan.chharia@gmail.com');
// INSERT INTO hrInfo VALUES(3,'JPMC','pahwapranshul@gmail.com');
// INSERT INTO hrInfo VALUES(4,'Microsoft','manvardhansingh05@gmail.com');
// INSERT INTO hrInfo VALUES(5,'Salesforce','samikshadeb295@gmail.com');
const sendMailsToHR = async () => {
    try {
        const res = await db2.query('SELECT companyName, emailId FROM hrInfo');
        const hrInfo = res.rows;

        for (const hr of hrInfo) {
            const mailOptions = {
                from: {
                    name: "JOINING THE DOTS FOUNDATION",
                    address: process.env.MAILID,
                }, // Sender address
                to: hr.emailid, // HR email address
                subject: `Referral for Outstanding Girl Students from ${hr.companyname}`, // Subject line
                text: `Dear ${hr.companyname} HR,

We are excited to introduce you to a group of exceptionally talented girl students from our program at Joining the Dots Foundation. They have demonstrated outstanding academic performance and technical skills, making them ideal candidates for your company's upcoming recruitment drives.

Attached are their test scores and resumes. We strongly believe that these students have the potential to excel in your organization and make significant contributions.

We request you to consider interviewing them for suitable positions in your company.

Thank you for your time and consideration.

Best regards,
Joining the Dots Foundation`,
                html: `<p>Dear ${hr.companyname} HR,</p>
                       <p>We are excited to introduce you to a group of exceptionally talented girl students from our program at <strong>Joining the Dots Foundation</strong>. They have demonstrated outstanding academic performance and technical skills, making them ideal candidates for your company's upcoming recruitment drives.</p>
                       <p>Attached are their test scores and resumes. We strongly believe that these students have the potential to excel in your organization and make significant contributions.</p>
                       <p>We request you to consider interviewing them for suitable positions in your company.</p>
                       <p>Thank you for your time and consideration.</p>
                       <p>Best regards,<br>Joining the Dots Foundation</p>`,
                attachments: [
                    {
                        filename: 'joiningDots.pdf',
                        path: path.join(__dirname, 'joiningDots.pdf'), // Using path module
                        contentType: 'application/pdf',
                    },
                ] // Array of objects
            };

            await sendMail(transporter, mailOptions);
        }
    } catch (error) {
        console.error('Error fetching HR email addresses:', error);
    } finally {
        db2.end(); // Close the database connection
    }
};

export { sendMailsToHR };

