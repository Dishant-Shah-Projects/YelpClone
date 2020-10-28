const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  restaurantID: { type: Number, required: true },
  Name: { type: String },
  PicURLs: [String],
  UserName: { type: String, required: true },
  Password: { type: String, required: true },
  PhoneNo: { type: Number },
  ContactEmail: { type: String },
  PickMethod: { type: String },
  Location: { type: String },
  Lat: { type: Number },
  Long: { type: Number },
  Cusine: { type: String },
  Menu: [
    {
      ItemID: {
        type: Number,
      },
      DishName: { type: String },
      Mainingredients: { type: String },
      DishIMG: { type: String },
      DishPrice: { type: Number },
      Description: { type: String },
      Category: { type: String },
    },
  ],
  Reviews: [
    {
      DatePosted: { type: Date },
      Review: { type: Number },
      Rating: { type: Number },
      customerID: { type: String },
      customerName: { type: String },
    },
  ],

});

module.exports = mongoose.model('restaurant', restaurantSchema);
