import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from '../Components/Sidebar';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AttendanceTracker = () => {
  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Attendance',
        data: [90, 85, 95, 80, 100],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className='flex'>
          <Sidebar />

    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Tracker</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Line data={attendanceData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      {/* Add more attendance details or interactive elements here */}
    </div>
    </div>
  );
};

export default AttendanceTracker;