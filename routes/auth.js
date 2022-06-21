const exspress = require('express');
const router = exspress.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//login route
router.post('/login', urlencodedParser, passport.authenticate('strategy-name', { failureRedirect: '/login' }), function (req, res) {
	res.redirect('/products');
});

//logout route
router.get('/logout', function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

module.exports = router;
