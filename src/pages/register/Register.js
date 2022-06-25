import React, { useState } from 'react';
import axios from '../../utilities/axios/axios';
import { useHistory } from 'react-router-dom';
import { useModalContext } from '../../context/modal.context';
import { useUserContext } from '../../context/user.context';
import WrapperCard from '../../components/wrappercard/WrapperCard.js';
import CustomInput from '../../components/custominput/CustomInput';
const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [birthday, setBirthday] = useState('');
	const [maritalStatus, setMaritalStatus] = useState('Single');

	const [loading, setLoading] = useState('');
	let history = useHistory();
	const { setOpenModal } = useModalContext();
	const { setCurrentUser } = useUserContext();
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!email || !password || !firstName || !lastName || !maritalStatus || !birthday) {
			setOpenModal('Please fill the form currectly');
			return;
		}

		try {
			console.log('PARAMS:', email, firstName, lastName, birthday, maritalStatus);
			const respone = await axios.post('/register', {
				email,
				password,
				firstName,
				lastName,
				birthday,
				maritalStatus,
			});
			console.log(respone);
			setCurrentUser(respone.data);
			setLoading(false);
			respone && history.push('/login');
		} catch (error) {
			console.log('ERROR:', error);
		}
		setLoading(false);
		setPassword('');
		setFirstName('');
		setLastName('');
		setMaritalStatus('');
		setEmail('');
	};

	return (
		<WrapperCard>
			<h2 className=' text-center text-3xl font-extrabold text-gray-900'>Register</h2>
			<form onSubmit={handleSubmit}>
				<CustomInput value={email} type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
				<CustomInput value={firstName} type='text' placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
				<CustomInput value={lastName} type='text' placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
				<select className='mt-4 border-solid border w-full rounded px-3 py-2  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' aria-label='Default select example' onChange={(e) => setMaritalStatus(e.target.value)}>
					<option value='Single'>Single</option>
					<option value='Married'>Married</option>
					<option value='Widowed'>Widowed</option>
					<option value='Divorced'>Divorced</option>
				</select>
				<CustomInput value={birthday} type='date' placeholder='BirthDay' onChange={(e) => setBirthday(e.target.value)} />
				<CustomInput value={password} type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
				<button type='submit' className={` bg-black text-white px-3 py-2 rounded w-full mt-4 hover:bg-gray-800`}>
					{loading ? <p className='animate-pulse'>Please wait... </p> : 'Register'}
				</button>
			</form>
		</WrapperCard>
	);
};

export default Register;
