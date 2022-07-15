const express = require('express');

// Controllers
const {
	getAllMeals,
	getMealsById, 
	createMeat, 
	updateMeal,
	deleteMeal
} = require('../controlers/meals.controller');



const {protectSession, AdminUser}= require('../midlewares/auth.middleware')
const {createMealValidators}= require('../midlewares/validators.middleware')
const {userExists}= require('../midlewares/users.middleware')



const mealRoute = express.Router();

mealRoute.get('/', getAllMeals);
mealRoute.get(':id', getMealsById);

mealRoute.use(protectSession)

mealRoute.post('/',createMealValidators,  createMeat);

mealRoute.patch('/:id',userExists,AdminUser,  updateMeal);

mealRoute.delete('/:id',userExists,AdminUser, deleteMeal);



module.exports = { mealRoute };