import React, { useEffect } from 'react';
import Header from './components/header/Header';
import Mainpage from './pages/main/Mainpage';
import { BrowserRouter as Router } from 'react-router-dom';
import { useUserContext } from './context/user.context';
import Modal from './components/modal/Modal';
import './app.styles.css';
function App() {
	const context = useUserContext();
	const setUser = () => {
		const loggedInUser = localStorage.getItem('currentUser');
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			context.setCurrentUser(foundUser);
		}
	};
	useEffect(() => {
		setUser();
	}, []);

	return (
		<Router>
			<div className='app'>
				<Modal />
				<Header />
				<Mainpage />
			</div>
		</Router>
	);
}

export default App;
