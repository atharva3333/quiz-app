import React,{useContext, useEffect} from 'react'
import TestSvg from '../assets/test.svg'
import { QuestionContext } from "../context/QuestionContext";
import { NavLink } from 'react-router-dom';
const Welcome = () => {

    const { email, setEmail,setTimerFinish, question, setQuestion } = useContext(QuestionContext);

    

  useEffect(() => {
    // Fetch questions and set them using setQuestionsData
    async function fetchQuestionsData() {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=15");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Parse JSON response
        setQuestion(data.results); // Assuming data.results contains the questions
        
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestionsData();
  }, [setQuestion]);

  console.log(question);
    
    const handleSubmit = () =>{
      setTimerFinish(true);
    }

  return (
    <div className='flex sm:flex-row flex-col-reverse gap-20 mt-20 justify-center items-end mx-2'>

    <div>
        <img src={TestSvg} alt='test'/>
    </div>
       <div className='flex flex-col items-center'>

       <label className='font-bold text-xl mb-5'>Enter Your email</label>
        <input 
           className='border border-black px-4 py-2 rounded-full text-xl' 
           type='text' 
           placeholder='example@gmail.com'
           value={email} // Use the email value from the context
           onChange={(e) => setEmail(e.target.value)}
           >
           
           </input>
           <NavLink to={'/test'}>
           <button 
           onClick={handleSubmit}
           className='bg-emerald-600 px-8 py-4 rounded-sm text-white font-semibold mt-5 text-xl'
           
           >Start Test</button>
           </NavLink>
       
        <div className=' bg-slate-200 my-5 p-5 rounded-xl'>
            <p className='font-bold text-xl mb-5'>Note!</p>
            <p>1. Test contains 15 questions</p>

            <p>2. You will get 30 minutes to finish, after which the test will auto submit</p>
        </div>
       </div>
        
    </div>
  )
}

export default Welcome