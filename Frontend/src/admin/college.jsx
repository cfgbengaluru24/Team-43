import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

const College = () => {
  const [colleges, setColleges] = useState([]);
  const [expandedCollege, setExpandedCollege] = useState(null);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/colleges', {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setColleges(data);
        } else {
          console.error('Unexpected response format:', data);
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching colleges:', error);
        setError(`Error fetching colleges: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

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

  const sendEmail = async () => {
    try {
      await axios.post('http://localhost:5000/api/sendEmails', {
        selectedColleges,
      });
      alert('Email sent successfully!');
      setSelectedColleges([]);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-purple-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
            Partner Colleges for Student Selection
          </h1>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <p className="text-center text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

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
                      <div className="text-lg font-medium text-purple-900">{college.collegename}</div>
                      <div className="flex items-center">
                        <div className="text-sm text-purple-600 mr-4">{`${  college.city}, ${college.state}`}</div>
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
                    <p className="text-purple-700"><strong>Student Count:</strong> {college.studentcount.toLocaleString()}</p>
                    <p className="text-purple-700"><strong>Email:</strong> {college.emailid}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center"
            onClick={sendEmail}
            disabled={selectedColleges.length === 0}
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
