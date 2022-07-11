// Models
const { Meals } = require('../models/meals.model');
const { Restaurants } = require('../models/restaurants.model');

// Utils
const { catchAsync } = require('../Utils/catchAsync');
const { AppError } = require('../Utils/app.error');

const getAllMeals = catchAsync(async (req, res, next) => {
	const meals = await Meals.findAll({
		where: { status: 'active' },
		include: [{ model: Restaurants }], //revisar relacion
	});

	res.status(200).json({
		status: 'success',
		data: { meals },
	});
});

const getMealsById = catchAsync(async (req, res, next) => {
	const { meal } = req;

	res.status(200).json({
		status: 'success',
		data: { meal },
	});
});

const createMeat = catchAsync(async (req, res, next) => {
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

const updateMeal = catchAsync(async (req, res, next) => {
	const { meal } = req;
	const { name, price, } = req.body;

	await meal.update({ name, price });

	res.status(204).json({ status: 'success' });
});

const deleteMeal = catchAsync(async (req, res, next) => {
	const { meal } = req;

	await meal.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getAllMeals,
	getMealsById, 
	createMeat, 
	updateMeal,
	deleteMeal,
}