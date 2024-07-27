// frontend/src/ToDoList.jsx

import React, { useState } from 'react';

const ToDoList = () => {
  const initialTasks = [
    { id: 1, task: 'Complete React tutorial', completed: false },
    { id: 2, task: 'Read about Tailwind CSS', completed: false },
    { id: 3, task: 'Build a To-Do list component', completed: true },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="todo-list bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">To-Do List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={`task-item mb-2 ${task.completed ? 'line-through' : ''}`}>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="mr-2"
              />
              {task.task}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;


