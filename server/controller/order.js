var orderWorker = require('../mongoose/worker/order');
var inventoryWorker = require('../mongoose/worker/inventory');


var modifyOrderAndInventory = function (action, id, body, req, res, next)  {
    // Check existing inventory quantity
    // Time Complexity O(n)
    // Space Complexity O(n)
    inventoryWorker.findInventory({}, function (error, inventories) {
        if (inventories) {
            var nameToInvMap = new Map();
            inventories.forEach(item => {
                var inv = nameToInvMap.get(item.name);
                if (inv) {
                    inv.quantity += item.quantity;
                    nameToInvMap.set(inv);
                } else {
                    nameToInvMap.set(item.name, item);
                }
            });

            var invsInReq = body.inventories;
            var testPass = true;
            invsInReq.forEach(item => {
                var inv2 = nameToInvMap.get(item.name);
                if (inv2 && item.quantity > inv2.quantity) {
                    res.status(400).send("The item " + item.name + " doesn't have enough quantity!");
                    testPass = false;
                }
            });
            if (!testPass) {
                return;
            }
            // Update/Create order
            action(id, body, function (error, response) {
                if (response) {
                    var updatePass = true;
                    // if order success, we should update inventory quantity
                    invsInReq.forEach(item => {
                        var inv3 = nameToInvMap.get(item.name);
                        if (inv3) {
                            inv3.quantity -= item.quantity;
                            inventoryWorker.updateInventoryById(inv3._id, inv3, function (error, response) {
                                if (error) {
                                    // Delete the order if error happened. 
                                    var query = {
                                        _id: response._id
                                    };
                                    orderWorker.deleteOrder(query, null);
                                    res.status(400).send("Error occured while update inventory quantity");
                                    updatePass = false;
                                }
                            });
                        }
                    });
                    
                    if(!updatePass) {
                        return;
                    }
                    // every thing success, send 200 back.
                    res.status(201).send(response);

                } else if (error) {
                    res.status(400).send(error);
                }
            });

        } else if (error) {
            res.status(400).send(error);
        }
    });
};

exports.createOrder = function (req, res, next) {
    var body = new Order(req.body);
    if (!body.inventories || !body.inventories.length) {
        res.status(400).send("Inventories can't be empty");
    }

    modifyOrderAndInventory(orderWorker.createOrder, null, body, req, res, next);  
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

exports.updateOrderById = function (req, res, next, ) {
    var params = req.params || {};
    var id = params.id;
    if (!id) {
        res.status(400).send("Bad Request");
    }
    var body = new Order(req.body);
    
    modifyOrderAndInventory(orderWorker.updateOrderById, id, body, req, res, next);
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
