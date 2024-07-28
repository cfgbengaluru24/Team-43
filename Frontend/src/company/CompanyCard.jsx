<<<<<<< HEAD
=======
// CompanyCard.jsx
>>>>>>> 0f2deab3b821c6e23dd363e68c493b35e4e2380f
import React from 'react';

const CompanyCard = ({ companyName, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4 bg-white">
      <div className="font-bold text-xl mb-2">{companyName}</div>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
  );
};

export default CompanyCard;
