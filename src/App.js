import React from "react";
import Welcome from "./components/Welcome";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Test from "./components/Test";
import Report from "./components/Report";


function App() {
  

 

  return (
    <div>
      
        <BrowserRouter>
              <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/test" element={<Test/>}/>
                <Route path="/report" element={<Report/>}/>
              </Routes>
        </BrowserRouter>
        </div>
  );
}

export default App;
