import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Sidebar = () => {
  const [isLiveClassActive, setIsLiveClassActive] = useState(false);
  const [attendanceData, setAttendanceData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Attendance',
        data: [90, 85, 95, 80, 100],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  const joinLiveClass = () => {
    window.open('https://zoom.us/j/your-meeting-id', '_blank');
    setIsLiveClassActive(true);
  };

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-purple-700 to-indigo-900 text-white p-6 shadow-lg overflow-y-auto">
      <nav>
        <ul className="space-y-4">
          {/* Your existing navigation items */}
          {[
            { to: "/dashboard", label: "Dashboard", icon: "📊" },
            { to: "/profile", label: "Profile", icon: "👤" },
           
            { to: "/attendance", label: "Attendance Tracker", icon: "📅" },
            { to: "/calendar", label: "Calendar", icon: "🗓" },
            { to: "/todo", label: "To-do", icon: "✅" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out
                  ${isActive
                    ? "bg-white text-purple-700 shadow-md"
                    : "hover:bg-purple-600"
                  }`
                }
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Live Class Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Live Class</h3>
        <button
          onClick={joinLiveClass}
          className={`w-full py-2 px-4 rounded font-bold ${
            isLiveClassActive
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isLiveClassActive ? 'Join Active Class' : 'Start Live Class'}
        </button>
      </div>

      
    </aside>
  );
};

export default Sidebar;