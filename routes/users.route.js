const express = require('express');

// Controllers
const {
	getAllUsers,
	getUsersById, 
	createUser, 
	updateUser,
	disableUser,
	login
} = require('../controlers/users.controller');



const {protectSession, protectUserAccount,AdminUser}= require('../midlewares/auth.middleware')
const {createUserValidators}= require('../midlewares/validators.middleware')
const {userExists}= require('../midlewares/users.middleware')




const userRouter = express.Router();

userRouter.post('/login', login);

userRouter.post('/signup', createUserValidators, createUser);


userRouter.use(protectSession)

userRouter.get('/orders', getAllUsers);
userRouter.get('/orders/:id', getUsersById);

userRouter.patch('/:id',userExists,AdminUser, protectUserAccount, updateUser);

userRouter.delete('/:id',userExists, AdminUser, protectUserAccount, disableUser);



module.exports = { userRouter };