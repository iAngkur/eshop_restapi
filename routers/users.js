const User = require('../models/user.js');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find();

    if (!users) {
        res.status(500).json({
            success: false
        });
    }
    res.status(200).json({ data: users, success: true });
});

router.post('/', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.passwordHash,
        phone: req.body.phone,
        isAdmin: req.body.isAdmid,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    });
    user.save()
        .then((createdUser) => res.status(200).json({
            data: createdUser,
            success: true
        }))
        .catch((err) => res.status(500).json({
            error: err,
            success: false
        }));
});

module.exports = router;