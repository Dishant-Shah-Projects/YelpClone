/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { secret } = require('../config');
const Customer = require('../models/Customer');
const Restaurant = require('../models/Restaurant');

// Fucntion to check if the emailID is already in use

const userSignup = async (req, res) => {
  try {
    const {
      FirstName, LastName, UserName, Password, Role, location,
    } = req.body;
    console.log(req.body);
    if (Role === 'Restaurant') {
      let lat = null;
      let lng = null;
      const data = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: location,
          key: 'AIzaSyBej0Pq1ieVvLjN9gq-ic0_GL81LytLEH4',
        },
      });
      console.log(data);
      lat = data.data.results[0].geometry.location.lat;
      lng = data.data.results[0].geometry.location.lng;
      const restaurantID = await Restaurant.findOne({ $query: {}, $orderby: { restaurantID: -1 } });
      const newID = restaurantID.restaurantID + 1;
      const hashedPassword = await bcrypt.hash(Password, 10);
      const restaurant = new Restaurant({
        restaurantID: newID,
        UserName: UserName,
        Name: FirstName,
        Password: hashedPassword,
        Location: req.body.Location,
        Lat: lat,
        Long: lng,
      });
      restaurant.save((e, _data) => {
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
      const restaurantID = await Customer.findOne({ $query: {}, $orderby: { customerID: -1 } });
      const newID = restaurantID.customerID + 1;
      const hashedPassword = await bcrypt.hash(Password, 10);
      const custom = new Customer({
        customerID: newID,
        UserName: UserName,
        FirstName: FirstName,
        LastName: LastName,
        Password: hashedPassword,

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
      const user = await Restaurant.findOne({ UserName });
      console.log(user);
      if ((user) && (await bcrypt.compare(Password, user.Password))) {
        const payload = { rol: Role, Name: UserName, ID: user.restaurantID };
        const accesstoken = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        res.status(200).end(JSON.stringify(`JWT ${accesstoken}`));
      } else if (user) {
        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.end(JSON.stringify('Incorect Password'));
      } else {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Incorrecct Credentials');
      }
    } else {
      const user = await Customer.findOne({ UserName });
      if ((user) && (await bcrypt.compare(Password, user.Password))) {
        const payload = { rol: Role, Name: UserName, ID: user.customerID };
        const accesstoken = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        res.status(200).end(JSON.stringify(`JWT ${accesstoken}`));
      } else if (user) {
        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.end(JSON.stringify('Incorect Password'));
      } else {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Incorrecct Credentials');
      }
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
