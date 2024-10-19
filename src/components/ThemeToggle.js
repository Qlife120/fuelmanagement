import React, { useState, useEffect } from 'react';
import "../styles/App.css"


const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if there's a saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? true : false;
  });

  useEffect(() => {
    // Apply the dark or light theme by adding/removing the 'dark-theme' class
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');  // Save theme in localStorage
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');  // Save theme in localStorage
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <button onClick={toggleTheme} className='toggle-button active'>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
};

export default ThemeToggle;
