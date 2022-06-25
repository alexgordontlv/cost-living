import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './formdialog.styles.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useUserContext } from '../../context/user.context';
import axios from '../../utilities/axios/axios';

function FormDialog({ id, name, email, role, setRender, addUser }) {
	const [state, setState] = useState({});
	useEffect(() => {
		setState({
			name: name,
			email: email,
		});
	}, [name, email]);

	const {
		state: { isAdmin },
		setCurrentUser,
	} = useUserContext();

	const [open, setOpen] = useState(false);
	const [checked, setChecked] = useState(role === 'admin' ? true : false);

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};
	const handleChecked = (event) => {
		setChecked((checked) => !checked);
		setState({ ...state, role: event.target.checked ? 'admin' : 'user' });
	};

	const handleSubmit = async () => {
		try {
			if (!addUser) {
				console.log('upate');
				const response = await axios.put('/update', { ...state, id });
				console.log(response.data);
				!isAdmin && setCurrentUser(state);
			} else {
				console.log('add');
				const response = await axios.post('/add-user', { ...state, id });
				console.log(response.data);
			}
		} catch (error) {
			return error;
		}
		setState({ name: '', email: '' });
		setRender && setRender((value) => !value);
		setOpen(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			{!addUser ? (
				<Button size='small' color='primary' onClick={() => setOpen(true)}>
					Update
				</Button>
			) : (
				<Button size='small' color='primary' variant='outlined' onClick={() => setOpen(true)}>
					Add User
				</Button>
			)}
			<Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'></DialogTitle>
				<DialogContent>
					<div className='container'>
						<div className='left'>
							<TextField
								autoFocus
								margin='dense'
								name='name'
								label='Name'
								type='text'
								value={state.name}
								onChange={handleChange}
								fullWidth
								className='field'
							/>
							<TextField
								margin='dense'
								name='email'
								label='Email'
								type='text'
								value={state.email}
								onChange={handleChange}
								fullWidth
								className='field'
							/>
						</div>
						<div className='right'>
							{isAdmin && <FormControlLabel control={<Checkbox checked={checked} onChange={handleChecked} name='role' />} label='Set Admin' />}
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant='outlined' className='button'>
						Cancel
					</Button>
					<Button onClick={handleSubmit} variant='outlined' className='button'>
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default FormDialog;
