import { QuestionContext } from "./context/QuestionContext";
import React, { useContext, useEffect } from "react";
import Welcome from "./components/Welcome";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Test from "./components/Test";


function App() {
  const { question, setQuestion } = useContext(QuestionContext);

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

  console.log(question,"Questions found");

  return (
    <div>
      
        <BrowserRouter>
              <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/test" element={<Test/>}/>
              </Routes>
        </BrowserRouter>
        </div>
  );
}

export default App;
