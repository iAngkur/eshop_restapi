const express = require('express');
const morgan = require('morgan'); // logging incoming data
const mongoose = require('mongoose');
const productsRouter = require('./routers/products');
require('dotenv/config');

const app = express();
const api = process.env.API_URL;

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));

// Routes
app.use(`${api}/products`, productsRouter);

// Database
mongoose.connect(process.env.DB_URL, {
    dbName: 'eshop_database'
})
    .then(() => console.log('Database connection is ready'))
    .catch((err) => console.log(err));

// Server
app.listen(3000, () => {
    console.log(api);
    console.log('The server is running on port https://hocalhost:3000')
})