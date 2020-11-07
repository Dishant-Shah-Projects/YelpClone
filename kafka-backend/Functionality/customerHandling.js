/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

const Customer = require('../models/Customer');
const Restaurant = require('../models/Restaurant');
const order = require('../models/order');
const events = require('../models/events');
const messages = require('../models/Messages');

async function handle_request(msg, callback) {
  switch (msg.api) {
    case 'getProfile': {
      const res = {};
      try {
        const { customerID } = msg.query;
        Customer.findOne({ customerID }, (err, results) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = JSON.stringify(results);
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'profilePictureUpdate': {
      const res = {};
      try {
        const { customerID, ProfilePicURL } = msg.query;
        Customer.findOneAndUpdate({ customerID }, {
          ProfilePicURL,
        }, (err, results) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = JSON.stringify(results);
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'profileUpdate': {
      const res = {};
      try {
        const {
          customerID, Email, DOB, City, State, Country, Headline, Nickname,
        } = msg.body;
        Customer.findOneAndUpdate({ customerID }, {
          Email, DOB, City, State, Country, Headline, Nickname,
        }, (err, results) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = JSON.stringify(results);
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'updateAbout': {
      const res = {};
      try {
        const {
          customerID, ThingsILove, Findme, AboutMe,
        } = msg.body;
        Customer.findOneAndUpdate({ customerID }, {
          ThingsILove, Findme, AboutMe,
        }, (err, results) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = JSON.stringify(results);
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'restaurantProfile': {
      const res = {};
      try {
        const { restaurantID } = msg.query;
        const user = await Restaurant.findOne({ restaurantID }).select('-Password');
        if (user) {
          res.status = 200;
          res.end = JSON.stringify(user);
          callback(null, res);
        } else {
          res.status = 500;
          res.end = 'Network Error';
          callback(null, res);
        }
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'restaurantOrder': {
      const res = {};
      try {
        const eventslist = await order.find();
        const orderID = 1 + eventslist.length;
        // eslint-disable-next-line new-cap
        const newevent = new order({
          orderID, ...msg.body, OrderDateTime: Date.now(), OrderStatus: 'Order Received',
        });
        newevent.save((err, results) => {
          if (err) {
            console.log(err);
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = JSON.stringify(results);
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'restaurantMenu': {
      const res = {};
      try {
        const {
          restaurantID, PageNo,
        } = msg.body;
        Restaurant.findOne(
          { restaurantID }, (err, model) => {
            if (err) {
              console.log(err);
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            } else if (model) {
              const resultarray = [];
              const pages = Math.ceil(model.Menu.length / 5);
              resultarray.push(pages);
              resultarray.push(model.Menu.slice(PageNo * 5, PageNo * 5 + 5));
              res.status = 200;
              res.end = JSON.stringify(resultarray);
              callback(null, res);
            } else {
              res.status = 400;
              res.end = JSON.stringify('No Menu');
              callback(null, res);
            }
          },
        );
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'restaurantRating': {
      const res = {};
      try {
        const {
          restaurantID, PageNo,
        } = msg.body;
        Restaurant.findOne(
          { restaurantID }, (err, model) => {
            if (err) {
              console.log(err);
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            } else if (model) {
              const resultarray = [];
              const pages = Math.ceil(model.Reviews.length / 5);
              resultarray.push(pages);
              resultarray.push(model.Reviews.slice(PageNo * 5, PageNo * 5 + 5));
              res.status = 200;
              res.end = JSON.stringify(resultarray);
              callback(null, res);
            } else {
              res.status = 400;
              res.end = JSON.stringify('No Menu');
              callback(null, res);
            }
          },
        );
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'restaurantRatingAdd': {
      const res = {};
      try {
        const {
          restaurantID, Review, Rating, customerID, customerName,
        } = msg.body;
        const review = {
          DatePosted: Date.now(), Review, Rating, customerID, customerName,
        };
        Restaurant.findOneAndUpdate(
          { restaurantID },
          {
            $push: {
              Reviews: review,
            },
          },
          { safe: true, upsert: true, new: true }, (err, results) => {
            if (err) {
              console.log(err);
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            } else {
              res.status = 200;
              res.end = JSON.stringify(results);
              callback(null, res);
            }
          },
        );
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getOrders': {
      const res = {};
      try {
        const {
          customerID, OrderStatus, Sorted, Filtered, PageNo,
        } = msg.body;
        console.log(msg.body);
        let eventlist = null;
        if ((Sorted) && (Filtered)) {
          eventlist = await order.find({ customerID, OrderStatus }).sort({ Date: 'descending' });
        } else if (Sorted) {
          eventlist = await order.find({ customerID }).sort({ Date: 'descending' });
        } else if (Filtered) {
          eventlist = await order.find({ customerID, OrderStatus }).sort({ Date: 'ascending' });
        } else {
          eventlist = await order.find({ customerID }).sort({ Date: 'ascending' });
        }
        console.log(eventlist);
        if (eventlist) {
          const resultarray = [];
          const pages = Math.ceil(eventlist.length / 5);
          resultarray.push(pages);
          resultarray.push(eventlist.slice(PageNo * 5, PageNo * 5 + 5));
          res.status = 200;
          res.end = JSON.stringify(resultarray);
          callback(null, res);
        } else {
          res.status = 500;
          res.end = 'Network Error';
          callback(null, res);
        }
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'customerProfile': {
      const res = {};
      try {
        const { customerID } = msg.query;
        const user = await Customer.findOne({ customerID }).select('-Password');
        if (user) {
          res.status = 200;
          res.end = JSON.stringify(user);
          callback(null, res);
        } else {
          res.status = 500;
          res.end = 'Network Error';
          callback(null, res);
        }
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getEvents': {
      const res = {};
      try {
        const {
          CustomerID, Sorted, Registered, SearchString,
        } = msg.body;
        let eventlist = null;
        if (SearchString !== '') {
          eventlist = await events.find({ EventName: { $regex: `.*${SearchString}.*` } }).sort({ Date: 'descending' });
        } else if ((Sorted) && (Registered)) {
          eventlist = await events.find({ 'PeopleRegistered.CustomerID': CustomerID, Date: { $gt: Date.now() } }).sort({ Date: 'descending' });
        } else if (Sorted) {
          eventlist = await events.find({ Date: { $gt: Date.now() } }).sort({ Date: 'descending' });
        } else if (Registered) {
          eventlist = await events.find({ 'PeopleRegistered.CustomerID': CustomerID, Date: { $gt: Date.now() } }).sort({ Date: 'ascending' });
        } else {
          eventlist = await events.find({ Date: { $gt: Date.now() } }).sort({ Date: 'ascending' });
        }
        if (eventlist) {
          res.status = 200;
          res.end = JSON.stringify(eventlist);
          callback(null, res);
        } else {
          res.status = 500;
          res.end = 'Network Error';
          callback(null, res);
        }
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'eventsRegister': {
      const res = {};
      try {
        const {
          eventID, CustomerID, CustomerName,
        } = msg.body;
        const review = {
          CustomerID, CustomerName,
        };
        events.findOneAndUpdate(
          { eventID },
          {
            $push: {
              PeopleRegistered: review,
            },
          },
          { safe: true, upsert: true, new: true }, (err, results) => {
            if (err) {
              console.log(err);
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            } else {
              res.status = 200;
              res.end = JSON.stringify(results);
              callback(null, res);
            }
          },
        );
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'customerSearch': {
      const res = {};
      try {
        const {
          PageNo, term, value, CustomerID,
        } = msg.query;
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
        } else if (term === 'location') {
          const user2 = await Customer.findOne({ CustomerID }).select('-Password');
          const user3 = await Customer.find({ State: user2.State }).select('-Password');
          user = user3;
        }
        if (user) {
          const resultarray = [];
          const pages = Math.ceil(user.length / 5);
          resultarray.push(pages);
          resultarray.push(user.slice(PageNo * 5, PageNo * 5 + 5));
          res.status = 200;
          res.end = JSON.stringify(resultarray);
          callback(null, res);
        } else {
          res.status = 500;
          res.end = 'Network Error';
          callback(null, res);
        }
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'customerFollow': {
      const res = {};
      try {
        const {
          customerID, followID, CustomerName,
        } = msg.body;
        const review = {
          CustomerID: followID, CustomerName,
        };
        Customer.findOneAndUpdate(
          { customerID },
          {
            $push: {
              PeopleFollowed: review,
            },
          },
          { safe: true, upsert: true, new: true }, (err, results) => {
            if (err) {
              console.log(err);
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            } else {
              res.status = 200;
              res.end = JSON.stringify(results);
              callback(null, res);
            }
          },
        );
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'restaurantSearch': {
      const res = {};
      try {
        const { term, value } = msg.query;
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
          res.status = 200;
          res.end = JSON.stringify(user);
          callback(null, res);
        } else {
          res.status = 500;
          res.end = 'Network Error';
          callback(null, res);
        }
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'messageLoad': {
      const res = {};
      try {
        const {
          customerID,
        } = msg.body;
        console.log(msg.body);
        messages.find(customerID, (err, results) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = JSON.stringify(results);
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'messageSend': {
      const res = {};
      try {
        const {
          restaurantID,
          customerID,
          restaurantName,
          customerName,
          Messager,
          Message,
        } = msg.body;
        const conversation = await messages.find({ restaurantID, customerID });
        if (conversation) {
          messages.findOneAndUpdate(
            { restaurantID, customerID },
            {
              $push: {
                Messages: {
                  Messager, Message,
                },
              },
            },
            { safe: true, upsert: true, new: true }, (err, results) => {
              if (err) {
                res.status = 500;
                res.end = 'Network Error';
                callback(null, res);
              } else {
                res.status = 200;
                res.end = JSON.stringify(results);
                callback(null, res);
              }
            },
          );
        } else {
          const mes = new messages({
            restaurantID,
            customerID,
            restaurantName,
            customerName,
            Date: Date.now(),
            Messages: [{ Messager, Message }],
          });
          mes.save(
            (err, model) => {
              if (err) {
                res.status = 500;
                res.end = 'Network Error';
                callback(null, res);
              } else {
                res.status = 200;
                res.end = 'OutputSaved';
                callback(null, res);
              }
            },
          );
        }
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
  }
}
exports.handle_request = handle_request;
