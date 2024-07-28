import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Users/Components/Sidebar';
const initialTasks = [
  { id: 1, task: 'Complete React tutorial', completed: false, priority: 'high' },
  { id: 2, task: 'Read about Tailwind CSS', completed: false, priority: 'medium' },
  { id: 3, task: 'Build a To-Do list component', completed: true, priority: 'low' },
  { id: 4, task: 'Go for a 30-minute walk', completed: false, priority: 'medium' },
  { id: 5, task: 'Prepare healthy lunch', completed: false, priority: 'high' },
];

const ToDoList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), task: newTask, completed: false, priority: 'medium' }]);
      setNewTask('');
    }
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-200';
      case 'medium': return 'bg-yellow-200';
      case 'low': return 'bg-green-200';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className='flex'>
          <Sidebar />

    <div className="todo-list bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">My Awesome To-Do List</h2>
      
      <form onSubmit={addTask} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 transition duration-300">
            Add
          </button>
        </div>
      </form>

      <ul className="space-y-3">
        {tasks.map(task => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-between p-3 rounded-md ${getPriorityColor(task.priority)}`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="mr-3 form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.task}
              </span>
            </div>
            <button
              onClick={() => removeTask(task.id)}
              className="text-red-500 hover:text-red-700 transition duration-300"
            >
              ✖
            </button>
          </motion.li>
        ))}
      </ul>

      <div className="mt-6 text-center text-sm text-gray-600">
        {tasks.filter(task => task.completed).length} of {tasks.length} tasks completed
      </div>
    </div>

    </div>
  );
};

export default ToDoList;

