/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        restaurantID: 5,
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
const userLogin = async (req, res) => {
  try {
    const {
      UserName, Password, Role,
    } = req.body;
    console.log(req.body);
    if (Role === 'Restaurant') {
      Restaurant.findOne({ UserName }, (e, data) => {
        if (e) {
          console.log(e);
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Incorrecct Credentials');
        } else if (data.Password === Password) {
          const payload = { rol: Role, Name: UserName, ID: data.restaurantID };
          const accesstoken = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          res.status(200).end(JSON.stringify(`JWT ${accesstoken}`));
        } else {
          res.writeHead(400, {
            'Content-Type': 'text/plain',
          });
          res.end(JSON.stringify('Incorect Password'));
        }
      });
    } else {
      Customer.findOne({ UserName }, (e, data) => {
        if (e) {
          console.log(e);
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Incorrecct Credentials');
        } else if (data.Password === Password) {
          const payload = { rol: Role, Name: UserName, ID: data.customerID };
          const accesstoken = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          res.status(200).end(JSON.stringify(`JWT ${accesstoken}`));
        } else {
          res.writeHead(400, {
            'Content-Type': 'text/plain',
          });
          res.end(JSON.stringify('Incorect Password'));
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
// To logout the user
const userLogout = async (req, res) => {
  req.logout();
  res.status(200).end('Logged out');
};

module.exports = {
  userSignup,
  userLogin,
  userLogout,
};
