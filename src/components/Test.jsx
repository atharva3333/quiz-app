import React, { useContext, useState } from 'react';
import { QuestionContext } from "../context/QuestionContext";
import Timer from './Timer';
import { NavLink } from 'react-router-dom';

const Test = () => {
  const { email, question, timerFinish, userAnswers, setUserAnswers, setTimerFinish} = useContext(QuestionContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

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
  

  function decodeEntities(encodedString) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = encodedString;
    return textarea.value;
  }

  // Check if question is null before accessing its properties
  const currentQuestion = question ? question[currentQuestionIndex] : null;

  if (!email && !timerFinish) {
    return <div className='flex justify-center h-screen items-center'>
    <p className='text-xl'>Test is over. Go to <NavLink to={'/'} className='underline font-bold'>homepage</NavLink>  and start again</p>
    </div>; // Handle the case where email or timerFinish is not available
  }

  return (
    <div className='px-2'>
    {email && <p className='absolute right-5 top-5 font-bold'>{email}</p>}
    
      <Timer />
      <div className='flex flex-col items-center gap-10 mt-20'>
  {currentQuestion && (
    <div className='p-20 flex flex-col gap-10 m-w-[800px] shadow-lg rounded-lg'>
      <h2>Question {currentQuestionIndex + 1}</h2>
      
      <p className='font-bold' 
      
      >{decodeEntities(currentQuestion.question)}</p>
      <ul>
        {currentQuestion.incorrect_answers.map((option, index) => (
          <li
            key={index}
            className={`${
              selectedOptions.includes(option) ? 'selected-option' : ''
            }`}
          >
            <label>
              <input
                type={currentQuestion.type === 'multiple' ? 'checkbox' : 'radio'}
                name={`question_${currentQuestionIndex}`}
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionSelect(option)}
              />
              {option}
            </label>
          </li>
        ))}
        <li
          className={`${
            selectedOptions.includes(currentQuestion.correct_answer)
              ? 'selected-option'
              : ''
          }`}
        >
          <label>
            <input
              type={currentQuestion.type === 'multiple' ? 'checkbox' : 'radio'}
              name={`question_${currentQuestionIndex}`}
              value={currentQuestion.correct_answer}
              checked={selectedOptions.includes(currentQuestion.correct_answer)}
              onChange={() => handleOptionSelect(currentQuestion.correct_answer)}
            />
            {currentQuestion.correct_answer}
          </label>
        </li>
      </ul>
    </div>
  )}
</div>

      <div className='flex justify-center gap-10 mt-5'>
        <button className='bg-blue-800 px-8 py-2 text-white rounded-md font-medium' onClick={handlePreviousQuestion}>Previous</button>
        <button className='bg-blue-800 px-8 py-2 text-white rounded-md font-medium' onClick={handleNextQuestion}>Next</button>
      </div>
      <button className=' bg-emerald-500 px-8 py-2 text-white rounded-md font-medium' onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Test;
