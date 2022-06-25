import React, { useState } from 'react';
import axios from '../../utilities/axios/axios';
import { useGetCurrentUser } from '../../context/user.context';
import { useQuery } from 'react-query';
import moment from 'moment';
import Spinner from '../../components/spinner/Spinner';

const Dashboard = () => {
	const currentUser = useGetCurrentUser();
	console.log('USER ID', currentUser._id);
	const { isLoading, error, data } = useQuery('users', async () => {
		const { data } = await axios.get(`/userurls/${currentUser.id}`, {
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
					<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Category
									</th>
									<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Hashed URL
									</th>
									<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Created At
									</th>
									<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Last Viewed
									</th>
									<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										View Count
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{data.map((link, idx) => (
									<tr key={idx}>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center justify-center'>
												<div className='ml-4'>
													<div className='text-sm font-medium text-gray-900 cursor-pointer' onClick={() => window.open(`https://simple-portal.herokuapp.com/${link.hash}`, '_blank')}>
														{link.originalUrl?.length > 30 ? link.originalUrl.slice(0, 30) + '...' : link.originalUrl}
													</div>
												</div>
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-900'>{link.hash}</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-900'>{moment(link.createdAt).format('Do MMMM YYYY')}</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-900'>{moment(link.updatedAt).format('lll ')}</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{link.viewCount}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
