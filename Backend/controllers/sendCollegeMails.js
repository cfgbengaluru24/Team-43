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
    tls: {
        rejectUnauthorized: false
    }
});

const mailOptions = {
    from: {
        name: "JOINING THE DOTS FOUNDATION",
        address: process.env.MAILID,
    }, // Sender address
    to: '', // List of receivers, fetch from DB
    subject: "Invitation for Participation in Empowerment Test",
    text: `Dear Principal,

We are pleased to invite your esteemed institution to participate in a special initiative by the Joining the Dots Foundation. Our goal is to empower young women by providing them with opportunities to excel in their chosen fields. 

As part of this initiative, we are conducting a test for all girls in your college. This test aims to identify and nurture talent, providing them with the resources and support they need to succeed.

Please find the attached invitation and detailed information about the test.

Best regards,
Joining the Dots Foundation`,
    html: `<p>Dear Principal,</p>
           <p>We are pleased to invite your esteemed institution to participate in a special initiative by the Joining the Dots Foundation. Our goal is to empower young women by providing them with opportunities to excel in their chosen fields.</p>
           <p>As part of this initiative, we are conducting a test for all girls in your college. This test aims to identify and nurture talent, providing them with the resources and support they need to succeed.</p>
           <p>Please find the attached invitation and detailed information about the test.</p>
           <p>Best regards,</p>
           <p><b>Joining the Dots Foundation</b></p>`,
    attachments: [
        {
            filename: 'joiningDots.pdf',
            path: path.join(__dirname, 'joiningDots.pdf'), // Using path module
            contentType: 'application/pdf',
        },
    ] // Array of objects
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

// when they login--> attendence marked