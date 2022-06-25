import React, { Suspense } from 'react';

import { useUserContext } from '../../context/user.context';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../../components/privateroute/PrivateRoute';
import Spinner from '../../components/spinner/Spinner';
import { QueryClient, QueryClientProvider } from 'react-query';

const Login = React.lazy(() => import('../login/Login'));
const MainBody = React.lazy(() => import('../mainbody/MainBody'));
const Register = React.lazy(() => import('../register/Register'));
const UserCard = React.lazy(() => import('../../components/usercard/UserCard'));
const Dashboard = React.lazy(() => import('../dashboard/Dashboard'));
const Expenses = React.lazy(() => import('../Expenses/Expenses'));
const queryClient = new QueryClient();

const Mainpage = () => {
	const {
		state: { currentUser },
	} = useUserContext();
	return (
		<div className='main'>
			<Switch>
				<Suspense fallback={<Spinner />}>
					<QueryClientProvider client={queryClient}>
						<Route exact path='/' component={MainBody} />
						<Route path='/login' render={(props) => (!currentUser ? <Login /> : <Redirect to='/' />)} />
						<Route path='/register' component={Register} />
						<PrivateRoute path='/expenses' component={Expenses} />
						<PrivateRoute path='/profile' component={UserCard} />
						<PrivateRoute path='/dashboard' component={Dashboard} />
					</QueryClientProvider>
				</Suspense>
			</Switch>
		</div>
	);
};

export default Mainpage;
