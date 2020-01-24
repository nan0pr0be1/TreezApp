var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: ''
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    priceInCents: {
        type: Number,
        required: false,
        default: 0 
    },
    quantity: {
        type: Number,
        required: false,
        default: 0
    }
});

var inventory = new mongoose.model("Inventory", schema);
module.exports = inventory;