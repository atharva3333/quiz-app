import React,{useContext} from 'react'
import { QuestionContext } from "../context/QuestionContext";

const Test = () => {

    const { email,question } = useContext(QuestionContext);

    console.log(email);
console.log("Question Found in test" , question);
  return (
    <div className='px-2'>
        <h1 className='mt-5 font-bold text-xl text-end'>{email}</h1>
    </div>
  )
}

export default Test