import React, { useState } from "react";
import axios from "axios";
import "../Quiz/Quiz.css";
import Footer from "../Footer";
import UserCredentialsForm from "./user";
import Quiz from "../Quiz/Quiz";

const QuizContainer = ({ quizzes, model }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizResults, setQuizResults] = useState([]);
  const [showres, setShowres] = useState(true);
  const [prediction, setPrediction] = useState("");
  const [predictionLabel, setPredictionLabel] = useState("");
  const [userData, setUserData] = useState(null);

  const quizNames = ["Extraversion Test", "Conscientiousness", "Aptitude", "Domain"];

  const handleQuizEnd = (correctAnswers, totalQuestions) => {
    const score = (correctAnswers * 100) / totalQuestions;
    setQuizResults((prevResults) => [...prevResults, score]);

    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setShowres(false);
      // Store user data in local storage
      if (userData) {
        localStorage.setItem('user_data', JSON.stringify(userData));
      }
    }
  };

  const getPrediction = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/${model}`,
        { input_features: quizResults }
      );
      console.log(response.data);
      const predictionLabel = response.data.prediction_label;
      setPrediction(predictionLabel);
      setPredictionLabel(predictionLabel);
    } catch (error) {
      console.error('Error getting prediction:', error);
    }
  };

  const handleUserDataSubmit = (data) => {
    setUserData(data);
    localStorage.setItem('user_data', JSON.stringify(data));
  };

  const handleSubmit = async () => {
    console.log("Submit");
    console.log(userData);
    console.log(quizResults);
    console.log(prediction);
    console.log(predictionLabel);

    try {
      await axios.post('http://localhost:5000/api/save-results', {
        name: userData.name,
        college: userData.college,
        email: userData.email,
        quizResults: [
          quizResults[0], // extraversion
          quizResults[1], // conscientiousness
          quizResults[2], // aptitude
          quizResults[3], // domain
        ],
        predictionLabel,
      });
      console.log('Results saved to the database');
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  return (
    <div>
      {showres ? (
        <>
          <UserCredentialsForm onSubmit={handleUserDataSubmit} />
          <Quiz ques={quizzes[currentQuizIndex]} onEnd={handleQuizEnd} />
        </>
      ) : (
        <div className="quiz-container">
          Your Result For the tests:
          <ul>
            {quizResults.map((item, index) => (
              <li className="quiz-result-ex" key={index}>
                <div className="quiz-result-name">{quizNames[index]}</div>
                <div className="quiz-result-result">{item}</div>
              </li>
            ))}
          </ul>
          <div className="quiz-result-buttons">
            <button onClick={getPrediction}>Predict</button>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeF6pXqA8XJjGDdKrCJIbEwdeRKIye3SEhD7KwYeq39fNePEA/viewform?embedded=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>Feedback Form</button>
            </a>
          </div>
          <p className="quiz-result-desc">
            {prediction === "" ? (
              <p></p>
            ) : prediction === "Capable" ? (
              <p>
                Congratulations on your remarkable achievement! Your qualification in the test speaks volumes about your dedication and competence. Wishing you continued success and fulfillment as you embark on this journey.
              </p>
            ) : (
              <p className="nc">
                Though you haven't yet reached the qualification mark for that specific domain, your dedication to improving in aptitude, personality, and academics is commendable. Keep up the excellent work, and your efforts will surely yield success.
              </p>
            )}
          </p>
          <button onClick={handleSubmit}>Submit</button>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default QuizContainer;
