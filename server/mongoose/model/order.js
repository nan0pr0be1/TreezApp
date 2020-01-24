var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        default: ''
    },
    orderDate: {
        type: Date,
        required: false,
    },
    orderStatus: {
        type: String,  // Value are: Recieved, Processing, Shipped, Received
        required: false,
        default: false
    },
    inventories: {
        type: Array,
        required: false,
        default: []
    }
});

var order = new mongoose.model('Order', schema);
module.exports = order;