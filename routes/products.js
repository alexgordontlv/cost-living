const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const Category = require('../models/category');
const Product = require('../models/cost-living');
const monthlyExpense = require("../models/monthlyCosts");
const annualExpense = require("../models/annualCosts");
const alert = require('alert');

//Show add product page
router.get('/add', ensureAuth, (req, res) => {
	res.render('products/add');
});

//Process add product
router.post('/', ensureAuth, urlencodedParser, async (req, res) => {
	let monthlyCosts;
	try {
		let day = req.body.date.split("-");
		console.log('BODY:', req.body);
		const category = await Category.findOne({name: req.body.category});
		console.log('FOUND CATEGORY:', category);
		await Product.create({...req.body, userId: req.user._id, category: category._id});
		await alert('Product added successfully!!');
		//create/update monthly expenses
		await monthlyExpense.findOne({userId: req.user._id, year: day[0], month: day[1], category: category._id}).then(
			entry =>{
				if(!entry){
					monthlyExpense.create({
						userId: req.user._id,
						category: category._id,
						month: day[1],
						year:day[0],
						sum:req.body.price,
					})
				}else {
					monthlyExpense.updateOne(
					{id:entry._id},{$inc:{sum:req.body.price}}
					).then((res) => {
						console.log(res.res)
					})
				}
			}
		)
		//create/update annual expenses
		await annualExpense.findOne({userId: req.user._id, year: day[0], category: category._id}).then(
			entry =>{
				if(!entry){
					annualExpense.create({
						userId: req.user._id,
						category: category._id,
						year:day[0],
						sum:req.body.price,
					})
				}else {
					annualExpense.updateOne(
						{id:entry._id},{$inc:{sum:req.body.price}}
					).then((res) => {
						console.log(res.res)
					})
				}
			}
		)
		res.redirect('/records');
	} catch (err) {
		console.error(err);
		res.render('error/500');
	}
});

//Show edit product page
router.get('/edit/:id', ensureAuth, async (req, res) => {
	const product = await Product.findOne({ _id: req.params.id }).lean();
	if (!product) {
		return res.render('error/404');
	} else {
		res.render('products/edit', { product });
	}
});

//Update product
router.put('/:id', ensureAuth, async (req, res) => {
	try {
		let product = await Product.findById(req.params.id).lean();

		if (!product) {
			return res.render('error/404');
		} else {
			product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
				new: true,
				runValidators: true,
			});
			await alert('Product Updated successfully!!');
			res.redirect('/records');
		}
	} catch (err) {
		console.error(err);
		return res.render('error/500');
	}
});

router.delete('/:id', ensureAuth, async (req, res) => {
	try {
		let product = await Product.findById(req.params.id).lean();

		if (!product) {
			return res.render('error/404');
		} else {
			await Product.remove({ _id: req.params.id });
			await alert('Product  deleted successfully!!');
			res.redirect('/records');
		}
	} catch (err) {
		console.error(err);
		return res.render('error/500');
	}
});

module.exports = router;
