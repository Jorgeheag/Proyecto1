const jwt = require('jsonwebtoken');
// Models
const { User } = require('../models/users.model');
const { Restaurants } = require('../models/restaurants.model');

// Utils
const { catchAsync } = require('../Utils/catchAsync');
const { AppError } = require('../Utils/app.error');

exports.getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.findAll({
		where: { status: 'active' },
		include: [{ model: Restaurants }], //revisar que modelo incluir
	});

	res.status(200).json({
		status: 'success',
		data: { users },
	});
});

exports.getUsersById = catchAsync(async (req, res, next) => {
	const { user } = req;

	res.status(200).json({
		status: 'success',
		data: { user },
	});
});

exports.createUser = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body;

	const newUser = await User.create({
		name,
		email,
        password
		
	});

	res.status(200).json({
		status: 'success',
		data: { newUser },
	});
});

exports.updateUser = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { name, email } = req.body;

	await user.update({ name, email });

	res.status(204).json({ status: 'success' });
});

exports.disableUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
	}

	await user.update({ status: 'Disable' });

	res.status(204).json({ status: 'success' });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate credentials (email)
    const user = await User.findOne({
        where: {
            email,
            status: 'active',
        },
    });

    if (!user) {
        return next(new AppError('Credentials invalid', 400));
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return next(new AppError('Credentials invalid', 400));
    }

    // Generate JWT (JsonWebToken) ->
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '30m',
    });

    // Send response
    res.status(200).json({
        status: 'success',
        token,
    });
});
