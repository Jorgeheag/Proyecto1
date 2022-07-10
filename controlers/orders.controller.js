// Models
const { Orders } = require('../models/orders.model');
const { Meals } = require('../models/meals.model');

// Utils
const { catchAsync } = require('../Utils/catchAsync');
const { AppError } = require('../Utils/app.error');
const { Meals } = require('../models/meals.model');

exports.getAllOrders = catchAsync(async (req, res, next) => {
	const orders = await Orders.findAll({
		where: { status: 'active' },
		include: [{ model: Meals }], //revisar el modelo a unir
	});

	res.status(200).json({
		status: 'success',
		data: { orders },
	});
});

exports.getOrdersById = catchAsync(async (req, res, next) => {
	const { order } = req;

	res.status(200).json({
		status: 'success',
		data: { order }, //hay que traer todas las ordenes de los usuarios
	});
});

exports.createOrder = catchAsync(async (req, res, next) => {
	const { quantity, mealId } = req.body;

	const newOrder = await Orders.create({
		quantity,
		mealId,
		
	});

	res.status(200).json({
		status: 'success',
		data: { newOrder },
	});
});

exports.completeOrder = catchAsync(async (req, res, next) => {
	const { order } = req;


	await order.update({ status: 'complete' });

	res.status(204).json({ status: 'success' });
});


exports.cancelledOrder = catchAsync(async (req, res, next) => {
	const { order } = req;


	await order.update({ status: 'cancelled' });

	res.status(204).json({ status: 'success' });
});

