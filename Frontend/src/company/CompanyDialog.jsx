import React from 'react';
<<<<<<< HEAD
=======
import axios from 'axios';
>>>>>>> 0f2deab3b821c6e23dd363e68c493b35e4e2380f

const CompanyDialog = ({ company, onClose }) => {
  if (!company) return null;

<<<<<<< HEAD
=======
  const sendEmail = async () => {
    try {
      await axios.post('http://localhost:5000/api/sendHREmails', {
        hrId: company.id,
      });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email.');
    }
  };

>>>>>>> 0f2deab3b821c6e23dd363e68c493b35e4e2380f
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full p-6 z-10">
<<<<<<< HEAD
        <h2 className="text-2xl font-bold mb-4">{company.companyName}</h2>
        <a href={`mailto:${company.email}`} className="text-blue-500 underline mb-4 block">
          {company.email}
        </a>
        <button
          onClick={() => alert('Button Clicked!')}
=======
        <h2 className="text-2xl font-bold mb-4">{company.companyname}</h2>
        <a href={`mailto:${company.emailid}`} className="text-blue-500 underline mb-4 block">
          {company.emailid}
        </a>
        <button
          onClick={sendEmail}
>>>>>>> 0f2deab3b821c6e23dd363e68c493b35e4e2380f
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Send Email 
        </button>
        <button
          onClick={onClose}
<<<<<<< HEAD
          className=" ml-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
=======
          className="ml-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
>>>>>>> 0f2deab3b821c6e23dd363e68c493b35e4e2380f
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CompanyDialog;
