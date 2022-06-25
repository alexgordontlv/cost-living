import React, { createContext, useContext, useReducer } from 'react';
import { modalReducer } from './modal.reducer';

const ModalContext = createContext();

export const useModalContext = () => {
	return useContext(ModalContext);
};

const modalInitialState = {
	openModal: false,
	message: '',
};

export const ModalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(modalReducer, modalInitialState);

	const setOpenModal = (message) => {
		dispatch({ type: 'OPEN_MODAL', payload: message });
	};
	const setCloseModal = () => {
		dispatch({ type: 'CLOSE_MODAL', payload: '' });
	};
	return <ModalContext.Provider value={{ state, setOpenModal, setCloseModal }}>{children}</ModalContext.Provider>;
};
