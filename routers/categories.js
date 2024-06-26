const Category = require('../models/category.js');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const categories = await Category.find();

    if (!categories) {
        res.status(500).json({
            message: 'No data found',
            success: false
        });
    }
    res.status(200).send(categories);
});

router.get('/:categoryId', async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);

        if (category) {
            res.status(200).json({ data: category, success: true });
        } else {
            res.status(404).json({ message: 'No Category Found', success: false })
        }

    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', (req, res) => {
    const category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });
    category.save()
        .then((createdCategory) => res.status(201).json({
            data: createdCategory,
            success: true
        }))
        .catch((err) => res.status(500).json({
            error: err,
            success: false
        }));
});

router.put('/:categoryId', (req, res) => {
    const newCategory = {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    };

    Category.findByIdAndUpdate(req.params.categoryId, newCategory, { new: true })
        .then((updatedCategory) => { res.status(200).json({ data: updatedCategory, success: true }) })
        .catch((err) => res.status(500).json({ success: false }));
});

router.delete('/:categoryId', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId);
        if (deletedCategory) {
            res.status(200).json({
                message: 'Category deleted successfully',
                success: true
            });
        } else {
            res.status(404).json({
                message: 'Category not found',
                success: false
            });
        }
    } catch (err) {
        res.status(400).json({
            error: err,
            success: false
        })
    }
});

module.exports = router;