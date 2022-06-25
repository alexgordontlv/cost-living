import React, { createContext, useContext, useReducer } from 'react';
import { contextReducer } from './user.reducer';

const UserContext = createContext();

export const useUserContext = () => {
	return useContext(UserContext);
};
export const useGetCurrentUser = () => {
	const {
		state: { currentUser },
	} = useUserContext();
	return currentUser;
};

const initialState = {
	currentUser: null,
	isAdmin: false,
};

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(contextReducer, initialState);

	const setCurrentUser = (user) => {
		console.log(user);
		dispatch({ type: 'SET_CURRENT_USER', payload: user });
	};

	return <UserContext.Provider value={{ state, setCurrentUser }}>{children}</UserContext.Provider>;
};
