var orderWorker = require('../mongoose/worker/order');
var inventoryWorker = require('../mongoose/worker/inventory');

exports.createOrder = function (req, res, next) {
    var body = new Order(req.body);
    orderWorker.createOrder(body, function (error, response) {
        if (response) {
            res.status(201).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
};

exports.getAllOrders = function (req, res, next) {
    orderWorker.findOrder({}, function (error, response) {
        if (response) {
            res.status(200).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
};

exports.getOrderById = function (req, res, next) {
    var params = req.params || {};
    var id = params.id;
    if (!id) {
        res.status(400).send("Bad Request");
    }
    orderWorker.findOrderById(id, function (error, response) {
        if (response) {
            res.status(200).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
};

exports.updateOrderById = function (req, res, next) {
    var params = req.params || {};
    var id = params.id;
    if (!id) {
        res.status(400).send("Bad Request");
    }
    var body = new Order(req.body);
    // TODO: if body equal null, do we still allow user to update? or return an error?

    orderWorker.updateOrderById(id, body, function (error, response) {
        if (response) {
            res.status(200).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
};

exports.deleteOrderById = function (req, res, next) {
    var params = req.params || {};
    var id = params.id;
    if (!id) {
        res.status(400).send("Bad Request");
    }
    var query = {
        _id: id
    };
    orderWorker.deleteOrder(query, function (error, response) {
        if (response) {
            res.status(200).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
};

class Order {
    constructor(orderData) {
        this.email = orderData.email || "";
        this.orderDate = orderData.orderDate || null;
        this.orderStatus = orderData.orderStatus || false;
        this.inventories = orderData.inventories || [];
    }
}
