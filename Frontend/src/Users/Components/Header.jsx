import React from 'react';
import ThemeButton from '../../ThemeButton';

const Header = ({ toggleDarkMode }) => {
  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <div>Logo</div>
      <div>
        <button>Mentorship</button>
        <button>Login</button>
        <ThemeButton toggleDarkMode={toggleDarkMode} />
      </div>
    </header>
  );
};

export default Header;
