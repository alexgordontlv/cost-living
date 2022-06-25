const mongoose = require('mongoose');

const User = require('../models/user');

const getReportByStartAndEndDate = async (startDate, endDate, userId) => {
	try {
		const report = await User.aggregate([
			{ $unwind: '$cost_livings' },
			{ $unwind: '$cost_livings.records' },
			{
				$match: {
					'cost_livings.records.date': {
						$gte: startDate,
						$lte: endDate,
					},
					_id: mongoose.Types.ObjectId(userId),
				},
			},
			{
				$group: {
					_id: '$cost_livings.records.category.name',
					sum_val: {
						$sum: '$cost_livings.records.price',
					},
				},
			},
		]);
		return report;
	} catch (error) {
		console.log('ERROR');
		return [];
	}
};

module.exports = {
	getReportByStartAndEndDate,
};
