const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  restaurantID: { type: Number, required: true },
  customerID: { type: Number, required: true },
  orderID: { type: Number, required: true },
  customerName: { type: String, required: true },
  restaurantName: { type: String, required: true },
  OrderType: { type: String, required: true },
  OrderStatus: { type: String, required: true },
  OrderDateTime: { type: Date, required: true },
  Items: [
    {
      ItemID: {
        type: Number,
      },
      DishName: { type: String },
      DishPrice: { type: Number },
      DishQuantity: { type: Number },
    },
  ],

});

module.exports = mongoose.model('order', orderSchema);
