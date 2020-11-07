/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable default-case */

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
        Restaurant.findOne({ customerID }, (err, results) => {
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
    case 'menuAdd': {
      const res = {};
      try {
        const {
          restaurantID, DishName, Mainingredients, Description, DishPrice, Category, DishIMG,
        } = msg.body;
        const rest = await Restaurant.findOne({ restaurantID });
        const ItemID = 1 + rest.Menu.length;
        Restaurant.findOneAndUpdate(
          { restaurantID },
          {
            $push: {
              Menu: {
                ItemID, DishName, Mainingredients, DishIMG, DishPrice, Description, Category,
              },
            },
          },
          { safe: true, upsert: true, new: true },
          (err, model) => {
            if (err) {
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            } else {
              res.status = 200;
              res.end = JSON.stringify(model);
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
    case 'profileUpdate': {
      const res = {};
      try {
        const {
          restaurantID, PhoneNo, Cusine, Description, PickMethod, ContactEmail,
        } = msg.body;
        Restaurant.findOneAndUpdate({ restaurantID }, {
          PhoneNo, Cusine, Description, PickMethod, ContactEmail,
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
    case 'messageLoad': {
      const res = {};
      try {
        const {
          restaurantID,
        } = msg.body;
        console.log(msg.body);
        messages.find({ restaurantID }, (err, results) => {
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
          // eslint-disable-next-line new-cap
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
        } = msg.query;
        Restaurant.findOne(
          { restaurantID }, (err, model) => {
            if (err) {
              console.log('Apple');
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
      } catch (error) {
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
    case 'orderUpdate': {
      const res = {};
      try {
        const {
          orderID,
          OrderStatus,
        } = msg.body;
        order.findOneAndUpdate({ orderID }, {
          OrderStatus,
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
    case 'getOrders': {
      const res = {};
      try {
        const {
          restaurantID, OrderStatus, Filtered, PageNo,
        } = msg.body;
        let eventlist = null;
        if (Filtered) {
          eventlist = await events.find({ restaurantID, OrderStatus }).sort({ Date: 'ascending' });
        } else {
          eventlist = await events.find({ restaurantID }).sort({ Date: 'ascending' });
        }
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
    case 'getEvents': {
      const res = {};
      try {
        const {
          restaurantID, PageNo,
        } = msg.query;
        let eventlist = null;

        eventlist = await events.find({ restaurantID }).sort({ Date: 'descending' });

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
    case 'eventPost': {
      const res = {};
      try {
        const {
          restaurantID, restaurantName, EventName, Description, Time, Date, Location, Hashtags,
        } = msg.body;
        const eventslist = await events.find({ restaurantID });
        const eventID = 1 + eventslist.length;
        // eslint-disable-next-line new-cap
        const newevent = new events({
          eventID, ...msg.body,
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
  }
}
exports.handle_request = handle_request;
