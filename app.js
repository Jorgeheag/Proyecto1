const express = require('express');


const app = express();

// Enable incoming JSON data
app.use(express.json());


//Endpoints
app.use('/api/v1/restaurants',/*importarlas rutas*/);
app.use('/api/v1/meals',/*importarlas rutas*/);
app.use('/api/v1/orders',/*importarlas rutas*/);


module.exports = { app };