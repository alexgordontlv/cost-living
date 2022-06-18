const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Product = require('../models/cost-living');
const User = require('../models/user');
let alert = require('alert');

router.get('/', ensureGuest, (req, res) => {
	res.render('index', { layout: 'index' });
});

router.get('/records', ensureAuth, async (req, res) => {
	try {
		const products = await Product.find({ userId: req.user.id }).populate('category').lean();
		const agg = Product.aggregate([
			{ $group: { _id: '$category', sum_val: { $sum: '$price' } } },
			{
				$lookup: {
					from: 'categories',
					localField: '_id',
					foreignField: '_id',
					as: 'category',
				},
			},
		]);
		const agg2 = await Product.aggregate([{ $group: { _id: null, sum_val: { $sum: '$price' } } }]);
		console.log('AGG2:', agg2);
		const sumByCategory = [];
		for await (const doc of agg) {
			sumByCategory.push({ ...doc, category: doc.category[0].name });
		}
		console.log('SUM BY Category Is :', JSON.stringify(sumByCategory));
		res.render('records', {
			name: req.user.first_name,
			sumByCategory,
			totalSum: agg2[0].sum_val,
			products,
		});
	} catch (err) {
		console.error(err);
		res.render('error/500');
	}
	console.log(req.user);
});

router.get('/login', ensureGuest, (req, res) => {
	res.render('login', { layout: 'login' });
});

//Show signin page
router.get('/signin', ensureGuest, (req, res) => {
	res.render('signin', { layout: 'signin' });
});
router.post('/signin', ensureGuest, async (req, res) => {
	const isEmailExist = await User.findOne({ email: req.body.email });
	// throw error when email already registered
	if (isEmailExist) return alert('Email already exists');
	const user = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		birthday: req.body.birthday,
		marital_status: req.body.marital_status,
		email: req.body.email,
		password: req.body.password,
	});
	try {
		const savedUser = await user.save();
		user_id = savedUser._id;
		alert('User created successfully!!');
		res.redirect('/');
		// res.json({  error: null, data: { userId: savedUser._id } });
	} catch (error) {
		res.status(400).json({ error });
	}
});
module.exports = router;
