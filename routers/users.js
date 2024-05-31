const User = require('../models/user.js');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


router.get('/', async (req, res) => {
    const users = await User.find().select('-passwordHash');

    if (!users) {
        res.status(500).json({
            success: false
        });
    }
    res.status(200).json({ data: users, success: true });
});

router.get('/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId, { passwordHash: 0 });

    if (!user) {
        res.status(500).json({
            success: false
        });
    }
    res.status(200).json({ data: user, success: true });
});

router.post('/', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
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

router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
                res.status(200).json({ user: user });
            }
        } else {
            res.status(400).json({ message: 'No user found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;