import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/createScreen.css';

const CreateScreen = () => {
	const [question, setQuestion] = useState('');
	const [optionA, setOptionA] = useState('');
	const [optionB, setOptionB] = useState('');
	const [answer, setAnswer] = useState('A');

	const [editId, setEditId] = useState(0);

	const localServerVal = localStorage.getItem('quizListLS');
	const defaultVal = localServerVal ? JSON.parse(localServerVal) : [];
	const [quizList, setQuizList] = useState(defaultVal);

	useEffect(() => {
		localStorage.setItem('quizListLS', JSON.stringify(quizList));
	}, [quizList]);

	const handleCreateSubmit = () => {
		if (!question || !optionA || !optionB || !answer) return;
		const item = {
			question,
			optionA,
			optionB,
			answer,
			id: Date.now(),
		};

		const updatedList = [...quizList, item];
		setQuizList(updatedList);
		setQuestion('');
		setOptionA('');
		setOptionB('');
		setAnswer('A');
	};

	const handleDelete = (deleteId) => {
		const deletedList = quizList.filter((item) => {
			return item.id !== deleteId;
		});
		setQuizList(deletedList);
	};

	const handleEdit = (question, optionA, optionB, id) => {
		setQuestion(question);
		setOptionA(optionA);
		setOptionB(optionB);
		setEditId(id);
	};

	const handleEditSubmit = () => {
		const updateList = quizList.map((item) => {
			if (item.id === editId) {
				return {
					question,
					optionA,
					optionB,
					answer,
					id: item.id,
				};
			}
			return item;
		});
		setQuizList(updateList);
		setQuestion('');
		setOptionA('');
		setOptionB('');
		setAnswer('A');
	};

	const navigate = useNavigate();
	return (
		<div>
			<button
				className="go-back-create-button"
				onClick={() => {
					navigate('/');
				}}>
				🔙 Go Back
			</button>
			<div className="create-screen-main-container">
				<div className="create-question-form">
					<h1 className="create-page-header">
						{editId ? 'EDIT A QUESTION' : 'CREATE A QUESTION'}
					</h1>
					<div className="create-question-input">
						<p>Question</p>
						<input
							type="text"
							placeholder="Enter question here"
							value={question}
							onChange={(e) => {
								setQuestion(e.target.value);
							}}
						/>
						<p>Option A</p>
						<input
							type="text"
							placeholder="Enter question here"
							value={optionA}
							onChange={(e) => {
								setOptionA(e.target.value);
							}}
						/>
						<p>Option B </p>
						<input
							type="text"
							placeholder="Enter question here"
							value={optionB}
							onChange={(e) => {
								setOptionB(e.target.value);
							}}
						/>
						<p>Answer</p>
						<select
							value={answer}
							onChange={(e) => {
								setAnswer(e.target.value);
							}}>
							<option value="A">Option A </option>
							<option value="B">Option B </option>
						</select>
						<div>
							{editId ? (
								<button className="submit-btn" onClick={handleEditSubmit}>
									Save Question
								</button>
							) : (
								<button className="submit-btn" onClick={handleCreateSubmit}>
									Submit Question
								</button>
							)}
						</div>
					</div>
				</div>
				<div className="quiz-questions-container">
					<h1 className="quiz-list-header">QUIZ LIST</h1>
					{quizList.map((item, index) => {
						return (
							<div className="quiz-item-container" key={index}>
								<div className="question-option-main">
									<p className="question-title">
										{index + 1}) {item.question}
									</p>
									<div className="answer-quiz-container">
										<p>A. {item.optionA}</p>
										<p>B. {item.optionB}</p>
									</div>
								</div>
								<div className="edit-delete-quiz">
									<button
										className="edit-quiz-btn"
										onClick={() => {
											handleEdit(
												item.question,
												item.optionA,
												item.optionB,
												item.id
											);
										}}>
										Edit
									</button>
									<button
										className="delete-quiz-btn"
										onClick={() => {
											handleDelete(item.id);
										}}>
										Delete
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CreateScreen;
