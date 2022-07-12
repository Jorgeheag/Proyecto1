// Models
const { Restaurants } = require('../models/meals.model');
const { Reviews } = require('../models/reviews.model');

// Utils
const { catchAsync } = require('../Utils/catchAsync');
const { AppError } = require('../Utils/app.error');

const getAllRestaurants = catchAsync(async (req, res, next) => {
	const restaurants = await Restaurants.findAll({
		where: { status: 'active' },
		include: [{ model: Restaurants }], //revisar que modelo debe ir
	});

	res.status(200).json({
		status: 'success',
		data: { restaurants },
	});
});

const getRestaurantdById = catchAsync(async (req, res, next) => {
	const { id } = req.params; // traer restautante por activo

	const restaurant = await Restaurants.findOne({ where: { id } });

	if (!restaurant) {
		return res.status(404).json({
			status: 'restaurand not found',
		});
	}

	res.status(200).json({
		status: 'success',
		restaurant,
	});
});

const createRestaurt = catchAsync(async (req, res, next) => {
	const { name, address, rating } = req.body;

	const newMeat = await Meals.create({
		name,
		address, 
		rating
	});

	res.status(200).json({
		status: 'success',
		data: { newMeat },
	});
});

const updateRestaurant = catchAsync(async (req, res, next) => {
	const { restaurant } = req;
	const { name, address } = req.body; //solo admin puede gacer esta accion

	await restaurant.update({ name, address });

	res.status(204).json({ status: 'success' });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
	const { restaurant } = req;
 //solo admin puede realizar esta accion
	await restaurant.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

const createComment = catchAsync(async(req, res, next)=>{
	const { comment, rating } = req.body;
 //porbe el id del restaurante 
	const newCommet = await Reviews.create({
		comment,
		rating
	});

	res.status(200).json({
		status: 'success',
		data: { newCommet },
	});
})

module.exports = {
	getAllMeals,
	getMealsById, 
	createMeat, 
	updateMeal,
	deleteMeal,
}