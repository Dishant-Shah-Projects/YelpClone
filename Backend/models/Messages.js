const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
  restaurantID: { type: Number, required: true },
  customerID: { type: Number, required: true },
  restaurantName: { type: String, required: true },
  customerName: { type: String, required: true },
  Date: { type: Date, required: true },
  Messages: [
    {
      Messager: { type: String },
      Message: { type: String },
    },
  ],

});

module.exports = mongoose.model('messages', messagesSchema);
