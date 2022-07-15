const express = require('express');

// Controllers
const {
	getAllOrders,
	//getOrdersById, 
	createOrder, 
	updateOrders,
	//deleteOrders,
	cancelledOrder
} = require('../controlers/orders.controller');



const {protectSession, protectUserAccount}= require('../midlewares/auth.middleware')
const {createUserValidators}= require('../midlewares/validators.middleware')
const {userExists}= require('../midlewares/users.middleware')
const {meatExist, totalprice} = require('../midlewares/order.diddleware')


const orderRoute = express.Router();



orderRoute.use(protectSession)

orderRoute.post('/', meatExist, totalprice, createOrder);

orderRoute.get('/me', getAllOrders);

orderRoute.patch('/:id',userExists, protectUserAccount, updateOrders);

orderRoute.delete('/:id',userExists, protectUserAccount, cancelledOrder);



module.exports = { orderRoute };