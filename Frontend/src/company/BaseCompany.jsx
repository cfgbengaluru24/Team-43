import React, {useState} from 'react'
import CompanyCard from './CompanyCard'
import companies from './data/Companies.json';
import CompanyDialog from './CompanyDialog';
function BaseCompany() {
    const [selectedCompany, setSelectedCompany] = useState(null);

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
              companyName={company.companyName}
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
