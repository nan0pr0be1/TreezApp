var express = require('express');
var router = express.Router();
var order = require('../controller/order');



router.post('/', order.createOrder);


router.get('/', order.getAllOrders);

router.get('/:id', order.getOrderById);

router.put('/:id', order.updateOrderById);

router.delete('/:id', order.deleteOrderById);

module.exports = router;