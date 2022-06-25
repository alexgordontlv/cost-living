import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useUserContext } from '../../context/user.context';
import axios from '../../utilities/axios/axios';
import { Box } from '@material-ui/core';

function DeleteDialog({ id }) {
	const {
		state: { isAdmin },
		setCurrentUser,
	} = useUserContext();

	const [open, setOpen] = useState(false);

	const handleSubmit = async () => {
		console.log('sublmir', id);
		try {
			const response = await axios.delete('/delete', { data: { id } });
			console.log(response.date);
			!isAdmin && setCurrentUser(null);
		} catch (error) {
			return error;
		}
		setOpen(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box width='100%'>
			<div>
				<Button size='small' color='primary' onClick={() => setOpen(true)}>
					Delete
				</Button>
				<Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
					<DialogTitle id='form-dialog-title'></DialogTitle>
					<DialogContent>
						<div className='container'>ARE YOU SURE YOU WANT TO DELETE?</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} variant='outlined' className='button'>
							Cancel
						</Button>
						<Button onClick={handleSubmit} variant='outlined' className='button'>
							Yes
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</Box>
	);
}

export default DeleteDialog;
