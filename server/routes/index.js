const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../repository/userRepository');
const User = require('../models/user');

//Show main page
router.get('/', (req, res) => {
	res.render('index', { layout: 'index' });
});

//Show login page
router.post('/login', async (req, res) => {
	console.log('LOGON', req.body);
	const user = await getUserByEmail(req.body.email);
	if (!user) {
		return res.status(401).json("msg: 'no such user'");
	}
	if (req.body.password === user.password) {
		return res.status(200).send(user);
	} else {
		return res.status(401).json("msg: 'password not match'");
	}
});

//@post registration
router.post('/register', async (req, res) => {
	const isEmailExist = await User.findOne({ email: req.body.email });
	// throw error when email already registered
	if (isEmailExist) return res.status(400).json({ error: 'Email already exists' });

	console.log('REQ:', req.body);
	const user = new User({
		first_name: req.body.firstName,
		last_name: req.body.lastName,
		birthday: req.body.birthday,
		marital_status: req.body.maritalStatus,
		email: req.body.email,
		password: req.body.password,
	});
	try {
		const savedUser = await user.save();
		user_id = savedUser._id;
		res.send(savedUser);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error });
	}
});
module.exports = router;
