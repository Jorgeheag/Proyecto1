// Models
const { Meals } = require('../models/meals.model');
const { Orders } = require('../models/orders.model');

// Utils
const { AppError } = require('../utils/app.error');
const { catchAsync } = require('../utils/catchAsync');

const totalprice = catchAsync(async (req, res, next) => {
	const { quantity } = req.body
	const {price}=  req.meat


	const totalprice =  price * quantity

	req.totalPrice = totalprice;
	next();
});




const meatExist= catchAsync(async (req, res, next) => {
	const { mealId } = req.body;

	const meat = await Meals.findOne({ where: { id: mealId } });

	if (!meat) {
		return next(new AppError('meat not found', 404));
	}

	req.meat = meat;
	next();
});

module.exports = { meatExist,
					totalprice };
