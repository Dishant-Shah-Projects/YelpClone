/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

const Customer = require('../models/Customer');
const Restaurant = require('../models/Restaurant');
const order = require('../models/order');
const events = require('../models/events');
const messages = require('../models/Messages');

const profileUpdate = async (req, res) => {
  try {
    const {
      customerID, Email, DOB, City, State, Country, Headline, Nickname,
    } = req.body;
    Customer.findOneAndUpdate({ customerID }, {
      Email, DOB, City, State, Country, Headline, Nickname,
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

const getProfile = async (req, res) => {
  try {
    const { customerID } = req.query;
    Customer.findOne({ customerID }, (err, results) => {
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

const updateAbout = async (req, res) => {
  try {
    const {
      customerID, ThingsILove, Findme, AboutMe,
    } = req.body;
    Customer.findOneAndUpdate({ customerID }, {
      ThingsILove, Findme, AboutMe,
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

const restaurantProfile = async (req, res) => {
  try {
    const { restaurantID } = req.query;
    console.log(req.query);
    const user = await Restaurant.findOne({ restaurantID }).select('-Password');
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
const restaurantOrder = async (req, res) => {
  try {
    const eventslist = await order.find();
    const orderID = 1 + eventslist.length;
    // eslint-disable-next-line new-cap
    const newevent = new order({
      orderID, ...req.body,
    });
    newevent.save(
      (err, model) => {
        if (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Restaurant not found');
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
const restaurantRatingAdd = async (req, res) => {
  try {
    const {
      restaurantID, Review, Rating, customerID, customerName,
    } = req.body;
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
      { safe: true, upsert: true, new: true },
      (err, model) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { 'content-type': 'text/json' });
          res.end(JSON.stringify('apple'));
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
const getMenu = async (req, res) => {
  try {
    const {
      restaurantID, PageNo,
    } = req.body;
    Restaurant.findOne(
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
const restaurantRating = async (req, res) => {
  try {
    const {
      restaurantID, PageNo,
    } = req.body;
    Restaurant.findOne(
      { restaurantID },
      (err, model) => {
        if (err) {
          console.log('ERROR: ', err);
          res.send(500, err);
        } else {
          const resultarray = [];
          const pages = Math.ceil(model.Reviews.length / 5);
          resultarray.push(pages);
          resultarray.push(model.Reviews.slice(PageNo * 5, PageNo * 5 + 5));
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
const customerFollow = async (req, res) => {
  try {
    const {
      customerID, followID, CustomerName,
    } = req.body;
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
      { safe: true, upsert: true, new: true },
      (err, model) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { 'content-type': 'text/json' });
          res.end(JSON.stringify('apple'));
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
const eventsRegister = async (req, res) => {
  try {
    const {
      eventID, CustomerID, CustomerName,
    } = req.body;
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
      { safe: true, upsert: true, new: true },
      (err, model) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { 'content-type': 'text/json' });
          res.end(JSON.stringify('apple'));
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
      CustomerID, Sorted, Registered,
    } = req.body;
    let eventlist = null;
    if ((Sorted) && (Registered)) {
      eventlist = await events.find({ 'PeopleRegistered.CustomerID': CustomerID, Date: { $gt: Date.now() } }).sort({ Date: 'descending' });
    } else if (Sorted) {
      eventlist = await events.find({ Date: { $gt: Date.now() } }).sort({ Date: 'descending' });
    } else if (Registered) {
      eventlist = await events.find({ 'PeopleRegistered.CustomerID': CustomerID, Date: { $gt: Date.now() } }).sort({ Date: 'ascending' });
    } else {
      eventlist = await events.find({ Date: { $gt: Date.now() } }).sort({ Date: 'ascending' });
    }
    if (eventlist) {
      res.writeHead(201, {
        'Content-Type': 'text/plain',
      });
      res.end(JSON.stringify(eventlist));
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
const getOrders = async (req, res) => {
  try {
    const {
      CustomerID, OrderStatus, Sorted, Filtered, PageNo,
    } = req.body;
    let eventlist = null;
    if ((Sorted) && (Filtered)) {
      eventlist = await events.find({ CustomerID, OrderStatus }).sort({ Date: 'descending' });
    } else if (Sorted) {
      eventlist = await events.find({ CustomerID }).sort({ Date: 'descending' });
    } else if (Filtered) {
      eventlist = await events.find({ CustomerID, OrderStatus }).sort({ Date: 'ascending' });
    } else {
      eventlist = await events.find({ CustomerID }).sort({ Date: 'ascending' });
    }

    if (eventlist) {
      const resultarray = [];
      const pages = Math.ceil(eventlist.length / 5);
      resultarray.push(pages);
      resultarray.push(eventlist.slice(PageNo * 5, PageNo * 5 + 5));
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
  getProfile,
  messageLoad,
  messageSend,
  profileUpdate,
  updateAbout,
  restaurantProfile,
  restaurantOrder,
  restaurantRatingAdd,
  getMenu,
  restaurantRating,
  customerFollow,
  eventsRegister,
  customerProfile,
  getEvents,
  getOrders,
  profilePictureUpdate,
};
