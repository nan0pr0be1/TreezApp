var inventoryWorker = require('../mongoose/worker/inventory')

exports.createInventory = function (req, res, next) {
    var body = new Inventory(req.body);
    inventoryWorker.createInventory(body, function (error, response) {
        if (response) {
            res.status(201).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
};


exports.getAllInevntories = function (req, res, next) {
    inventoryWorker.findInventory({}, function (error, response) {
        if (response) {
            res.status(200).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
};

exports.getInventoryById = function (req, res, next) {
    var params = req.params || {};
    var id = params.id;
    if (!id) {
        res.status(400).send("Bad Request");
    }
    inventoryWorker.findInventoryById(id, function (error, response) {
        if (response) {
            res.status(200).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
};

exports.updateInventoryById = function (req, res, next) {
    var params = req.params || {};
    var id = params.id;
    if (!id) {
        res.status(400).send("Bad Request");
    }
    var body = new Inventory(req.body);
    // TODO: if body equal null, do we still allow user to update? or return an error?
    
    inventoryWorker.updateInventoryById(id, body, function (error, response) {
        if (response) {
            res.status(200).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
};

exports.deleteInventoryById = function (req, res, next) {
    var params = req.params || {};
    var id = params.id;
    if (!id) {
        res.status(400).send("Bad Request");
    }
    var query = {
        _id: id
    };
    inventoryWorker.deleteInventoryById(query, function (error, response) {
        if (response) {
            res.status(200).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
};

class Inventory {
    constructor(inventoryData) {
        this.name = inventoryData.name || "";
        this.description = inventoryData.description || "";
        this.priceInCents = inventoryData.priceInCents || 0;
        this.quantity = inventoryData.quantity || 0;
    }
}
