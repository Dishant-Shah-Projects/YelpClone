const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerID: { type: Number, required: true },
  UserName: { type: String, required: true },
  FirstName: { type: String },
  LastName: { type: String },
  ProfilePicURL: { type: String },
  Email: { type: String },
  Password: { type: String, required: true },
  PhoneNo: { type: Number },
  AboutMe: { type: String },
  ThingsILove: { type: String },
  Findme: { type: String },
  DOB: { type: Date },
  City: { type: String },
  State: { type: String },
  Country: { type: String },
  Nickname: { type: String },
  Headline: { type: String },
  PeopleFollowed: [
    {
      CustomerID: {
        type: Number,
      },
      CustomerName: { type: String },
    },
  ],

});

module.exports = mongoose.model('customer', customerSchema);
