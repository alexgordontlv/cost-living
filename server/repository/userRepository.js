const User = require('../models/user');
const CostLiving = require('../models/costLiving');
const Category = require('../models/category');

const getUserById = async (userId) => {
	try {
		return await User.findOne({ _id: userId }).lean();
	} catch (error) {
		console.log('ERROR');
		return null;
	}
};

const getUserByEmail = async (email) => {
	try {
		return await User.findOne({ email: email }).lean();
	} catch (error) {
		console.log('ERROR');
		return null;
	}
};

const updateUserCostLivings = async (userId, requestParams) => {
	try {
		const user = await User.findOneAndUpdate({ _id: userId }, [
			{
				$set: {
					'cost_livings.records': {
						$concatArrays: [
							'$cost_livings.records',
							[
								new CostLiving({
									name: requestParams.name,
									category: new Category({
										name: requestParams.category,
									}),
									date: requestParams.date,
									price: requestParams.price,
								}),
							],
						],
					},
					'cost_livings.total_sum': {
						$sum: ['$cost_livings.total_sum', parseFloat(requestParams.price)],
					},
				},
			},
		]).exec();
		return user;
	} catch (error) {
		console.log('ERROR');
		return null;
	}
};

module.exports = {
	updateUserCostLivings,
	getUserById,
	getUserByEmail,
};
