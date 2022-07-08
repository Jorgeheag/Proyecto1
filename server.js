const { app } = require('./app');

//utils
const { /*sequelize*/ } = require(/*database*/);

// Database authenticated
sequelize
	.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

// Database synced with models' relations  
sequelize
	.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

    // Spin up server
const PORT = process.env.PORT  //|| 4000;
app.listen(PORT, () => {
	console.log(`Express app running on port: ${PORT}`);
});