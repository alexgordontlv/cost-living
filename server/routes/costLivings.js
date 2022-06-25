const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const { updateUserCostLivings, getUserById } = require('../repository/userRepository');

const router = express.Router();
//Show add expense form
router.get('/add', ensureAuth, (req, res) => {
	res.render('products/add');
});

//Show last expenses of user
router.get('/', ensureAuth, async (req, res) => {
	try {
		const user = await getUserById(req.id);

		if (user) {
			res.send({
				name: user.first_name,
				costLivings: user.cost_livings.records,
				totalSum: user.cost_livings.total_sum,
			});
		}
	} catch (err) {
		console.log(err.message);
		res.status(500);
	}
});

//Process add product
router.post('/', ensureAuth, async (req, res) => {
	console.log(req.body);
	try {
		const user = await updateUserCostLivings(req.id, req.body);

		if (user) {
			console.log('user', user);
			return res.status(200).send({
				name: user.first_name,
				costLivings: user.cost_livings.records,
				totalSum: user.cost_livings.total_sum,
			});
		}
		res.status(500);
	} catch (err) {
		console.log(err.message);
		res.status(500);
	}
});

module.exports = router;
