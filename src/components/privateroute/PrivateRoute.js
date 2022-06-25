import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../../context/user.context';

const PrivateRoute = ({ component: Component, admin, ...rest }) => {
	const {
		state: { currentUser, isAdmin },
	} = useUserContext();
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!currentUser) {
					return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
				}
				if (admin && !isAdmin) {
					return <Redirect to={{ pathname: '/' }} />;
				}

				return <Component {...props} />;
			}}
		/>
	);
};
export default PrivateRoute;
