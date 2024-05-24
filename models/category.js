
const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Category', categorySchema);