// Models
const { Meals } = require('../models/meals.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const meatExist= catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const meat = await Meals.findOne({ where: { id } });

	if (!meat) {
		return next(new AppError('meat not found', 404));
	}

	req.meat = meat;
	next();
});

module.exports = { meatExist };
