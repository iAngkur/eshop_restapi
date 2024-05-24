const express = require('express');
const morgan = require('morgan'); // logging incoming data
const mongoose = require('mongoose');
const Product = require('./models/product.js')
require('dotenv/config');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

mongoose.connect(process.env.DB_URL, {
    dbName: 'eshop_database'
})
    .then(() => console.log('Database connection is ready'))
    .catch((err) => console.log(err));

const api = process.env.API_URL;

app.get(`${api}/products`, async (req, res) => {
    const products = await Product.find();

    if (!products) {
        res.status(500).json({
            success: false
        });
    }

    res.send(products);
});

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    });
    product.save()
        .then((createdProduct) => res.status(201).json({
            data: createdProduct,
            success: true
        }))
        .catch((err) => res.status(500).json({
            error: err,
            success: false
        }));
});


app.listen(3000, () => {
    console.log(api);
    console.log('The server is running on port https://hocalhost:3000')
})