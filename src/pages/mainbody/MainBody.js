import React from 'react';
const MainBody = () => {
	return (
		<div className='flex  justify-center'>
			<div className='grid grid-cols-1 max-w-5xl md:grid-cols-4 gap-2 '>Welcome to the cost living tracker</div>
		</div>
	);
};

export default React.memo(MainBody);
