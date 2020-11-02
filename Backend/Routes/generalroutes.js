const express = require('express');

const Router = express.Router();
const { auth, checkAuth } = require('../Functionality/passport');

auth();
const {
  userSignup,
  userLogin,
  userLogout,
} = require('../Functionality/generalFunctionalities');

Router.post('/signup', async (req, res) => {
  const value = await userSignup(req, res);
  return value;
});

Router.post('/login', async (req, res) => {
  const value = await (userLogin(req, res));
  return value;
});
Router.post('/logout', async (req, res) => {
  const value = await (userLogout(req, res));
  return value;
});
Router.get('/authcheck', checkAuth, async (req, res) => {
  res.writeHead(201, {
    'Content-Type': 'text/plain',
  });
  res.end(JSON.stringify('Profile Works'));
});

module.exports = Router;
