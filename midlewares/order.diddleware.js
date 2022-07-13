// Models
const { Meals } = require('../models/meals.model');
const { Orders } = require('../models/orders.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const totalprice = catchAsync(async (req, res, next) => {
	
	const totalprice =  req.body * Orders.quantity

	Orders.totalPrice= totalprice

	req.totalPrice = totalPrice;
	next();
});




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
