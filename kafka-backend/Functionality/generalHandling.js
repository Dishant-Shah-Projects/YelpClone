/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable default-case */

const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Restaurant = require('../models/Restaurant');
const Customer = require('../models/Customer');
const { secret } = require('../config');

async function handle_request(msg, callback) {
  switch (msg.api) {
    case 'userSignup': {
      const res = {};
      try {
        const {
          FirstName, LastName, UserName, Password, Role, location,
        } = msg.body;
        if (Role === 'Restaurant') {
          const exist = await Restaurant.findOne({ UserName });
          if (exist) {
            res.status = 400;
            res.end = 'Username already exists';
            callback(null, res);
          } else {
            let lat = null;
            let lng = null;
            const data = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
              params: {
                address: location,
                key: 'AIzaSyBej0Pq1ieVvLjN9gq-ic0_GL81LytLEH4',
              },
            });
            lat = data.data.results[0].geometry.location.lat;
            lng = data.data.results[0].geometry.location.lng;
            const restaurantID = await Restaurant.findOne().sort('-restaurantID');
            const newID = restaurantID.restaurantID + 1;
            const hashedPassword = await bcrypt.hash(Password, 10);
            const restaurant = new Restaurant({
              restaurantID: newID,
              UserName,
              Name: FirstName,
              Password: hashedPassword,
              Location: msg.body.Location,
              Lat: lat,
              Long: lng,
            });
            restaurant.save((e, _data) => {
              if (e) {
                console.log(e);
                res.status = 500;
                res.end = 'Network Error';
                callback(null, res);
              } else {
                res.status = 201;
                res.end = 'ProfileCreated';
                callback(null, res);
              }
            });
          }
        } else {
          const exist = await Customer.findOne({ UserName });
          if (exist !== null) {
            res.status = 400;
            res.end = 'Username already exists';
            callback(null, res);
          } else {
            const customer = await Customer.findOne().sort('-customerID');
            const newID = customer.customerID + 1;
            const hashedPassword = await bcrypt.hash(Password, 10);
            const custom = new Customer({
              customerID: newID,
              UserName,
              FirstName,
              LastName,
              Password: hashedPassword,

            });
            custom.save((e, data) => {
              if (e) {
                console.log(e);
                res.status = 500;
                res.end = 'Network Error';
                callback(null, res);
              } else {
                res.status = 201;
                res.end = 'ProfileCreated';
                callback(null, res);
              }
            });
          }
        }
      } catch (err) {
        console.log(err);
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'authenticate': {
      const res = {};
      try {
        if (msg.body.rol === 'Restaurant') {
          Restaurant.findOne({ restaurantID: msg.body.ID }, (err, results) => {
            if (err) {
              return callback(err, null);
            }
            if (results) {
              callback(null, results);
            } else {
              callback(null, null);
            }
          });
        } else if (msg.body.rol === 'Customer') {
          Customer.findOne({ customerID: msg.body.ID }, (err, results) => {
            if (err) {
              callback(err, null);
            }
            if (results) {
              res.status = 500;
              res.end = 'Network Error';
              callback(null, results);
            } else {
              res.status = 200;
              res.end = 'authenticate';
              callback(null, null);
            }
          });
        }
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'userLogin': {
      const res = {};
      try {
        const {
          UserName, Password, Role,
        } = msg.body;
        if (Role === 'Restaurant') {
          const user = await Restaurant.findOne({ UserName });
          const passcheck = await bcrypt.compare(Password, user.Password);
          if ((user) && (passcheck)) {
            const payload = { rol: Role, Name: UserName, ID: user.restaurantID };
            const accesstoken = jwt.sign(payload, secret, {
              expiresIn: 1008000,
            });
            res.status = 200;
            res.end = JSON.stringify(`JWT ${accesstoken}`);
            callback(null, res);
          } else if (user) {
            res.status = 403;
            res.end = JSON.stringify('Incorrect Password');
          } else {
            res.status = 200;
            res.end = JSON.stringify('Incorrect Credentials');
          }
        } else {
          const user = await Customer.findOne({ UserName });
          if ((user) && (await bcrypt.compare(Password, user.Password))) {
            const payload = { rol: Role, Name: UserName, ID: user.customerID };
            const accesstoken = jwt.sign(payload, secret, {
              expiresIn: 1008000,
            });
            res.status = 200;
            res.end = JSON.stringify(`JWT ${accesstoken}`);
            callback(null, res);
          } else if (user) {
            res.status = 403;
            res.end = JSON.stringify('Incorrect Password');
          } else {
            res.status = 200;
            res.end = JSON.stringify('Incorrect Credentials');
          }
        }
      } catch (err) {
        console.log(err);
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
  }
}
exports.handle_request = handle_request;
