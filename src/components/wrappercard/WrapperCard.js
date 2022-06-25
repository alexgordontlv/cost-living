import React from 'react';

const WrapperCard = ({ children, moreStyle }) => {
	return (
		<div className='flex text-center justify-center mt-10'>
			<div className={`shadow-md rounded to  w-11/12 md:max-w-xl	 bg-gray-50 border-solid  p-6 my-2 ${moreStyle}`}>{children}</div>
		</div>
	);
};

export default WrapperCard;
