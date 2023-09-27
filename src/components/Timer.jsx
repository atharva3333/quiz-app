import React, { useState, useEffect, useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import { QuestionContext } from '../context/QuestionContext'; // Assuming you have a TestContext

const Timer = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(30 * 60);
  const history = useNavigate();
  const { setTimerFinish } = useContext(QuestionContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeInSeconds === 0) {
        clearInterval(interval);
        
        
        history('/report');
        setTimerFinish(false);
      
      } else {
        setTimeInSeconds(timeInSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeInSeconds, history,setTimerFinish]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className='flex justify-center'>
      <p className='font-extrabold p-3 mt-5 rounded-sm text-xl'>{formatTime(timeInSeconds)}</p>
      {/* Add any other UI elements or components here */}
    </div>
  );
};

export default Timer;
