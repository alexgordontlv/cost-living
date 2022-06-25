import React from 'react';

const CustomInput = ({ value, type, onChange, placeholder, moreStyle, children }) => {
	return (
		<input
			value={value}
			type={type}
			onChange={(e) => onChange(e)}
			className={`mt-4 border-solid border w-full rounded px-3 py-2  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${moreStyle}`}
			placeholder={placeholder}
		/>
	);
};

export default CustomInput;
