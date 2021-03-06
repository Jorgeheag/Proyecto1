const { db, DataTypes } = require('../Utils/data.base');


const Reviews = db.define('reviews', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
    userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	restaurantId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	comment: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
	}
});

module.exports = { Reviews };