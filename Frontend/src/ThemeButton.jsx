
import React, { useEffect } from 'react';

const ThemeButton = () => {
  useEffect(() => {
    // Function to initialize Google Translate
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    };

    // Load the Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onload = () => {
      // Script loaded successfully, initialize Google Translate
      googleTranslateElementInit();
    };
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="translate-container">
      <div id="google_translate_element"></div>
    </div>
  );
};

export default ThemeButton
