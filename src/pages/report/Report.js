import React, { useState } from 'react';
import axios from '../../utilities/axios/axios';
import { useGetCurrentUser } from '../../context/user.context';
import { useQuery } from 'react-query';
import moment from 'moment';
import Spinner from '../../components/spinner/Spinner';
import CustomInput from '../../components/custominput/CustomInput';

const Report = () => {
	const [reports, setReports] = useState([]);
	const [month, setMonth] = useState(null);
	const [year, setYear] = useState(new Date().getFullYear());
	const [isLoading, setIsLoading] = useState(false);
	const currentUser = useGetCurrentUser();

	const fetchReport = async (date) => {
		setIsLoading(true);
		if (!month && year) {
			const { data } = await axios.get(`/report/${year}`, {
				headers: { USER_ID: currentUser._id },
			});
			console.log(data);
			setReports(data.report);
			setIsLoading(false);
		}
		if (month && year) {
			console.log('month', month);
			const { data } = await axios.get(`/report/${year}/${new Date(month).getMonth() + 1}`, {
				headers: { USER_ID: currentUser._id },
			});
			console.log(data);

			setIsLoading(false);
			setReports(data.report);
			console.log(data);
		}
	};

	console.log(month);
	console.log(year);
	console.log(reports);
	if (isLoading) return <Spinner />;
	return (
		<div className='flex justify-center mt-10'>
			<div className='-my-2 overflow-x-auto max-w-screen-lg'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<div scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
						Total Expenses Amount: {reports.reduce((prev, current) => prev + current.sum_val, 0)}
					</div>
					<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg '>
						<table className='min-w-full divide-y divide-gray-200 '>
							<thead className='bg-gray-50 '>
								<tr>
									<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Category
									</th>
									<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Total Amount
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{reports.length > 0 &&
									reports.map((expense, idx) => (
										<tr key={idx}>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center justify-center'>
													<div className='ml-4'>
														<div className='text-sm font-medium text-gray-900 cursor-pointer'>{expense._id}</div>
													</div>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>{expense.sum_val}</div>
											</td>
										</tr>
									))}
							</tbody>
						</table>
						<div className=' text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Pick a month</div>
						<CustomInput value={month} type='month' placeholder='Date' onChange={(e) => setMonth(e.target.value)} />
						<div className=' text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Pick a year</div>
						<CustomInput value={year} type='number' placeholder='Year' onChange={(e) => setYear(e.target.value)} min='1900' max='2099' />

						<button type='submit' className={` bg-black text-white px-3 py-2 rounded w-full hover:bg-gray-800 cursor-pointer`} onClick={() => fetchReport(true)}>
							Get Report
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Report;
