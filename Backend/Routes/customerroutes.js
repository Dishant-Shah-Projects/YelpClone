/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const multer = require('multer');
const kafka = require('../kafka/client');

const Router = express.Router();
const { auth, checkAuth } = require('../Functionality/passport');

auth();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.jpg`);
  },
});
const upload = multer({ storage: multerStorage }).single('profileImage');
const {

  profilePictureUpdate,
} = require('../Functionality/customerFunctionality');
// loadprofile
Router.get('/profile', checkAuth, async (req, res) => {
  const data = {
    api: 'getProfile',
    query: req.query,
  };
  kafka.make_request('customer444', data, (err, results) => {
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
  kafka.make_request('customer444', data, (err, results) => {
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
Router.post('/profilePicture', upload, async (req, res) => {
  const value = await profilePictureUpdate(req, res);
  return value;
});
Router.post('/profileAbout', checkAuth, async (req, res) => {
  const data = {
    api: 'updateAbout',
    body: req.body,
  };
  kafka.make_request('customer444', data, (err, results) => {
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
Router.post('/restaurantSearch', checkAuth, async (req, res) => {
  const data = {
    api: 'restaurantSearch',
    body: req.body,
  };
  kafka.make_request('customer444', data, (err, results) => {
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

// Components for restaurant page
Router.get('/restaurantProfile', checkAuth, async (req, res) => {
  const data = {
    api: 'restaurantProfile',
    query: req.query,
  };
  kafka.make_request('customer444', data, (err, results) => {
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

Router.post('/restaurantaddOrder', checkAuth, async (req, res) => {
  const data = {
    api: 'restaurantOrder',
    body: req.body,
  };
  kafka.make_request('customer444', data, (err, results) => {
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
Router.post('/restaurantMenu', checkAuth, async (req, res) => {
  const data = {
    api: 'restaurantMenu',
    body: req.body,
  };
  kafka.make_request('customer444', data, (err, results) => {
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
Router.post('/restaurantRatings', checkAuth, async (req, res) => {
  const data = {
    api: 'restaurantRating',
    body: req.body,
  };
  kafka.make_request('customer444', data, (err, results) => {
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
Router.post('/restaurantRatingsAdd', checkAuth, async (req, res) => {
  const data = {
    api: 'restaurantRatingAdd',
    body: req.body,
  };
  kafka.make_request('customer444', data, (err, results) => {
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

// compoents for orders page
// orders view pagination
Router.post('/orders', checkAuth, async (req, res) => {
  const data = {
    api: 'getOrders',
    body: req.body,
  };
  kafka.make_request('customer444', data, (err, results) => {
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
Router.get('/customerProfile', checkAuth, async (req, res) => {
  const data = {
    api: 'customerProfile',
    query: req.query,
  };
  kafka.make_request('customer444', data, (err, results) => {
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
Router.post('/events', checkAuth, async (req, res) => {
  const data = {
    api: 'getEvents',
    body: req.body,
  };
  kafka.make_request('customer444', data, (err, results) => {
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
Router.post('/eventsregister', checkAuth, async (req, res) => {
  const data = {
    api: 'eventsRegister',
    body: req.body,
  };
  kafka.make_request('customer444', data, (err, results) => {
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
Router.post('/customerSearch', checkAuth, async (req, res) => {
  const data = {
    api: 'customerSearch',
    body: req.body,
  };
  kafka.make_request('customer444', data, (err, results) => {
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
Router.post('/customerFollow', checkAuth, async (req, res) => {
  const data = {
    api: 'customerFollow',
    body: req.body,
  };
  kafka.make_request('customer444', data, (err, results) => {
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
Router.post('/messageSend', checkAuth, async (req, res) => {
  const data = {
    api: 'messageSend',
    body: req.body,
  };
  kafka.make_request('customer444', data, (err, results) => {
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
Router.post('/Messageload', checkAuth, async (req, res) => {
  const data = {
    api: 'messageLoad',
    body: req.body,
  };
  kafka.make_request('customer444', data, (err, results) => {
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
