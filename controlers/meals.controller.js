// Models
const { Meals } = require('../models/meals.model');
const { Restaurants } = require('../models/restaurants.model');

// Utils
const { catchAsync } = require('../Utils/catchAsync');
const { AppError } = require('../Utils/app.error');

exports.getAllMeals = catchAsync(async (req, res, next) => {
	const meals = await Meals.findAll({
		where: { status: 'active' },
		include: [{ model: Restaurants }], 
	});

	res.status(200).json({
		status: 'success',
		data: { meals },
	});
});

exports.getMealsById = catchAsync(async (req, res, next) => {
	const { meal } = req;

	res.status(200).json({
		status: 'success',
		data: { meal },
	});
});

exports.createMeat = catchAsync(async (req, res, next) => {
	const { name, price } = req.body;

	const newMeat = await Meals.create({
		name,
		price,
		
	});

	res.status(200).json({
		status: 'success',
		data: { newMeat },
	});
});

exports.updateMeal = catchAsync(async (req, res, next) => {
	const { meal } = req;
	const { name, price, } = req.body;

	await meal.update({ name, price });

	res.status(204).json({ status: 'success' });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
	const { meal } = req;

	await meal.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});
