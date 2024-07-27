import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="w-full border-none"
            tileClassName={({ date, view }) => 
              view === 'month' && date.getDay() === 0 ? 'text-red-500 font-bold' : null
            }
            tileContent={({ date, view }) => 
              view === 'month' && date.getDate() === new Date().getDate() ? 
              <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div> : null
            }
            navigationLabel={({ date }) => (
              <span className="text-2xl font-bold text-purple-700">
                {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
            )}
          />
        </div>
      </div>
      <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-purple-700 mb-6">
          Agenda for {date.toDateString()}
        </h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            <p className="text-lg text-gray-700">9:00 AM - DSA TREES PART 1</p>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <p className="text-lg text-gray-700">1:00 PM - VERBS</p>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <p className="text-lg text-gray-700">3:30 PM - PROJECT REVIEW</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;