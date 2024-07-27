import React, { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Emily Johnson',
    role: 'High School Student',
    content: 'EduHub has transformed my learning experience. The interactive classes and supportive mentors have boosted my confidence in tackling difficult subjects.',
    icon: '👩‍🎓',
  },
  {
    id: 2,
    name: 'Michael Chang',
    role: 'Parent',
    content: 'As a parent, I\'m impressed with the quality of education EduHub provides. The progress tracking tools help me stay involved in my child\'s learning journey.',
    icon: '👨‍👧',
  },
  {
    id: 3,
    name: 'Sarah Martinez',
    role: 'Teacher',
    content: 'EduHub\'s platform makes online teaching a breeze. The tools and resources available have helped me create engaging lessons for my students.',
    icon: '👩‍🏫',
  },
  // ... you can add more testimonials here
];

const TestimonialCard = ({ name, role, content, icon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 m-4 max-w-2xl mx-auto">
    <div className="text-5xl mb-4">{icon}</div>
    <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{content}"</p>
    <div className="font-bold text-indigo-600 dark:text-indigo-400">{name}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400">{role}</div>
  </div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          What Our Users Say
        </h2>
        <TestimonialCard {...testimonials[currentIndex]} />
        <div className="flex justify-center mt-4">
          <button onClick={prevTestimonial} className="mx-2 px-4 py-2 bg-indigo-600 text-white rounded">Previous</button>
          <button onClick={nextTestimonial} className="mx-2 px-4 py-2 bg-indigo-600 text-white rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;