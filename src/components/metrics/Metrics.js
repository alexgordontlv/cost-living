/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { ReactComponent as DataLogo } from '../../assets/data2.svg';
import { Link } from 'react-router-dom';
import axios from '../../utilities/axios/axios';
import { useUserContext } from '../../context/user.context';
import { useHistory } from 'react-router-dom';
import { useModalContext } from '../../context/modal.context';

const Metrics = () => {
	const context = useUserContext();
	let history = useHistory();
	const { setOpenModal } = useModalContext();
	const handleSubmit = async () => {
		if (context.state.currentUser) {
			setOpenModal('You allready signed in');
			return;
		}
		try {
			const response = await axios.post('/login', {
				email: 'test@gmail.com',
				password: 'test123',
			});
			if (response.data) {
				const responseUser = response.data;
				context.setCurrentUser(responseUser);
				localStorage.setItem('currentUser', JSON.stringify(responseUser));
				history.push('/');
			}
		} catch (error) {
			console.log('ERROR:', error);
		}
	};

	return (
		<div className='flex-col mt-10 self-start'>
			<h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
				<span className='block'>Get metrics for every link!</span>
				<span className='block' style={{ color: '#15bbca' }}>
					Start your free membership today.
				</span>
			</h2>
			<div className='flex justify-center items-center'>
				<DataLogo className='w-96 h-96' />
			</div>
			<div className=' flex lg:flex-shrink-0 justify-center items-center mt-8'>
				<div className='inline-flex rounded-md shadow'>
					<button
						onClick={() => handleSubmit()}
						className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800'>
						Demo Sign In
					</button>
				</div>
				<div className='ml-3 inline-flex '>
					<Link to='/about' className='inline-flex items-center justify-center px-5 py-3 text-base font-medium  text-black hover:underline'>
						Learn more
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Metrics;
