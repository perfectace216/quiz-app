import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/homeScreen.css';

const HomeScreen = () => {
	const navigate = useNavigate();
	return (
		<div className="create-screen-main">
			<button
				className="create-home-btn"
				onClick={() => {
					navigate('/create');
				}}>
				Create
			</button>
			<button
				className="play-home-btn"
				onClick={() => {
					navigate('/play');
				}}>
				Play
			</button>
		</div>
	);
};

export default HomeScreen;
