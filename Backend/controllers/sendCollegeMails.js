// emailService.js
import { db2 } from '../config/dbConnection.js';
import nodemailer from 'nodemailer';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.MAILID,
        pass: process.env.PASSWORD, // Use Gmail APP PASSWORD (not Gmail )
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendMail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.log('Error sending email:', error);
    }
};

const sendMailsToCollege = async (selectedCollegeIds, emailContent) => {
    try {
        const query = `SELECT emailId FROM collegeData WHERE id = ANY($1::int[])`;
        const res = await db2.query(query, [selectedCollegeIds]);
        const emailAddresses = res.rows.map(row => row.emailid);

        const mailOptions = {
            from: {
                name: 'JOINING THE DOTS FOUNDATION',
                address: process.env.MAILID,
            },
            to: emailAddresses.join(','),
            subject: 'Invitation for Participation in Empowerment Test',
            text: emailContent,
            html: emailContent,
            attachments: [
                {
                    filename: 'joiningDots.pdf',
                    path: path.join(__dirname, 'joiningDots.pdf'),
                    contentType: 'application/pdf',
                },
            ],
        };

        await sendMail(mailOptions);
    } catch (error) {
        console.error('Error fetching email addresses:', error);
    } finally {
        db2.end(); // Close the database connection
    }
};

export { sendMailsToCollege };
