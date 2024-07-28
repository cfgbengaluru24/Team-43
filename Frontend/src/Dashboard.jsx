import React from 'react';
import Calendar from './Calendar';
import Testimonials from './Testimonials';
import Sidebar from './Users/Components/Sidebar';
const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <Calendar />
      <Testimonials />
    </div>
  );
};

export default Dashboard;

