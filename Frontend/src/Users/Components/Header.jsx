// src/components/Header.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import GoogleTranslate from './Translate';

const Header = () => {
  const [isTranslateVisible, setIsTranslateVisible] = useState(false);

  const toggleTranslate = () => {
    setIsTranslateVisible(!isTranslateVisible);
  };

  return (
    <header className="px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wider">
          <span className="text-blue-400">NGO</span>
          <span className="text-green-400">HUB</span>
        </div>
        <nav className="flex items-center space-x-6">
          <button className="px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded-md transition duration-300 ease-in-out">
            Mentorship
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 rounded-md transition duration-300 ease-in-out">
            Login
          </button>
          <button
            onClick={toggleTranslate}
            className="px-4 py-2 text-sm font-medium bg-yellow-500 hover:bg-yellow-600 rounded-md transition duration-300 ease-in-out"
          >
            Translate
          </button>
        </nav>
      </div>
      {isTranslateVisible && (
        <div className="mt-4">
          <GoogleTranslate />
        </div>
      )}
    </header>
  );
};

export default Header;

