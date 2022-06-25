export const modalState = {
	open: false,
};

export const handleModal = (event) => {
	console.log(event, modalState);
	if (event === 'open') {
		modalState.open = true;
		return;
	}
	modalState.open = false;
};
