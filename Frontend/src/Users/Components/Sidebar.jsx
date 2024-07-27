import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-purple-700 to-indigo-900 text-white p-6 shadow-lg">
      <nav>
        <ul className="space-y-4">
          {[
            { to: "/dashboard", label: "Dashboard", icon: "📊" },
            { to: "/profile", label: "Profile", icon: "👤" },
            { to: "/live-classroom", label: "Live Classroom", icon: "🎥" },
            { to: "/all-classes", label: "All Classes", icon: "📚" },
            { to: "/attendance", label: "Attendance Tracker", icon: "📅" },
            { to: "/calendar", label: "Calendar", icon: "🗓️" },
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
    </aside>
  );
};

export default Sidebar;