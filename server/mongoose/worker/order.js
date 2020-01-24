(function() {
  var mongoose = require("mongoose");
  var order = mongoose.model("Order");

  exports.createOrder = function(_, data, callback) { 
    order.create(data).then(
      response => {
        callback(null, response);
      },
      error => {
        callback(error, null);
      }
    );
  };

  exports.findOrder = function(query, callback) {
    order.find(query, callback);
  };

  exports.findOrderById = function(id, callback) {
    order.findById({ _id: id }, callback);
  };

  exports.updateOrderById = function(id, data, callback) {
    order.findByIdAndUpdate(
      {
        _id: id
      },
      data,
      (err, response) => {
        callback(err, response);
      }
    );
  };

  exports.deleteOrder = function(query, callback) {
    order.deleteOne(query, callback);
  };
})();
