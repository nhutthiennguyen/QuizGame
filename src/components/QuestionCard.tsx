import React from 'react';
import { AnswerObject } from '../App';

import '../App.scss';

type Props = {
    question: string,
    answers: string[],
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | undefined,
    questionNumb: number,
    totalQuestions: number,
};

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNumb,
    totalQuestions,
}) => {
    
    return (
        <div className="question-card">
            <p className="number">
                Question: {questionNumb} / {totalQuestions}
            </p>
            <p>{question}</p>
            <div className="answer-button">
                {answers.map(answer => (
                    <div key={answer}>
                        <button className={userAnswer?.correctAnswer === answer ? "correct" : "incorrect"}  disabled={!!userAnswer ? true : false} value={answer} onClick={callback}>
                            <span>{answer}</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default QuestionCard;