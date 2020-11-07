/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const multer = require('multer');

const Router = express.Router();
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.jpg`);
  },
});
const kafka = require('../kafka/client');

const upload = multer({ storage: multerStorage }).single('food');

const { auth, checkAuth } = require('../Functionality/passport');

auth();
// loadprofile
Router.get('/profile', checkAuth, async (req, res) => {
  const data = {
    api: 'getProfile',
    query: req.query,
  };
  kafka.make_request('restaurant444', data, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.end('Network Error');
    } else {
      console.log('Inside else');
      res.status(results.status);
      res.end(results.end);
    }
  });
});
// update profile
Router.post('/profileUpdate', checkAuth, async (req, res) => {
  const data = {
    api: 'profileUpdate',
    body: req.body,
  };
  kafka.make_request('restaurant444', data, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.end('Network Error');
    } else {
      console.log('Inside else');
      res.status(results.status);
      res.end(results.end);
    }
  });
});
// pagination for list of dished
Router.post('/menu', checkAuth, async (req, res) => {
  const data = {
    api: 'restaurantMenu',
    body: req.body,
  };
  kafka.make_request('restaurant444', data, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.end('Network Error');
    } else {
      console.log('Inside else');
      res.status(results.status);
      res.end(results.end);
    }
  });
});
// menu add
Router.post('/menuAdd', upload, checkAuth, async (req, res) => {
  req.body.DishIMG = req.file.filename;
  const data = {
    api: 'menuAdd',
    body: req.body,
  };
  kafka.make_request('restaurant444', data, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.end('Network Error');
    } else {
      console.log('Inside else');
      res.status(results.status);
      res.end(results.end);
    }
  });
});
// review view
Router.get('/review', checkAuth, async (req, res) => {
  const data = {
    api: 'restaurantRating',
    query: req.query,
  };
  kafka.make_request('restaurant444', data, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.end('Network Error');
    } else {
      console.log('Inside else');
      res.status(results.status);
      res.end(results.end);
    }
  });
});
// orders view pagination
Router.post('/orders', checkAuth, async (req, res) => {
  const data = {
    api: 'getOrders',
    body: req.body,
  };
  kafka.make_request('restaurant444', data, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.end('Network Error');
    } else {
      console.log('Inside else');
      res.status(results.status);
      res.end(results.end);
    }
  });
});
// orders update status
Router.post('/orderUpdate', checkAuth, async (req, res) => {
  const data = {
    api: 'orderUpdate',
    query: req.query,
  };
  kafka.make_request('restaurant444', data, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.end('Network Error');
    } else {
      console.log('Inside else');
      res.status(results.status);
      res.end(results.end);
    }
  });
});
// orders customerprofilepage
Router.get('/customer', checkAuth, async (req, res) => {
  const data = {
    api: 'customerProfile',
    query: req.query,
  };
  kafka.make_request('restaurant444', data, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.end('Network Error');
    } else {
      console.log('Inside else');
      res.status(results.status);
      res.end(results.end);
    }
  });
});
Router.get('/events', checkAuth, async (req, res) => {
  const data = {
    api: 'getEvents',
    query: req.query,
  };
  kafka.make_request('restaurant444', data, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.end('Network Error');
    } else {
      console.log('Inside else');
      res.status(results.status);
      res.end(results.end);
    }
  });
});
Router.post('/eventsPost', checkAuth, async (req, res) => {
  const data = {
    api: 'eventPost',
    body: req.body,
  };
  kafka.make_request('restaurant444', data, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.end('Network Error');
    } else {
      console.log('Inside else');
      res.status(results.status);
      res.end(results.end);
    }
  });
});
Router.post('/messagesend', checkAuth, async (req, res) => {
  const data = {
    api: 'messageSend',
    body: req.body,
  };
  kafka.make_request('restaurant444', data, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.end('Network Error');
    } else {
      console.log('Inside else');
      res.status(results.status);
      res.end(results.end);
    }
  });
});
Router.post('/messageLoad', checkAuth, async (req, res) => {
  const data = {
    api: 'messageLoad',
    body: req.body,
  };
  kafka.make_request('restaurant444', data, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.end('Network Error');
    } else {
      console.log('Inside else');
      res.status(results.status);
      res.end(results.end);
    }
  });
});

module.exports = Router;
