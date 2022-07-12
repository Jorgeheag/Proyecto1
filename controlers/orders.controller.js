// Models
const { Orders } = require('../models/orders.model');
const { Meals } = require('../models/meals.model');

// Utils
const { catchAsync } = require('../Utils/catchAsync');
const { AppError } = require('../Utils/app.error');
const { Meals } = require('../models/meals.model');

 /*const getAllOrders = catchAsync(async (req, res, next) => {
	const orders = await Orders.findAll({
		where: { status: 'active' },
		include: [{ model: Meals }], //revisar el modelo a unir
	});

	res.status(200).json({
		status: 'success',
		data: { orders },
	});
});
*/
 const getOrdersById = catchAsync(async (req, res, next) => {
	const { id } = req.params; // revisar ordenes de los usuarios 

	const orders = await Orders.findOne({ where: { id } });

	if (!user) {
		return res.status(404).json({
			status: 'Order not found',
		});
	}

	res.status(200).json({
		status: 'success',
		orders,
	});
});

 const createOrder = catchAsync(async (req, res, next) => {
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

const updateOrders = catchAsync(async (req, res, next) => {
	const { order } = req;
	const { status} = req.body;

	await order.update({ status});

	res.status(204).json({ status: 'completed' });
});

/*const deleteOrders = catchAsync(async (req, res, next) => {
	const { order } = req;

	await order.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});
*/

 const cancelledOrder = catchAsync(async (req, res, next) => {
	const { order } = req;


	await order.update({ status: 'cancelled' });

	res.status(204).json({ status: 'success' });
});


module.exports = {
	//getAllOrders,
	getOrdersById, 
	createOrder, 
	updateOrders,
	//deleteOrders,
	cancelledOrder
}
