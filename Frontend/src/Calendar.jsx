// frontend/src/Calendar.jsx

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
      <div className="agenda mt-4">
        <h2>Agenda for {date.toDateString()}</h2>
        <p>This is where the agenda will be displayed.</p>
      </div>
    </div>
  );
};

export default CustomCalendar;
