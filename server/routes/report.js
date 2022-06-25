const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const { lastDayOfMonth, firstDayOfMonth } = require('../helpers/dateHelpers');
const { getReportByStartAndEndDate } = require('../repository/reportRepository');
//@Get reports by month
router.get('/:reportYear/:reportMonth', ensureAuth, async (req, res) => {
	console.log('HI:');

	try {
		const { reportYear, reportMonth } = req.params;
		if (reportYear === null || reportMonth === null) {
			console.log('NO PARAMS');
			return res.status(400);
		}

		const startDate = firstDayOfMonth(reportYear, reportMonth);
		const endDate = lastDayOfMonth(reportYear, reportMonth);
		console.log('from date:', startDate, 'to date:', endDate);

		const report = await getReportByStartAndEndDate(startDate, endDate, req.user.id);

		console.log('AGGREGATION PER MOPNTH:', report);

		res.json({ report: report });
	} catch (err) {
		console.error(err);
		res.render('error/500');
	}
});

//@Get reports by year
router.get('/:reportYear', ensureAuth, async (req, res) => {
	try {
		const { reportYear } = req.params;
		if (reportYear === null) {
			console.log('NO PARAMS');
			return res.status(400);
		}

		const startDate = firstDayOfMonth(reportYear, '01');
		const endDate = lastDayOfMonth(reportYear, '12');
		console.log('from year:', startDate, 'to year:', endDate);

		const report = await getReportByStartAndEndDate(startDate, endDate, req.user.id);

		console.log('AGGREGATION:', report);

		res.json({ report: report });
	} catch (err) {
		console.error(err);
		res.render('error/500');
	}
});

// //@Get available months
// router.get('/monthly', ensureGuest, async (req, res) => {
// 	let month = await getMonth(req.user.id);
// 	let beginner = false;
// 	let noFilterResult = true;
// 	console.log(month);
// 	res.render('/monthly', { layout: 'main', months: month, beginner: beginner, noFilterResult: noFilterResult });
// });

// //@Get available years
// router.get('/annual', ensureAuth, async (req, res) => {
// 	let year = await getYears(req.user.id);
// 	console.log(year);
// 	res.render('/annual', { layout: 'main', years: year });
// });

module.exports = router;
