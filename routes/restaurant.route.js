const express = require('express');

// Controllers
const {
	getAllRestaurants,
	getRestaurantdById, 
	createRestaurt, 
	updateRestaurant,
	deleteRestaurant,
	createComment,
	ubdateComment,
	deleteReview
} = require('../controlers/restaurants.controller');

const {protectSession, protectUserAccount,AdminUser}= require('../midlewares/auth.middleware')
const {createUserValidators, createReviewsAndRestaurant}= require('../midlewares/validators.middleware')
const {userExists}= require('../midlewares/users.middleware')


const restaurantRouter = express.Router();



restaurantRouter.get('/', getAllRestaurants);
restaurantRouter.get('/:id', getRestaurantdById);

restaurantRouter.use(protectSession)
restaurantRouter.post('/',createReviewsAndRestaurant, createRestaurt);
restaurantRouter.post('/reviews/:restaurantId',createReviewsAndRestaurant,  createComment);

restaurantRouter.patch('/reviews/:id',protectUserAccount, ubdateComment );// falta actualizar receña
restaurantRouter.delete('/reviews/:id',protectUserAccount, deleteReview ); // falta eliminar comentario


restaurantRouter.patch('/:id', userExists, AdminUser, updateRestaurant);

restaurantRouter.delete('/:id', userExists, AdminUser, deleteRestaurant);



module.exports = { restaurantRouter };