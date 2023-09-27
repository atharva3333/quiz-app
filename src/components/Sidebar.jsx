// Sidebar.js
import React from 'react';

const Sidebar = ({ questionCount, currentQuestionIndex, handleQuestionSelect, isOpen, attemptedQuestions, viewedQuestions }) => {
  return (
    <div className={`fixed left-0 top-0 bottom-0 w-64 bg-gray-200 p-4 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-64'}`}>
      <h3 className='text-xl font-semibold mb-4 text-center'>Questions</h3>
      <div className='flex flex-col gap-3 my-5'>
        <p className='flex items-center gap-5'><div className='w-6 h-6 bg-blue-500 rounded-md'></div> Current Question</p>
        <p className='flex items-center gap-5'><div className='w-6 h-6 bg-green-500 rounded-md'></div> Attempted</p>
        <p className='flex items-center gap-5'><div className='w-6 h-6 bg-purple-500 rounded-md'></div> Seen but Not attempted</p>
        <p className='flex items-center gap-5'><div className='w-6 h-6 bg-gray-300 rounded-md'></div>Neither Seen Not attempted</p>
      </div>
      <ul className='grid grid-cols-3 gap-2 justify-evenly'>
  {Array.from({ length: questionCount }, (_, index) => (
    <li key={index}>
      <button
        onClick={() => handleQuestionSelect(index)}
        className={`${
          currentQuestionIndex === index
            ? 'bg-blue-500 text-white'
            : attemptedQuestions.includes(index)
            ? 'bg-green-500 text-white'
            : viewedQuestions.includes(index)
            ? 'bg-purple-500 text-white'
            : 'bg-gray-300'
        } hover:bg-blue-400 px-4 py-2 rounded-md w-full text-center`}
      >
        {index + 1}
      </button>
    </li>
  ))}
</ul>
    </div>
  );
};

export default Sidebar;
