const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const CostLiving = require('../models/costLiving');
const Category = require('../models/category');
const User = require('../models/user');
const { lastDayOfMonth, firstDayOfMonth, addYear} = require('../helpers/dateHelpers');
const {getYears, getMonth} = require("../helpers/expense");
const mongoose = require("mongoose");

//Show add expense form
router.get('/add', ensureAuth, (req, res) => {
	res.render('products/add');
});

//Show last expenses of useer
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

//@Get reports by month
router.get('/report/:reportYear/:reportMonth', ensureAuth, async (req, res) => {
	console.log('HI:');

	try {
		const { reportYear, reportMonth } = req.params;
		if (reportYear === null || reportMonth === null) {
			console.log('NO PARAMS');
			return res.status(400);
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
					},"_id":mongoose.Types.ObjectId(req.user.id),
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

//@Get reports by year
router.get('/report/:reportYear', ensureAuth, async (req, res) => {
	console.log('HI:');

	try {
		const { reportYear } = req.params;
		if (reportYear === null) {
			console.log('NO PARAMS');
			return res.status(400);
		}

		const date1 = new Date(reportYear+"-01-01");
		const date2 = addYear(date1);
		console.log('DATE1:', date1, 'DATE2:', date2);

		const agg = await User.aggregate([
			{ $unwind: '$cost_livings' },
			{ $unwind: '$cost_livings.records' },
			{
				$match: {
					'cost_livings.records.date': {
						$gte: date1,
						$lte: date2,
					},"_id":mongoose.Types.ObjectId(req.user.id),
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
		await User.updateOne({ _id: req.user.id }, [
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

		res.redirect('/products');
	} catch (err) {
		console.error(err);
		res.render('error/500');
	}
});

//@Get available months
router.get("/monthly", ensureAuth, async(req, res) => {
	let month = await getMonth(req.user.id);
	let beginner = false;
	let noFilterResult = true;
	console.log(month)
	res.render('products/monthly', {layout: 'main', months: month,beginner: beginner ,noFilterResult:noFilterResult});
});

//@Get available years
router.get("/annual", ensureAuth, async(req, res) => {
	let year = await getYears(req.user.id);
	console.log(year)
	res.render('products/annual', {layout: 'main', years: year,});
});

module.exports = router;
