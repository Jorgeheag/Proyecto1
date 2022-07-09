// Models
const { Meals } = require('../models/meals.model');
//const { Movie } = require('../models/movie.model');

// Utils
//const { catchAsync } = require('../util/catchAsync');
//const { AppError } = require('../util/appError');

exports.getAllMeals = catchAsync(async (req, res, next) => {
	const meals = await Meals.findAll({
		where: { status: 'active' },
		include: [{ model: /*Movie*/ }], //necesita el otro modelo
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
