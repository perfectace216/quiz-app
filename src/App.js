import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import CreateScreen from './pages/CreateScreen';
import PlayScreen from './pages/PlayScreen';

function App() {
	return (
		<div>
			<Routes>
				<Route path={'/'} element={<HomeScreen />} />
				<Route path={'/create'} element={<CreateScreen />} />
				<Route path={'/play'} element={<PlayScreen />} />
			</Routes>
		</div>
	);
}

export default App;
