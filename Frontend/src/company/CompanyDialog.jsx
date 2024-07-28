import React from 'react';
import axios from 'axios';

const CompanyDialog = ({ company, onClose }) => {
  if (!company) return null;

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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full p-6 z-10">
        <h2 className="text-2xl font-bold mb-4">{company.companyname}</h2>
        <a href={`mailto:${company.emailid}`} className="text-blue-500 underline mb-4 block">
          {company.emailid}
        </a>
        <button
          onClick={sendEmail}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Send Email 
        </button>
        <button
          onClick={onClose}
          className=" ml-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CompanyDialog;
