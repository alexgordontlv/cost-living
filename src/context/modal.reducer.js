export const modalReducer = (state, action) => {
	switch (action.type) {
		case 'OPEN_MODAL':
			return {
				...state,
				openModal: true,
				message: action.payload,
			};
		case 'CLOSE_MODAL':
			return {
				...state,
				openModal: false,
				message: '',
			};
		default:
			return state;
	}
};
