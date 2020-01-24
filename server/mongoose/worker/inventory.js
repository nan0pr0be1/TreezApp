(function() {
    var mongoose = require("mongoose");
    var inventory = mongoose.model('Inventory');

    exports.createInventory = function(data, callback) {
        console.log("data:", data);
        inventory.create(data).then(response => {
          console.log(response);
          callback(null, response);
        },
          error => {
            console.log(error);
            callback(error,null);
          }
        )
        .catch(error => {
           console.log(error);
          callback(error, null);
        });
    };

    exports.findInventory = function (query, callback) {
        inventory.find(query, callback);
    };

    exports.findInventoryById = function(id, callback) {
        inventory.findById({ _id: id }, callback);
    };

    exports.updateInventoryById = function (id, data, callback) {
        inventory.findByIdAndUpdate(
          {
            _id: id
          },
          data,
          (err, response) => {
            callback(err, response);
          }
        );
    };

  exports.deleteInventoryById = function (query, callback) {
      inventory.deleteOne(query, callback);
    };

})();
