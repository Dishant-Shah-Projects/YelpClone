/* eslint-disable object-shorthand */
const bcrypt = require('bcrypt');
const { secret } = require('../config');
const Customer = require('../models/Customer');
const Restaurant = require('../models/Restaurant');
const order = require('../models/order');
const events = require('../models/events');

// Fucntion to check if the emailID is already in use

const userSignup = async (req, res) => {
  try {
    const {
      Name, UserName, Password, Role,
    } = req.body;
    console.log(req.body);
    if (Role === 'Restaurant') {
      const restaurant = new Restaurant({
        restaurantID: 13,
        UserName: UserName,
        Name: Name,
        Password: Password,

      });
      restaurant.save((e, data) => {
        if (e) {
          console.log(e);
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Network Error');
        } else {
          res.writeHead(201, {
            'Content-Type': 'text/plain',
          });
          res.end(JSON.stringify('Profile Created'));
        }
      });
    } else {
      const custom = new Customer({
        customerID: 23,
        UserName: UserName,
        Name: Name,
        Password: Password,

      });
      custom.save((e, data) => {
        if (e) {
          console.log(e);
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Network Error');
        } else {
          res.writeHead(201, {
            'Content-Type': 'text/plain',
          });
          res.end(JSON.stringify('Profile Created'));
        }
      });
    }
  } catch {
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    res.end(JSON.stringify('network error'));
  }

  return res;
};

module.exports = {
  userSignup,
};
