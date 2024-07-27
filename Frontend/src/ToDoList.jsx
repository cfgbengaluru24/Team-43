import React from 'react';

const TodoList = () => {
  return (
    <aside className="w-64 h-full bg-gray-200 dark:bg-gray-900 p-4">
      <h2 className="text-xl mb-4">To-Do List</h2>
      <ul>
        <li className="py-2">Task 1</li>
        <li className="py-2">Task 2</li>
        <li className="py-2">Task 3</li>
      </ul>
    </aside>
  );
};

export default TodoList;
