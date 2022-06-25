import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/user.context';
const navigation = [
	{ name: 'Report', href: '/report', current: false },
	{ name: 'Expenses', href: '/expenses', current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Example() {
	const history = useHistory();
	const [location, setLocation] = useState('');
	const {
		state: { currentUser, isAdmin },
		setCurrentUser,
	} = useUserContext();
	let filteredNavigation = navigation.filter((nav) => {
		if (nav.name !== 'Dashboard') return nav;
		if (nav.name === 'Dashboard' && currentUser && !isAdmin) return nav;
	});
	useEffect(() => {
		console.log(
			history.listen((location) => {
				setLocation(location.pathname);
			})
		);
	}, [history]);

	const handleLogOut = () => {
		setCurrentUser(null);
		localStorage.clear();
		history.push('/login');
	};

	return (
		<Disclosure as='nav' className=''>
			{({ open }) => (
				<>
					<div className=' max-w-5xl mx-auto  '>
						<div className='relative flex items-center justify-between h-16 w-full'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden ml-2'>
								{/* Mobile menu button*/}
								<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md bg-black text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset'>
									<span className='sr-only'>Open main menu</span>
									{open ? <XIcon className='block h-6 w-6' aria-hidden='true' /> : <MenuIcon className='block h-6 w-6' aria-hidden='true' />}
								</Disclosure.Button>
							</div>

							<div className='flex-1 flex items-center justify-center md:justify-between sm:items-stretch '>
								<Link to='/'>
									<div className='flex items-center justify-start mr-10 md:mr-0'>
										<p className='text-xl font-light sm:text-2xl'>COSTLIVING</p>
									</div>
								</Link>
								<div className='hidden sm:block sm:ml-6 items-center justify-center'>
									<div className='flex space-x-4'>
										{filteredNavigation.map((item) => (
											<Link to={item.href} key={item.name} className={classNames(item.href === location ? 'bg-black text-white' : 'text-black hover:underline ', 'px-3 py-2 rounded-md text-sm font-normal ')} aria-current={item.href === location ? 'page' : undefined}>
												{item.name}
											</Link>
										))}
									</div>
								</div>

								<div className=' absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
									{/* Profile dropdown */}
									{currentUser ? (
										<Menu as='div' className='ml-3 relative'>
											{({ open }) => (
												<>
													<div>
														<Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
															<span className='sr-only'>Open user menu</span>
															<img className='h-10 w-10 rounded-full' src='https://i.imgur.com/8Km9tLL.jpg' alt='' />
														</Menu.Button>
													</div>
													<Transition show={open} as={Fragment} enter='transition ease-out duration-100' enterFrom='transform opacity-0 scale-95' enterTo='transform opacity-100 scale-100' leave='transition ease-in duration-75' leaveFrom='transform opacity-100 scale-100' leaveTo='transform opacity-0 scale-95'>
														<Menu.Items static className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
															{isAdmin ? (
																<Menu.Item>
																	{({ active }) => (
																		<Link to='/admin-panel' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
																			Admin Panel
																		</Link>
																	)}
																</Menu.Item>
															) : (
																<Menu.Item>
																	{({ active }) => (
																		<Link
																			to={{
																				pathname: '/profile',
																				state: currentUser,
																			}}
																			className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
																		>
																			{' '}
																			Your Profile
																		</Link>
																	)}
																</Menu.Item>
															)}
															<Menu.Item>
																{({ active }) => (
																	<Link to='/' onClick={handleLogOut} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
																		Sign out
																	</Link>
																)}
															</Menu.Item>
														</Menu.Items>
													</Transition>
												</>
											)}
										</Menu>
									) : (
										<div className='flex justify-end items-center'>
											<Link to='/login'>
												<button type='submit' className={`mr-0  text-black px-1 py-2 sm:px-3 sm:py-3 sm:mr-3 rounded w-full  hover:underline focus:outline-none`}>
													Login
												</button>
											</Link>
											<Link to='/register'>
												<button type='submit' className={` bg-black text-white px-1 py-2 sm:px-3 sm:py-3 rounded w-full  hover:bg-gray-800 focus:outline-none`}>
													Register
												</button>
											</Link>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1'>
							{filteredNavigation.map((item) => (
								<Link to={item.href} key={item.name} className={classNames(item.current ? 'bg-gray-900 text-white underline' : 'text-black hover:underline', 'block px-3 py-2 rounded-md text-base font-medium')} aria-current={item.current ? 'page' : undefined}>
									{item.name}
								</Link>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
