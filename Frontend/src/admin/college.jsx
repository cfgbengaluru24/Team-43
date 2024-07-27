import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaEnvelope } from 'react-icons/fa';

const College = () => {
  const [expandedCollege, setExpandedCollege] = useState(null);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [emailContent, setEmailContent] = useState('');

  const colleges = [
    {
      id: 1,
      name: 'Indian Institute of Technology Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      email: 'info@iitd.ac.in',
      details: 'Premier engineering institute known for cutting-edge research and innovation.',
      programs: ['Engineering', 'Technology', 'Design'],
      studentCount: 8000,
    },
    {
      id: 2,
      name: 'All India Institute of Medical Sciences',
      city: 'New Delhi',
      state: 'Delhi',
      email: 'admin@aiims.edu',
      details: 'Top medical institute offering excellent healthcare education and research opportunities.',
      programs: ['Medicine', 'Nursing', 'Public Health'],
      studentCount: 2500,
    },
    {
      id: 3,
      name: 'Jawaharlal Nehru University',
      city: 'New Delhi',
      state: 'Delhi',
      email: 'admission@jnu.ac.in',
      details: 'Renowned for social sciences and international relations studies.',
      programs: ['Social Sciences', 'International Studies', 'Languages'],
      studentCount: 8500,
    },
    {
      id: 4,
      name: 'University of Delhi',
      city: 'Delhi',
      state: 'Delhi',
      email: 'info@du.ac.in',
      details: 'One of the largest universities offering a wide range of courses.',
      programs: ['Arts', 'Commerce', 'Sciences'],
      studentCount: 132000,
    },
    {
      id: 5,
      name: 'Indian Statistical Institute',
      city: 'Kolkata',
      state: 'West Bengal',
      email: 'dean@isical.ac.in',
      details: 'Specialized institute focusing on statistics and data science.',
      programs: ['Statistics', 'Mathematics', 'Computer Science'],
      studentCount: 1500,
    },
  ];

  const toggleCollege = (id) => {
    setExpandedCollege(expandedCollege === id ? null : id);
  };

  const toggleSelectCollege = (id) => {
    setSelectedColleges(prevSelected => 
      prevSelected.includes(id) 
        ? prevSelected.filter(collegeId => collegeId !== id)
        : [...prevSelected, id]
    );
  };

  const sendEmail = () => {
    const selectedEmails = colleges
      .filter(college => selectedColleges.includes(college.id))
      .map(college => college.email);

    // In a real application, you would send this to your backend
    console.log('Sending email to:', selectedEmails);
    console.log('Email content:', emailContent);

    // Reset selections and email content after sending
    setSelectedColleges([]);
    setEmailContent('');
    alert('Email sent successfully!');
  };

  return (
    <div className="min-h-screen bg-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          Partner Colleges for Student Selection
        </h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <ul className="divide-y divide-purple-200">
            {colleges.map((college) => (
              <li key={college.id} className="hover:bg-purple-50">
                <div className="px-6 py-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedColleges.includes(college.id)}
                    onChange={() => toggleSelectCollege(college.id)}
                    className="mr-4"
                  />
                  <div className="flex-grow cursor-pointer" onClick={() => toggleCollege(college.id)}>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-medium text-purple-900">{college.name}</div>
                      <div className="flex items-center">
                        <div className="text-sm text-purple-600 mr-4">{`${college.city}, ${college.state}`}</div>
                        {expandedCollege === college.id ? (
                          <FaChevronUp className="text-purple-500" />
                        ) : (
                          <FaChevronDown className="text-purple-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {expandedCollege === college.id && (
                  <div className="px-6 py-4 bg-purple-50">
                    <p className="text-purple-800 mb-2">{college.details}</p>
                    <p className="text-purple-700"><strong>Programs:</strong> {college.programs.join(', ')}</p>
                    <p className="text-purple-700"><strong>Student Count:</strong> {college.studentCount.toLocaleString()}</p>
                    <p className="text-purple-700"><strong>Email:</strong> {college.email}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Send Email to Selected Colleges</h2>
          <textarea
            className="w-full p-2 border border-purple-300 rounded mb-4"
            rows="4"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Enter your email content here..."
          ></textarea>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center"
            onClick={sendEmail}
            disabled={selectedColleges.length === 0 || !emailContent}
          >
            <FaEnvelope className="mr-2" />
            Send Email to {selectedColleges.length} Colleges
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-purple-600">
          Students will be selected from these partner institutions for our programs.
        </p>
      </div>
    </div>
  );
};

export default College;