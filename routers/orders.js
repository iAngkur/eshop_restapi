const Product = require('../models/product.js');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const products = await Product.find();

    if (!products) {
        res.status(500).json({
            success: false
        });
    }
    res.send(products);
});

router.post(`/`, (req, res) => {
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

module.exports = router;