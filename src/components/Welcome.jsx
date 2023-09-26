import React,{useContext} from 'react'
import TestSvg from '../assets/test.svg'
import { QuestionContext } from "../context/QuestionContext";
import { NavLink } from 'react-router-dom';
const Welcome = () => {

    const { email, setEmail } = useContext(QuestionContext);


      

  return (
    <div className='flex gap-20 mt-20 justify-center items-end'>

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