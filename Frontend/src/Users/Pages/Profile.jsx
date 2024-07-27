import React from 'react';

const Profile = () => {
  const student = {
    name: 'Chandrani Verma',
    username: '@chandrani',
    email: 'vermachandranin@example.com',
    progress: '75%',
    profilePic: 'https://via.placeholder.com/150',
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      <div className="relative">
        <img 
          src={student.profilePic}
          alt="Profile"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 flex items-end justify-center">
          <div className="bg-gradient-to-t from-black to-transparent p-4 w-full text-center">
            <img 
              src={student.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">{student.name}</h1>
        <p className="text-sm text-gray-500 mb-2">{student.username}</p>
        <p className="text-sm text-gray-500 mb-4">{student.email}</p>
        <div className="flex items-center mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: student.progress }}
            />
          </div>
          <span className="ml-3 text-gray-600">{student.progress} Complete</span>
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mr-2">
            Edit Profile
          </button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;


