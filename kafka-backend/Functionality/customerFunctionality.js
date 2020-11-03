/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

const Customer = require('../models/Customer');
const Restaurant = require('../models/Restaurant');
const order = require('../models/order');
const events = require('../models/events');
const messages = require('../models/Messages');

const profilePictureUpdate = async (req, res) => {
  try {
    const {
      customerID,
    } = req.body;
    const Filename = req.file.filename;
    Customer.findOneAndUpdate({ customerID }, {
      ProfilePicURL: Filename,
    }, (err, results) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Restaurant not found');
      } else {
        res.end(JSON.stringify(results));
      }
    });
  } catch {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

const restaurantSearch = async (req, res) => {
  try {
    const { PageNo, term, value } = req.query;
    let user = null;
    if (term === 'Menu') {
      user = await Restaurant.find({ Menu: { DishName: value } }).select('-Password');
    } else if (term === 'Cusine') {
      user = await Restaurant.find({ Cusine: value }).select('-Password');
    } else if (term === 'Console') {
      user = await Restaurant.find({ Location: value }).select('-Password');
    } else {
      user = await Restaurant.find({ PickMethod: value }).select('-Password');
    }

    if (user) {
      const resultarray = [];
      const pages = Math.ceil(user.length / 5);
      resultarray.push(pages);
      resultarray.push(user.slice(PageNo * 5, PageNo * 5 + 5));
      res.writeHead(201, {
        'Content-Type': 'text/plain',
      });
      res.end(JSON.stringify(resultarray));
    } else {
      res.writeHead(400, { 'content-type': 'text/json' });
      res.end(JSON.stringify('swag'));
    }
  } catch {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
const customerSearch = async (req, res) => {
  try {
    const {
      PageNo, term, value, CustomerID,
    } = req.query;
    let user = null;
    if (term === 'FirstName') {
      user = await Customer.find({ FirstName: value }).select('-Password');
    } else if (term === 'Nickname') {
      user = await Customer.find({ Nickname: value }).select('-Password');
    } else if (term === 'LastName') {
      user = await Customer.find({ LastName: value }).select('-Password');
    } else if (term === 'Following') {
      const user2 = await Customer.findOne({ CustomerID }).select('-Password');
      user = user2.PeopleFollowed;
    }

    if (user) {
      const resultarray = [];
      const pages = Math.ceil(user.length / 5);
      resultarray.push(pages);
      resultarray.push(user.slice(PageNo * 5, PageNo * 5 + 5));
      res.writeHead(201, {
        'Content-Type': 'text/plain',
      });
      res.end(JSON.stringify(resultarray));
    } else {
      res.writeHead(400, { 'content-type': 'text/json' });
      res.end(JSON.stringify('swag'));
    }
  } catch {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
module.exports = {

  profilePictureUpdate,
  // restaurantSearch,
  // customerSearch,
};
