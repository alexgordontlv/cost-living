const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const CostLiving = require('../models/costLiving');
const Category = require('../models/category');
const User = require('../models/user');
const { lastDayOfMonth, firstDayOfMonth } = require('../helpers/dateHelpers');

//Show add User = require('../models/user'); page
router.get('/add', ensureAuth, (req, res) => {
	res.render('products/add');
});

router.get('/', ensureAuth, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user.id }).lean();
		if (user) {
			res.render('records', {
				name: req.user.first_name,
				products: user.cost_livings.records,
				totalSum: user.cost_livings.total_sum,
			});
		}
	} catch (err) {
		console.error(err);
		res.render('error/500');
	}
});

router.get('/report/:reportYear/:reportMonth', ensureGuest, async (req, res) => {
	console.log('HI:');

	try {
		const { reportYear, reportMonth } = req.params;
		if (reportYear === null || reportMonth === null) {
			console.log('NO PARAMS');
			return;
		}
		const date1 = firstDayOfMonth(reportYear, reportMonth);
		const date2 = lastDayOfMonth(reportYear, reportMonth);
		console.log('DATE1:', date1, 'DATE2:', date2);
		const agg = await User.aggregate([
			{ $unwind: '$cost_livings' },
			{ $unwind: '$cost_livings.records' },
			{
				$match: {
					'cost_livings.records.date': {
						$gte: date1,
						$lte: date2,
					},
				},
			},
			{ $group: { _id: '$cost_livings.records.category.name', sum_val: { $sum: '$cost_livings.records.price' } } },
		]);
		console.log('AGGREGATION:', agg);

		res.json({ report: agg });
	} catch (err) {
		console.error(err);
		res.render('error/500');
	}
});

//Process add product
router.post('/', ensureAuth, urlencodedParser, async (req, res) => {
	try {
		//	console.log('BODY:', req.body);
		const user = await User.updateOne({ _id: req.user.id }, [
			{
				$set: {
					'cost_livings.records': {
						$concatArrays: [
							'$cost_livings.records',
							[
								new CostLiving({
									name: req.body.name,
									category: new Category({
										name: req.body.category,
									}),
									date: req.body.date,
									price: req.body.price,
								}),
							],
						],
					},
					'cost_livings.total_sum': { $sum: ['$cost_livings.total_sum', parseFloat(req.body.price)] },
				},
			},
		]).exec();

		//console.log('USER:', user);

		res.redirect('/products');
	} catch (err) {
		console.error(err);
		res.render('error/500');
	}
});

//Show edit product page
router.get('/edit/:id', ensureAuth, async (req, res) => {
	const product = await CostLiving.findOne({ _id: req.params.id }).lean();
	if (!product) {
		return res.render('error/404');
	} else {
		res.render('products/edit', { product });
	}
});

//Update product
router.put('/:id', ensureAuth, async (req, res) => {
	try {
		let product = await CostLiving.findById(req.params.id).lean();

		if (!product) {
			return res.render('error/404');
		} else {
			product = await CostLiving.findOneAndUpdate({ _id: req.params.id }, req.body, {
				new: true,
				runValidators: true,
			});
			res.redirect('/records');
		}
	} catch (err) {
		console.error(err);
		return res.render('error/500');
	}
});

router.delete('/:id', ensureAuth, async (req, res) => {
	try {
		let product = await CostLiving.findById(req.params.id).lean();

		if (!product) {
			return res.render('error/404');
		} else {
			await CostLiving.remove({ _id: req.params.id });
			res.redirect('/records');
		}
	} catch (err) {
		console.error(err);
		return res.render('error/500');
	}
});

module.exports = router;
