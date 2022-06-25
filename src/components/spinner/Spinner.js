import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = () => {
	const loaderStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
	};

	return (
		<div style={loaderStyle}>
			<ClipLoader color='gray' loading={true} size={50} />
		</div>
	);
};

export default Spinner;
