var express = require('express');
var router = express.Router();
var inventory = require('../controller/inventory');


router.post("/", inventory.createInventory);

router.get("/", inventory.getAllInevntories);

router.get('/:id', inventory.getInventoryById);

router.put('/:id', inventory.updateInventoryById);

router.delete('/:id', inventory.deleteInventoryById);

module.exports = router;
