/* eslint-disable no-console */
const express = require('express');
const kafka = require('../kafka/client');

const Router = express.Router();
const { auth, checkAuth } = require('../Functionality/passport');

auth();

Router.post('/signup', async (req, res) => {
  const data = {
    api: 'userSignup',
    body: req.body,
  };
  kafka.make_request('general444', data, (err, results) => {
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

Router.post('/login', async (req, res) => {
  const data = {
    api: 'userLogin',
    body: req.body,
  };
  kafka.make_request('general444', data, (err, results) => {
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
Router.post('/logout', async (req, res) => {
  req.logout();
  res.status(200).end('Logged out');
});
Router.get('/authcheck', checkAuth, async (req, res) => {
  res.writeHead(201, {
    'Content-Type': 'text/plain',
  });
  res.end(JSON.stringify('Profile Works'));
});

module.exports = Router;
