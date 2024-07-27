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
        pass: process.env.PASSWORD,
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

const sendMailsToCollege = async (selectedCollegeIds) => {
    try {
        const query = `SELECT emailId FROM collegeData WHERE id = ANY($1::int[])`;
        const res = await db2.query(query, [selectedCollegeIds]);
        const emailAddresses = res.rows.map(row => row.emailid);

        const mailOptions = {
            from: {
                name: 'JOINING THE DOTS FOUNDATION',
                address: process.env.MAILID,
            },
            to: `${emailAddresses.join(',')}`,
            subject: 'Invitation for Participation in Empowerment Test',
            text: 'Dear Sir/Madam,\nWe are pleased to invite your esteemed institution to participate in a special initiative by the Joining the Dots Foundation. Our goal is to empower young women by providing them with opportunities to excel in their chosen fields.\nAs part of this initiative, we are conducting a test for all girls in your college. This test aims to identify and nurture talent, providing them with the resources and support they need to succeed.\nPlease find the attached invitation and detailed information about the test.\n\nBest regards,\nJoining the Dots Foundation',
            html: '<p>Dear Sir/Madam,</p><p>We are pleased to invite your esteemed institution to participate in a special initiative by the Joining the Dots Foundation. Our goal is to empower young women by providing them with opportunities to excel in their chosen fields.</p><p>As part of this initiative, we are conducting a test for all girls in your college. This test aims to identify and nurture talent, providing them with the resources and support they need to succeed.<p>Please find the attached invitation and detailed information about the test.</p></p><p>Best regards,<br>Joining the Dots Foundation</p>',
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
        db2.end();
    }
};

export { sendMailsToCollege };
