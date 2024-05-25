// const {Product} = require('../models/product.js');
const Product = require('../models/product.js');
const Category = require('../models/category.js');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get(`/`, async (req, res) => {
    try {
        const products = await Product
            .find({}, { name: 1, price: 1, image: 1, category: 1, _id: 1 })
            .populate('category');
        // const products = await Product.find().select('name image -_id');

        if (!products) {
            res.status(500).json({
                message: 'No Product Found',
                success: false
            });
        }
        res.status(200).json({ data: products, success: true });
    } catch (err) {
        res.status(404).json({ err, success: false });
    }
});

router.get(`/:productId`, async (req, res) => {
    try {
        const queryProductId = req.params.productId;
        if (mongoose.isValidObjectId(queryProductId)) {
            const product = await Product
                .findById(queryProductId)
                .populate('category');

            if (!product) {
                res.status(500).json({
                    message: 'No Product Found',
                    success: false
                });
            }
            res.status(200).json({ data: product, success: true });
        } else {
            res.status(500).json({ message: 'Invalid ID', success: false });
        }
    } catch (err) {
        res.status(404).json({ err, success: false });
    }
});

router.post(`/`, async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);

        if (category) {
            const product = new Product({
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured
            });
            product.save()
                .then((createdProduct) => res.status(200).json({
                    data: createdProduct,
                    success: true
                }))
                .catch((err) => res.status(500).json({
                    error: err,
                    success: false
                }));
        } else {
            res.status(404).json({ message: 'Invalid Category', success: false });
        }

    } catch (err) {
        res.status(500).json({ err, success: false });
    }
});


router.put('/:productId', async (req, res) => {

    try {
        const updateProductId = req.params.productId;
        if (mongoose.isValidObjectId(updateProductId)) {
            const category = await Category.findById(req.body.category);

            if (category) {

                const newProduct = {
                    name: req.body.name,
                    description: req.body.description,
                    richDescription: req.body.richDescription,
                    image: req.body.image,
                    brand: req.body.brand,
                    price: req.body.price,
                    category: req.body.category,
                    countInStock: req.body.countInStock,
                    rating: req.body.rating,
                    numReviews: req.body.numReviews,
                    isFeatured: req.body.isFeatured
                };

                Product.findByIdAndUpdate(updateProductId, newProduct, { new: true })
                    .then((updatedProduct) => { res.status(200).json({ data: updatedProduct, success: true }) })
                    .catch((err) => res.status(500).json({ err, success: false }));
            } else {
                res.status(404).json({ message: 'Invalid Category', success: false });
            }
        } else {
            res.status(500).json({ message: 'Invalid ID', success: false });
        }
    } catch (err) {
        res.status(500).json({ err, success: false });
    }
});

router.delete('/:productId', async (req, res) => {
    try {
        const deleteProductId = req.params.productId;
        if (mongoose.isValidObjectId(deleteProductId)) {

            const deletedProduct = await Product.findByIdAndDelete(deleteProductId);
            if (deletedProduct) {
                res.status(200).json({
                    message: 'Product deleted successfully',
                    success: true
                });
            } else {
                res.status(404).json({
                    message: 'Product not found',
                    success: false
                });
            }
        } else {
            res.status(500).json({ message: 'Invalid ID', success: false });
        }
    } catch (err) {
        res.status(400).json({
            error: err,
            success: false
        })
    }
});


module.exports = router;