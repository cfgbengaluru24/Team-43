import React from 'react';
import students from '../dummy.js/student-result.js';

const StudentResult = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Students Information</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">College</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Aptitude</th>
              <th className="px-4 py-2 border-b">Domain</th>
              <th className="px-4 py-2 border-b">Prediction Label</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-4 py-2 border-b">{student.id}</td>
                <td className="px-4 py-2 border-b">{student.name}</td>
                <td className="px-4 py-2 border-b">{student.college}</td>
                <td className="px-4 py-2 border-b">{student.email}</td>
                <td className="px-4 py-2 border-b">{student.aptitude}</td>
                <td className="px-4 py-2 border-b">{student.domain}</td>
                <td className="px-4 py-2 border-b">{student.prediction_label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentResult;

