//user login check
module.exports = {
	ensureAuth: function (req, res, next) {
		console.log('ENSURE HEADER OK', req.headers.Authorization);
		console.log('ENSURE HEADERs ', req.headers);

		if (req.headers.Authorization) {
			req.id = req.headers.Authorization;
			console.log('ENSURE AUTH OK', req.id);
			return next();
		}
		console.log('ENSURE NOT AUTH');

		res.status(400).json("msg: 'Please provider Id'");
	},
};
