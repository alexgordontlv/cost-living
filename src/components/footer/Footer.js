import React, { useState } from 'react';
import { useModalContext } from '../../context/modal.context';
import CustomInput from '../custominput/CustomInput';

const Footer = () => {
	const [link, setLink] = useState('');
	const [fetching, setFetching] = useState(false);
	const { setOpenModal } = useModalContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!link || !link.includes('@')) {
			setOpenModal('Please provide a valid email');
			return;
		}
		setFetching(true);
	};

	return (
		<div className='flex justify-center self-start'>
			<div className='flex-col w-8/12'>
				<div className=' '>
					<form onSubmit={handleSubmit} className='flex items-center justify-center '>
						<CustomInput value={link} type='text' moreStyle='mb-4' onChange={(e) => setLink(e.target.value)} placeholder='Enter email to get more info' />
						<button type='submit' className={` bg-black text-white p-2   rounded   hover:bg-gray-800 ml-3`}>
							<svg xmlns='http://www.w3.org/2000/svg' className={`h-6 w-6 ${fetching && 'animate-pulse'}`} fill='none' viewBox='0 0 24 24' stroke='currentColor' style={{ color: '#15bbca' }}>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} className='ml-5' d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z' />
							</svg>
						</button>
					</form>
				</div>
				<div className='flex items-center justify-evenly w-full mt-3 font-semibold'>
					<p>LinkedIn</p> .<p>Facebook</p> .<p>Instragram</p>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Footer);
