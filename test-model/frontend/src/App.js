import React from "react";
import QuizContainer from "./Components/QuizContainer/QuizContainer";
import { engineeringQB } from "./Components/Quiz/question";
import { doctorQB } from "./Components/Quiz/question";
import { accQB } from "./Components/Quiz/question";
import { frontendQB } from "./Components/Quiz/question";
import { backendQB } from "./Components/Quiz/question";
import { fullStackQB } from "./Components/Quiz/question";
import { cyberSecurityQB } from "./Components/Quiz/question";
// import { exampleQB } from "./Components/Quiz/question";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element = {<LandingPage />} />
          <Route path="/doctor" element = {<QuizContainer quizzes={doctorQB}  model= 'doctor' />} />
          <Route path="/engineer" element = {<QuizContainer quizzes={engineeringQB} model = 'engineer' />} />
          <Route path="/ca" element = {<QuizContainer quizzes={accQB} model = 'accountant' />} />
          <Route path="/frontend" element = {<QuizContainer quizzes={frontendQB} model = 'frontend' />} />
          <Route path="/backend" element = {<QuizContainer quizzes={backendQB} model = 'backend' />} />
          <Route path="/fullstack" element = {<QuizContainer quizzes={fullStackQB} model = 'fullstack' />} />
          <Route path="/cyber" element = {<QuizContainer quizzes={cyberSecurityQB} model = 'cybersecurity' />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;