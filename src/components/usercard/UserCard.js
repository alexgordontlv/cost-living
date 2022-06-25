import React from 'react';
import Spinner from '../spinner/Spinner';
import { useQuery } from 'react-query';
import axios from '../../utilities/axios/axios';
import { useUserContext } from '../../context/user.context';

export default function UserCard() {
	const {
		state: { currentUser },
	} = useUserContext();

	const { isLoading, error, data } = useQuery('links', async () => {
		const { data } = await axios.get(`/users/${currentUser.id}`);
		return data;
	});

	if (isLoading) return <Spinner />;
	if (error) return 'An error has occurred: ' + error.message;

	return (
		<div className='flex justify-center mt-10'>
			<div className='rounded rounded-t-lg overflow-hidden shadow max-w-xl my-3'>
				<img alt='logo' src='https://i.imgur.com/dYcYQ7E.png' className='w-full' loading='lazy' />
				<div className='flex justify-center -mt-8'>
					<img
						alt='profile'
						src='https://i.imgur.com/8Km9tLL.jpg'
						className='rounded-full border-solid border-white border-2 -mt-3'
						loading='lazy'
					/>
				</div>
				<div className='text-center px-3 pb-6 pt-2'>
					<h3 className='text-black text-lg font-normal '>{`Email: ${data.email}`}</h3>
					<p className='mt-2 text-grey-dark text-md font-normal'>{`Role: ${data.role}`}</p>
				</div>
				<div className='flex justify-center pb-3 text-grey-dark'>
					<div className='text-center mr-3 border-r pr-3'>
						<h2>34</h2>
						<span>Links</span>
					</div>
					<div className='text-center'>
						<h2>42</h2>
						<span>Total Views</span>
					</div>
				</div>
			</div>
		</div>
	);
}
