import React, { useState } from 'react';

const UserCredentialsForm = ({ onSubmit }) => {
  const [inputData, setInputData] = useState({
    name: '',
    college: '',
    email: '',
    

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputData);
  };

  return (
    <div className="user-credentials-form">
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={inputData.name} onChange={handleInputChange} required />
        </label>
        <label>
          College:
          <input type="text" name="college" value={inputData.college} onChange={handleInputChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={inputData.email} onChange={handleInputChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserCredentialsForm;
