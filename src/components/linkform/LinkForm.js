import React, { useState } from 'react';
import axios from '../../utilities/axios/axios';
import { useModalContext } from '../../context/modal.context';
import WrapperCard from '../wrappercard/WrapperCard';
import CustomInput from '../custominput/CustomInput';
import validUrl from 'valid-url';
import { useGetCurrentUser } from '../../context/user.context';

const LinkForm = () => {
	const { setOpenModal } = useModalContext();
	const currentUser = useGetCurrentUser();
	const [link, setLink] = useState('');
	const [fetching, setFetching] = useState(false);
	const [postFetching, setPostFetching] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validUrl.isUri(link)) {
			setOpenModal('Please provide a valid URL');
			return;
		}

		setFetching(true);
		try {
			const res = await axios.post('/createurl', {
				originalUrl: link,
				email: currentUser ? currentUser.email : null,
			});
			setLink(`https://simple-portal.herokuapp.com/${res.data.Url.hash}`);
			setPostFetching(true);
		} catch (error) {
			console.log(error.message);
		}
		setFetching(false);
	};

	const handleCopy = (e) => {
		e.preventDefault();
		navigator.clipboard.writeText(link);
		setLink('');
		setPostFetching(false);
	};

	return (
		<WrapperCard moreStyle=''>
			<h2 className=' text-center text-3xl font-extrabold text-gray-900'>Shrink My Link:</h2>
			<form onSubmit={(e) => handleSubmit(e)}>
				<CustomInput value={link} type='text' onChange={(e) => setLink(e.target.value)} placeholder='Enter Link Here' />
				{postFetching ? (
					<button onClick={handleCopy} className={` bg-black text-white px-3 py-2 rounded w-full mt-4 hover:bg-gray-800`}>
						Copy to clipboard
					</button>
				) : (
					<button type='submit' className={` bg-black text-white px-3 py-2 rounded w-full mt-4 hover:bg-gray-800`}>
						{fetching ? <p className='animate-pulse'>Please wait... </p> : 'Shrink it'}
					</button>
				)}
			</form>
		</WrapperCard>
	);
};

export default React.memo(LinkForm);
