import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/playScreen.css';
const PlayScreen = () => {
	const navigate = useNavigate();
	const [rightAnswers, setRightAnswers] = useState([]);
	const [wrongAnswers, setWrongAnswers] = useState([]);

	// paila save gareko list
	const localStorageVal = localStorage.getItem('quizListLS');
	const defaultQuizList = localStorageVal ? JSON.parse(localStorageVal) : [];

	const isQuizListEmpty = defaultQuizList.length === 0;

	return (
		<div className="play-quiz-page-main">
			<button
				className="go-back-button"
				onClick={() => {
					navigate('/');
				}}>
				🔙 Go Back
			</button>
			{isQuizListEmpty ? (
				<p>No Quizes. Please create one!</p>
			) : (
				<div>
					<p className="quiz-score">Score: {rightAnswers.length}</p>
					<div>
						{defaultQuizList.map((quiz, index) => {
							// quizId = 2

							// [1]
							const isRightAnswer = rightAnswers.includes(quiz.id); // false

							// [2]
							const isWrongAnswer = wrongAnswers.includes(quiz.id); // true

							const isAnswered = isRightAnswer || isWrongAnswer; // true
							return (
								<div
									className="quiz-item-container"
									key={index}
									style={{
										background: isRightAnswer
											? '#99FF88'
											: isWrongAnswer
											? '#FB7373'
											: 'white',
									}}>
									<div className="question-option-main">
										<p className="question-title">
											{index + 1}) {quiz.question}
										</p>
										<div className="answer-quiz-container">
											<button
												className="quiz-answer-submit-btn"
												disabled={isAnswered}
												style={{
													cursor: isAnswered ? 'not-allowed' : 'pointer',
													textDecoration: isAnswered
														? 'line-through'
														: 'initial',
												}}
												onClick={() => {
													if (quiz.answer === 'A') {
														setRightAnswers([...rightAnswers, quiz.id]);
													} else {
														setWrongAnswers([...wrongAnswers, quiz.id]);
													}
												}}>
												A. {quiz.optionA}
											</button>
											<button
												className="quiz-answer-submit-btn"
												disabled={isAnswered}
												style={{
													cursor: isAnswered ? 'not-allowed' : 'pointer',
													textDecoration: isAnswered
														? 'line-through'
														: 'initial',
												}}
												onClick={() => {
													if (quiz.answer === 'B') {
														setRightAnswers([...rightAnswers, quiz.id]);
													} else {
														setWrongAnswers([...wrongAnswers, quiz.id]);
													}
												}}>
												B. {quiz.optionB}
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default PlayScreen;
