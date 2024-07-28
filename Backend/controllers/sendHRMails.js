import { db3 } from '../config/dbConnection.js';
import nodemailer from 'nodemailer';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import dotenv from 'dotenv';

// dotenv.config();

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
        console.error('Error sending email:', error);
    }
};

const sendMailsToHR = async (hrId) => {
    try {
        const query = `SELECT companyName, emailId FROM hrInfo WHERE id = $1`;
        const res = await db3.query(query, [hrId]);
        if (res.rows.length === 0) {
            throw new Error('No HR found with the given ID');
        }

        const hr = res.rows[0];
        const mailOptions = {
            from: {
                name: 'JOINING THE DOTS FOUNDATION',
                address: process.env.MAILID,
            },
            to: hr.emailid,
            // hiring
            subject: `Referral for Outstanding Girl Students from ${ hr.companyname }`,
            text: `Dear ${hr.companyname} HR,We are excited to introduce you to a group of exceptionally talented girl students from our program at Joining the Dots Foundation. They have demonstrated outstanding academic performance and technical skills, making them ideal candidates for your company's upcoming recruitment drives.Attached are their test scores and resumes. We strongly believe that these students have the potential to excel in your organization and make significant contributions.We request you to consider interviewing them for suitable positions in your company.Thank you for your time and consideration.Best regards,Joining the Dots Foundation`,
            html: `<p>Dear ${hr.companyname} HR,</p><p>We are excited to introduce you to a group of exceptionally talented girl students from our program at <strong>Joining the Dots Foundation</strong>. They have demonstrated outstanding academic performance and technical skills, making them ideal candidates for your company's upcoming recruitment drives.</p><p>Attached are their test scores and resumes. We strongly believe that these students have the potential to excel in your organization and make significant contributions.</p><p>We request you to consider interviewing them for suitable positions in your company.</p><p>Thank you for your time and consideration.</p><p>Best regards,<br>Joining the Dots Foundation</p>`,
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
}
};

export { sendMailsToHR };