import React, { useContext, useState, useEffect } from 'react';
import { QuestionContext } from "../context/QuestionContext";
import Timer from './Timer';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
const Test = () => {
  const { email, question, timerFinish, userAnswers, setUserAnswers, setTimerFinish } = useContext(QuestionContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]); // Track attempted questions
  const [viewedQuestions, setViewedQuestions] = useState([]);
  // Check if question is null before accessing its properties
  const currentQuestion = question ? question[currentQuestionIndex] : null;

  useEffect(() => {
    if (currentQuestion) {
      const allOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];

      const shuffledOptions = shuffleArray(allOptions);

      setOptions(shuffledOptions);
    }
  }, [currentQuestion]);


  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };


  const handleNextQuestion = () => {
    if (question && currentQuestionIndex < question.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (question && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setTimerFinish(false);

  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  const handleSelectQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleOptionSelect = (option) => {
    // Update userAnswers in the context
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = option;
    setUserAnswers(updatedUserAnswers);

    // Rest of your code for updating selectedOptions
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    // Track viewed questions
    if (!viewedQuestions.includes(currentQuestionIndex)) {
      setViewedQuestions([...viewedQuestions, currentQuestionIndex]);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    // Track attempted questions
    if (userAnswers[currentQuestionIndex] !== undefined && !attemptedQuestions.includes(currentQuestionIndex)) {
      setAttemptedQuestions([...attemptedQuestions, currentQuestionIndex]);
    }
  }, [currentQuestionIndex, userAnswers]);


  function decodeEntities(encodedString) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = encodedString;
    return textarea.value;
  }



  if (!email && !timerFinish) {
    return <div className='flex justify-center h-screen items-center'>
      <p className='text-xl'>Test is over. Go to <NavLink to={'/'} className='underline font-bold'>homepage</NavLink>  and start again</p>
    </div>; // Handle the case where email or timerFinish is not available
  }

  if (!timerFinish) {
    return <div className='flex justify-center h-screen items-center'>
      <p className='text-xl'>Test is over. Go to <NavLink to={'/'} className='underline font-bold'>homepage</NavLink>  and start again</p>
    </div>;
  }





  return (
    <div className='px-2'>
      {email && <p className='absolute right-5 top-5 font-bold'>{email}</p>}

      <button className='absolute left-5 top-5' onClick={handleToggleSidebar}>
        <img width="50" height="50" src="https://img.icons8.com/ios/50/xbox-menu.png" alt="xbox-menu" />
      </button>

      {/* Sidebar component with isOpen prop */}
      <Sidebar
        questionCount={question.length}
        currentQuestionIndex={currentQuestionIndex}
        handleQuestionSelect={handleSelectQuestion}
        isOpen={isSidebarOpen} // Pass the sidebar state
        attemptedQuestions={attemptedQuestions} // Pass attempted questions
        viewedQuestions={viewedQuestions} // Pass viewed questions
        onClose={handleCloseSidebar}
      />

      <Timer />
      <div className='flex flex-col items-center gap-10 mt-20'>
        {currentQuestion ? (
          <div className='p-20 flex flex-col gap-10 m-w-[800px] shadow-lg rounded-lg'>
            <h2>Question {currentQuestionIndex + 1}</h2>

            <p className='font-bold'>{decodeEntities(currentQuestion.question)}</p>
            <ul>
              {options.map((option, index) => (
                <li
                  key={index}
                  className={`hover:bg-gray-50 p-2 rounded-md cursor-pointer flex items-center`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option} {userAnswers[currentQuestionIndex] === option && <span className="text-green-500 ml-2 text-xl">&#10003;</span>}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading question...</p>
        )}



      </div>

      <div className='flex justify-center gap-10 mt-5'>
        <button className='bg-blue-800 px-8 py-2 text-white rounded-md font-medium' onClick={handlePreviousQuestion}>Previous</button>
        <button className='bg-blue-800 px-8 py-2 text-white rounded-md font-medium' onClick={handleNextQuestion}>Next</button>
      </div>
      <div className='flex justify-center my-5 '>
        <NavLink to={'/report'}> <button className=' bg-emerald-500 px-8 py-2 text-white rounded-md font-medium' onClick={handleSubmit}>Submit</button></NavLink>
      </div>

    </div>
  );
};

export default Test;
