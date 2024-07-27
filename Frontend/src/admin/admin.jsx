import React, { useState } from 'react';
import { FaBars, FaTimes, FaUniversity, FaUsers, FaClipboardList, FaCog } from 'react-icons/fa';
import College from './college';
import BaseCompany from '../company/BaseCompany';
const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activePage, setActivePage] = useState('college');

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const sidebarItems = [
        { id: 'college', name: 'Colleges', icon: <FaUniversity /> },
        { id: 'students', name: 'Students', icon: <FaUsers /> },
        { id: 'programs', name: 'Programs', icon: <FaClipboardList /> },
        { id: 'settings', name: 'Settings', icon: <FaCog /> },
    ];

    const renderPage = () => {
        switch (activePage) {
            case 'college':
                return <College />;
            case 'students':
                return <BaseCompany/>;
            case 'programs':
                return <div>Programs Page</div>;
            case 'settings':
                return <div>Settings Page</div>;
            default:
                return <div>Page not found</div>;
        }
    };

    return (
        <div className="flex h-screen bg-purple-100">
            {/* Sidebar */}
            <div className={`bg-purple-800 text-white transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className={`font-bold text-xl ${isSidebarOpen ? 'block' : 'hidden'}`}>Dashboard</h2>
                    <button onClick={toggleSidebar} className="text-white focus:outline-none">
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                <nav>
                    <ul>
                        {sidebarItems.map((item) => (
                            <li key={item.id} className="mb-2">
                                <button
                                    onClick={() => setActivePage(item.id)}
                                    className={`w-full flex items-center p-3 hover:bg-purple-700 transition-colors ${activePage === item.id ? 'bg-purple-900' : ''}`}
                                >
                                    <span className="text-xl mr-4">{item.icon}</span>
                                    {isSidebarOpen && <span>{item.name}</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-x-hidden overflow-y-auto">
                <header className="bg-white shadow-md p-4">
                    <h1 className="text-2xl font-bold text-purple-800">
                        {sidebarItems.find(item => item.id === activePage)?.name}
                    </h1>
                </header>
                <main className="p-6">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;