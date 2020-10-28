const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  restaurantID: { type: Number, required: true },
  restaurantName: { type: String, required: true },
  EventName: { type: String, required: true },
  Description: { type: String, required: true },
  Time: { type: String, required: true },
  Date: { type: Date, required: true },
  Location: { type: String, required: true },
  PeopleRegistered: [
    {
      CustomerID: {
        type: Number,
      },
      CustomerName: { type: String },
    },
  ],

});

module.exports = mongoose.model('event', eventSchema);
