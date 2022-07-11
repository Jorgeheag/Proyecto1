//const { Sequelize} = require('sequelize');


// Models
const { Orders } = require('../models/orders.model');
/*const { Reviews } = require('../models/reviews.model');
const { GamesInConsoles } = require('../models/gamesInConsoles.model');
const {Consoles}= require ('../models/consoles.model')*/

// Utils
const { catchAsync } = require('../utils/catchAsync');
//const { AppError } = require('../utils/appError');

const getAllOrders = catchAsync(async (req, res, next) => {
	const order = await Orders.findAll({
		include:[
			
			
		/*{ model: GamesInConsoles, attributes: ['id','consoleId'], 
			include:[{model: Consoles, attributes: ['id','name'] }]}, 
		
		
		{model: Reviews, attributes: ['id','comment']}*/],
	});

	res.status(200).json({
		status: 'success',
		data: { order },
	});
});

const createOrders = catchAsync(async (req, res, next) => {
	const { quantity, mealId } = req.body;

	const newOrder = await Orders.create({
		quantity,
		mealId
		
		
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

const deleteOrders = catchAsync(async (req, res, next) => {
	const { order } = req;

	await order.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});



module.exports = {
	getAllOrders,
    createOrders,
    updateOrders,
    deleteOrders

};