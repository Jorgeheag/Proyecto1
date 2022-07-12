const { app } = require('./app');

//Models
const {User} = require('./models/users.model');
const {Reviews} = require('./models/reviews.model');
const {Restaurants} = require('./models/restaurants.model');
const {Orders} = require('./models/orders.model');

//utils
const { db } = require('./Utils/data.base');
const { Meals } = require('./models/meals.model');

// Database authenticated
db
	.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

//Unit models relations
User.hasMany(Orders, {foreignkey: 'UserId', through: 'mealId'});
Orders.belongsTo(User);

User.hasMany(Reviews, {foreignkey: 'UserId', through: 'restaurantId'});
Reviews.belongsTo(User);

Restaurants.hasMany(Reviews, {foreignkey: 'restaurantId', through: 'UserId'})
Reviews.belongsTo(Restaurants);

Meals.hasOne(Orders, {foreignkey: 'mealId', through: 'id'})
Orders.belongsTo(Meals);

//revisar las relaciones

// Database synced with models' relations  
db
	.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

    // Spin up server
const PORT = process.env.PORT  //|| 4000;
app.listen(PORT, () => {
	console.log(`Express app running on port: ${PORT}`);
});