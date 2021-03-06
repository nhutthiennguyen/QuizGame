import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
import { Difficulty, QuestionState } from './API';
import QuestionCard from './components/QuestionCard';
import  './App.scss';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {


  const TOTAL_QUESTION = 10;

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTION,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);
      
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(prev => [...prev, answerObject])
    }
  }
  const nextQuestion = () => {
      const nextQuestion = number + 1;
      if (nextQuestion === TOTAL_QUESTION){
        setGameOver(true)
      }else{
        setNumber(nextQuestion)
      }
  }

  return (
    
    <div className="App">
      <h1>React QUIZ</h1>
      {!!gameOver || userAnswers.length === TOTAL_QUESTION ? (
        <button className="start" onClick={startQuiz}>
          Start
        </button>
      ) : null}

      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {!!loading && <p className="loading">Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          question={questions[number].question}
          answers={questions[number].answer}
          callback={checkAnswer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          questionNumb={number + 1}
          totalQuestions={TOTAL_QUESTION}
          
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
        <button className="next" onClick={nextQuestion}> Next Question </button>
      ) : null}
    </div>
    
  );
}

export default App;
