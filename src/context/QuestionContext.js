import React, { createContext, useState } from "react";

export const QuestionContext = createContext();

export const QuestionContextProvider = props => {

    const [question, setQuestion] = useState(null);
    const [email, setEmail] = useState(null);


    return (
        <QuestionContext.Provider value={{ question, setQuestion , email, setEmail }}>
        {props.children}
        </QuestionContext.Provider>
    );

}