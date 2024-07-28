import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleTranslate from '../../Users/Components/Translate';

const Navbar = () => {
    const [isTranslateVisible, setIsTranslateVisible] = useState(false);

    const toggleTranslate = () => {
        setIsTranslateVisible(!isTranslateVisible);
    };

    return (
        <nav className="bg-purple-900 text-white shadow-lg sticky top-0 z-1000">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-purple-200">
                    NGO Website
                </Link>
                <ul className="flex items-center space-x-6">
                    <li>
                        <Link to="/" className="text-purple-200 hover:text-purple-300 transition duration-300">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-purple-200 hover:text-purple-300 transition duration-300">About</Link>
                    </li>
                    <li>
                        <Link to="/donate" className="text-purple-200 hover:text-purple-300 transition duration-300">Donate</Link>
                    </li>
                    <li>
                        <Link to="/login" className="bg-white text-purple-900 px-4 py-2 rounded-full hover:bg-purple-100 transition duration-300">Login</Link>
                    </li>
                    <li>
                        <button
                            onClick={toggleTranslate}
                            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition duration-300"
                        >
                            Translate
                        </button>
                    </li>
                </ul>
            </div>
            {isTranslateVisible && (
                <div className="container mx-auto px-4 py-3">
                    <GoogleTranslate />
                </div>
            )}
        </nav>
    );
}

export default Navbar;
