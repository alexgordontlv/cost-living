import React, { useState } from 'react';
import axios from '../../utilities/axios/axios';
import { useGetCurrentUser } from '../../context/user.context';
import { useQuery } from 'react-query';
import moment from 'moment';
import Spinner from '../../components/spinner/Spinner';
import AddExpense from '../../components/addexpense/AddExpense';

const Expenses = () => {
	const [addExpense, setAddExpense] = useState(false);
	const currentUser = useGetCurrentUser();

	console.log('USER ID', currentUser._id);
	const { isLoading, error, data } = useQuery('expenses', async () => {
		const { data } = await axios.get(`/costlivings/`, {
			headers: { USER_ID: currentUser._id },
		});
		return data;
	});

	if (isLoading) return <Spinner />;
	if (error) return 'An error has occurred: ' + error.message;
	return (
		<div className='flex justify-center mt-10'>
			<div className='-my-2 overflow-x-auto max-w-screen-lg'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<div scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
						Total Expenses Amount: {data.totalSum}
					</div>
					<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg '>
						<table className='min-w-full divide-y divide-gray-200 '>
							<thead className='bg-gray-50 '>
								<tr>
									<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Category
									</th>
									<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Name
									</th>
									<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Date
									</th>
									<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Amount
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{data.costLivings.length > 0 &&
									data.costLivings.map((expense, idx) => (
										<tr key={idx}>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center justify-center'>
													<div className='ml-4'>
														<div className='text-sm font-medium text-gray-900 cursor-pointer'>{expense.category.name}</div>
													</div>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>{expense.name}</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>{moment(expense.date).format('Do MMMM YYYY')}</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>{expense.price}</div>
											</td>
										</tr>
									))}
							</tbody>
						</table>
						<button type='submit' className={` bg-black text-white px-3 py-2 rounded w-full mt-4 hover:bg-gray-800 cursor-pointer`} onClick={() => setAddExpense(true)}>
							Add Expense
						</button>
						{addExpense ? <AddExpense currentUserId={currentUser._id} addInsideExpense={setAddExpense} /> : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Expenses;
