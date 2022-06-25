//user login check
module.exports = {
	ensureAuth: function (req, res, next) {
		console.log('ENSURE HEADER OK', req.headers.user_id);

		if (req.headers.user_id) {
			req.id = req.headers.user_id;
			console.log('ENSURE AUTH OK', req.id);
			return next();
		}
		console.log('ENSURE NOT AUTH');

		res.status(400).json("msg: 'Please provider Id'");
	},
};
