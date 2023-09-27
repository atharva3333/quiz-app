import React, { useContext } from 'react';
import { QuestionContext } from "../context/QuestionContext";
import { NavLink } from 'react-router-dom';

const Report = () => {
  const { question, userAnswers } = useContext(QuestionContext);

  function decodeEntities(encodedString) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = encodedString;
    return textarea.value;
  }


  console.log(userAnswers);

  const correctAnswers = question.reduce((count, currentQuestion, index) => {
    if (userAnswers[index] === currentQuestion.correct_answer) {
      return count + 1;
    }
    return count;
  }, 0);

  if (!userAnswers) {
    return <div className='flex justify-center h-screen items-center'>
      <p className='text-xl'>Looks like you refreshed the page. Go to <NavLink to={'/'} className='underline font-bold'>homepage</NavLink>  and start your test again</p>
    </div>; // Handle the case where email or timerFinish is not available
  }

  return (
    <div className='w-full md:w-[900px] mx-auto my-10'>
      <h2 className='text-center font-bold text-3xl uppercase my-5'>Report</h2>
      <div className="text-center mb-5">
        <p>{correctAnswers}/{question.length} correct answers</p>
      </div>
      <ul className='flex flex-col gap-10'>
        {question.map((currentQuestion, index) => (
          <div className='w-full md:w-[900px]'>
            <li
              key={index}
              className={`border-[3px] p-4 rounded ${userAnswers[index] === currentQuestion.correct_answer
                  ? 'border-green-500' // Green border for correct answers
                  : userAnswers[index]
                    ? 'border-red-500' // Red border for incorrect answers
                    : 'border-blue-500' // Gray border for not attempted
                }`}
            >
              <div className="flex items-center">
                <div className="w-full md:w-[900px]">
                  <p className='font-bold text-lg'>Question {index + 1}: {decodeEntities(currentQuestion.question)}</p>
                  <div className='flex sm:flex-row flex-col sm:gap-20 gap-5 justify-normal mt-5'>
                    <p className='bg-white shadow-md px-4 py-2 rounded-full'>
                      <span className='font-medium'>Selected Option:</span> {userAnswers[index] ? decodeEntities(userAnswers[index]) : 'Not answered'}
                    </p>
                    <p className='bg-white shadow-md px-4 py-2 rounded-full'> <span className='font-medium'>Correct Option:</span> {decodeEntities(currentQuestion.correct_answer)}</p>
                  </div>
                </div>
                <img
                  width="24"
                  height="24"
                  src={
                    userAnswers[index] === currentQuestion.correct_answer
                      ? "https://img.icons8.com/flat-round/64/checkmark.png" // Checkmark for correct answers
                      : userAnswers[index]
                        ? "https://img.icons8.com/external-others-agus-raharjo/64/external-incorrect-flat-website-ui-others-agus-raharjo.png" // X mark for incorrect answers
                        : "https://img.icons8.com/color/48/box-important--v1.png" // No image for not attempted
                  }
                  alt={
                    userAnswers[index] === currentQuestion.correct_answer
                      ? "Correct" // Alt text for correct answers
                      : userAnswers[index]
                        ? "Incorrect" // Alt text for incorrect answers
                        : "Not attempted" // Alt text for not attempted
                  }
                />
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>


  )
}

export default Report