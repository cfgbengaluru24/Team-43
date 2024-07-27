import React from 'react';

const ThemeButton = ({ toggleDarkMode }) => {
  return (
    <button onClick={toggleDarkMode} className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded">
      Toggle Mode
    </button>
  );
};

export default ThemeButton;