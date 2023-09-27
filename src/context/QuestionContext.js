import React, { createContext, useState } from "react";

export const QuestionContext = createContext();

export const QuestionContextProvider = props => {

    const [question, setQuestion] = useState(null);
    const [email, setEmail] = useState(null);
    const [timerFinish, setTimerFinish] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);


    return (
        <QuestionContext.Provider value={{ question, setQuestion , email, setEmail, timerFinish, setTimerFinish, userAnswers, setUserAnswers }}>
        {props.children}
        </QuestionContext.Provider>
    );

}