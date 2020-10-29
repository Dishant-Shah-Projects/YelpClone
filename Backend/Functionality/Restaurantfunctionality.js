/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

const Customer = require('../models/Customer');
const Restaurant = require('../models/Restaurant');
const order = require('../models/order');
const events = require('../models/events');
const messages = require('../models/Messages');

const getProfile = async (req, res) => {
  try {
    const { restaurantID } = req.query;
    Restaurant.findOne({ restaurantID }, (err, results) => {
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
const getReviews = async (req, res) => {
  try {
    const { restaurantID } = req.query;
    Restaurant.findOne({ restaurantID }, (err, results) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Restaurant not found');
      } else {
        res.writeHead(201, {
          'Content-Type': 'text/plain',
        });
        res.end(JSON.stringify(results.Reviews));
      }
    });
  } catch {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// update restaurant profile
const profileUpdate = async (req, res) => {
  try {
    const {
      restaurantID, PhoneNo, Cusine, Description, PickMethod, ContactEmail,
    } = req.body;
    Restaurant.findOneAndUpdate({ restaurantID }, {
      PhoneNo, Cusine, Description, PickMethod, ContactEmail,
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
const menuAdd = async (req, res) => {
  try {
    const {
      restaurantID, DishName, Mainingredients, Description, DishIMG, DishPrice, Category,
    } = req.body;
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
          console.log('ERROR: ', err);
          res.send(500, err);
        } else {
          res.writeHead(201, {
            'Content-Type': 'text/plain',
          });
          res.end(JSON.stringify(model));
        }
      },
    );
  } catch {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
const getOrders = async (req, res) => {
  try {
    const {
      restaurantID, PageNo,
    } = req.body;
    order.find(
      { restaurantID },
      (err, model) => {
        if (err) {
          console.log('ERROR: ', err);
          res.send(500, err);
        } else {
          const resultarray = [];
          const pages = Math.ceil(model.length / 5);
          resultarray.push(pages);
          resultarray.push(model.slice(PageNo * 5, PageNo * 5 + 5));
          res.writeHead(201, {
            'Content-Type': 'text/plain',
          });
          res.end(JSON.stringify(resultarray));
        }
      },
    );
  } catch {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
const eventPost = async (req, res) => {
  try {
    const {
      restaurantID, restaurantName, EventName, Description, Time, Date, Location, Hashtags,
    } = req.body;
    const eventslist = await events.find({ restaurantID });
    const eventID = 1 + eventslist.length;
    // eslint-disable-next-line new-cap
    const newevent = new events({
      eventID, ...req.body,
    });
    newevent.save(
      (err, model) => {
        if (err) {
          console.log('ERROR: ', err);
          res.send(500, err);
        } else {
          res.writeHead(201, {
            'Content-Type': 'text/plain',
          });
          res.end();
        }
      },
    );
  } catch {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
const customerProfile = async (req, res) => {
  try {
    const { customerID } = req.query;
    console.log(req.query);
    const user = await Customer.findOne({ customerID }).select('-Password');
    if (user) {
      res.writeHead(201, {
        'Content-Type': 'text/plain',
      });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(500, { 'content-type': 'text/json' });
      res.end(JSON.stringify('swag'));
    }
  } catch {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
const getEvents = async (req, res) => {
  try {
    const {
      restaurantID, PageNo,
    } = req.body;
    events.find(
      { restaurantID },
      (err, model) => {
        if (err) {
          console.log('ERROR: ', err);
          res.send(500, err);
        } else {
          const resultarray = [];
          const pages = Math.ceil(model.length / 5);
          resultarray.push(pages);
          resultarray.push(model.slice(PageNo * 5, PageNo * 5 + 5));
          res.writeHead(201, {
            'Content-Type': 'text/plain',
          });
          res.end(JSON.stringify(resultarray));
        }
      },
    );
  } catch {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

const getMenu = async (req, res) => {
  try {
    const {
      restaurantID, PageNo,
    } = req.body;
    Restaurant.find(
      { restaurantID },
      (err, model) => {
        if (err) {
          console.log('ERROR: ', err);
          res.send(500, err);
        } else {
          const resultarray = [];
          const pages = Math.ceil(model.Menu.length / 5);
          resultarray.push(pages);
          resultarray.push(model.Menu.slice(PageNo * 5, PageNo * 5 + 5));
          res.writeHead(201, {
            'Content-Type': 'text/plain',
          });
          res.end(JSON.stringify(resultarray));
        }
      },
    );
  } catch {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
// update restaurant profile
const orderUpdate = async (req, res) => {
  try {
    const {
      orderID,
      OrderStatus,
    } = req.body;
    order.findOneAndUpdate({ orderID }, {
      OrderStatus,
    }, (err, results) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Restaurant not found');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.end();
      }
    });
  } catch {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
const messageLoad = async (req, res) => {
  try {
    const {
      restaurantID,
    } = req.body;
    messages.find({ restaurantID }, (err, results) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Restaurant not found');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.end(JSON.stringify(results));
      }
    });
  } catch {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
const messageSend = async (req, res) => {
  try {
    const {
      restaurantID,
      customerID,
      restaurantName,
      customerName,
      Messager,
      Message,
    } = req.body;
    const conversation = messages.find({ restaurantID, customerID });
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
        { safe: true, upsert: true, new: true },
        (err, model) => {
          if (err) {
            console.log('ERROR: ', err);
            res.send(500, err);
          } else {
            res.writeHead(201, {
              'Content-Type': 'text/plain',
            });
            res.end(JSON.stringify(model));
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
            console.log('ERROR: ', err);
            res.send(500, err);
          } else {
            res.writeHead(201, {
              'Content-Type': 'text/plain',
            });
            res.end();
          }
        },
      );
    }
  } catch {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
module.exports = {
  getProfile,
  profileUpdate,
  getReviews,
  menuAdd,
  getOrders,
  eventPost,
  customerProfile,
  getEvents,
  orderUpdate,
  messageLoad,
  messageSend,
};
