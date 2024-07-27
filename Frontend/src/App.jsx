import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Users/Components/Header';
import Footer from './Users/Components/Footer';
import Sidebar from './Users/Components/Sidebar';
import Dashboard from './Dashboard';
import Profile from './Users/Pages/Profile';
import Calendar from './Calendar';
import Testimonials from './Testimonials';
import ThemeButton from './ThemeButton';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <Header toggleDarkMode={toggleDarkMode} />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/mentorship" element={<div>1:1 Mentorship Page</div>} />
              <Route path="/login" element={<div>Login Page</div>} />
              <Route path="/live-classroom" element={<div>Live Classroom Page</div>} />
              <Route path="/all-classes" element={<div>All Classes Page</div>} />
              <Route path="/attendance" element={<div>Attendance Tracker Page</div>} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
