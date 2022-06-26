//user login check
module.exports = {
	ensureAuth: function (req, res, next) {
		console.log('ENSURE HEADER OK', req.headers.USER_ID);
		console.log('ENSURE HEADERs ', req.headers);

		if (req.headers.USER_ID) {
			req.id = req.headers.USER_ID;
			console.log('ENSURE AUTH OK', req.id);
			return next();
		}
		console.log('ENSURE NOT AUTH');

		res.status(400).json("msg: 'Please provider Id'");
	},
};
