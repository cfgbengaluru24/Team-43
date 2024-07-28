import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyCard from './CompanyCard';
import CompanyDialog from './CompanyDialog';

function BaseCompany() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCardClick = (company) => {
    setSelectedCompany(company);
  };

  const handleCloseDialog = () => {
    setSelectedCompany(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Company Directory</h1>
      <div className="flex flex-wrap justify-center">
        {companies.map((company, index) => (
          <div key={index} onClick={() => handleCardClick(company)}>
            <CompanyCard
              companyName={company.companyname}
              description={company.description}
            />
          </div>
        ))}
      </div>
      <CompanyDialog company={selectedCompany} onClose={handleCloseDialog} />
    </div>
  );
}

export default BaseCompany
