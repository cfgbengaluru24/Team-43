import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-gray-200 dark:bg-gray-900 p-4">
      <ul>
        <li><NavLink to="/dashboard" className="block py-2">Dashboard</NavLink></li>
        <li><NavLink to="/profile" className="block py-2">Profile</NavLink></li>
        <li><NavLink to="/live-classroom" className="block py-2">Live Classroom</NavLink></li>
        <li><NavLink to="/all-classes" className="block py-2">All Classes</NavLink></li>
        <li><NavLink to="/attendance" className="block py-2">Attendance Tracker</NavLink></li>
        <li><NavLink to="/calendar" className="block py-2">Calendar</NavLink></li>
        <li><NavLink to="/todo" className="block py-2">To-do</NavLink></li>
        
        
      </ul>
    </aside>
  );
};

export default Sidebar;