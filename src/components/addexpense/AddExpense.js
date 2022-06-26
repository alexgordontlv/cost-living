import React, { useState } from 'react';
import axios from '../../utilities/axios/axios';

import WrapperCard from '../wrappercard/WrapperCard.js';
import CustomInput from '../custominput/CustomInput';
import { useMutation, useQueryClient } from 'react-query';

const AddExpense = (props) => {
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('Home');
	const queryClient = useQueryClient();

	const mutation = useMutation(
		(newExpense) => {
			return axios.post('/costlivings', newExpense, {
				headers: { Authorization: `${props.currentUserId}` },
			});
		},
		{
			onSuccess: (data) => {
				console.log('NEW DATA', data);
				queryClient.invalidateQueries('expenses');
			},
		}
	);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			if (!name || !price || !date || !category) {
				console.log('Wrong params');
				return;
			}
			mutation.mutate({
				name,
				date,
				price,
				category,
			});
		} catch (error) {
			console.log('ERROR:', error);
		}
		props.addInsideExpense(false);
	};

	return (
		<WrapperCard>
			<h2 className=' text-center text-3xl font-extrabold text-gray-900'>Add Expense</h2>
			<form onSubmit={handleSubmit}>
				<CustomInput value={name} type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} />
				<CustomInput value={price} type='number' placeholder='Amount' onChange={(e) => setPrice(e.target.value)} />
				<CustomInput value={date} type='date' placeholder='Date' onChange={(e) => setDate(e.target.value)} />
				<select className='mt-4 border-solid border w-full rounded px-3 py-2  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' aria-label='Default select example' onChange={(e) => setCategory(e.target.value)}>
					<option value='Home'>Home</option>
					<option value='Transportation'>Transportation</option>
					<option value='Entertainment'>Entertainment</option>
					<option value='Food'>Food</option>
					<option value='Health'>Health</option>
					<option value='Sport'>Sport</option>
					<option value='Private'>Private</option>
					<option value='Education'>Education</option>
				</select>
				<button type='submit' className={` bg-black text-white px-3 py-2 rounded w-full mt-4 hover:bg-gray-800`}>
					Add Expense
				</button>
			</form>
		</WrapperCard>
	);
};

export default AddExpense;
