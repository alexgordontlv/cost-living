import React, { useState } from 'react';
import { useUserContext } from '../../context/user.context';
import axios from '../../utilities/axios/axios';
import { useHistory } from 'react-router-dom';
import { useModalContext } from '../../context/modal.context';
import WrapperCard from '../../components/wrappercard/WrapperCard.js';
import CustomInput from '../../components/custominput/CustomInput';

const Login = () => {
	const context = useUserContext();
	let history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const { setOpenModal } = useModalContext();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!email || !password) {
			setOpenModal('Please fill the form currectly');
			return;
		}
		setLoading(true);
		try {
			const response = await axios.post('/login', {
				email,
				password,
			});
			if (response) {
				console.log(response);
				context.setCurrentUser(response.data);
				localStorage.setItem('currentUser', JSON.stringify(response.data));
				history.push('/');
			}
		} catch (error) {
			console.log('ERROR:', error);
		}
		setPassword('');

		setEmail('');
		setLoading(false);
	};

	return (
		<WrapperCard>
			<h2 className=' text-center text-3xl font-extrabold text-gray-900'>Sign In</h2>
			<form onSubmit={handleSubmit}>
				<CustomInput value={email} type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
				<CustomInput value={password} type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
				<button type='submit' className={` bg-black text-white px-3 py-2 rounded w-full mt-4 hover:bg-gray-800`}>
					{loading ? <p className='animate-pulse'>Please wait... </p> : 'Sign In'}
				</button>
			</form>
		</WrapperCard>
	);
};

export default Login;
