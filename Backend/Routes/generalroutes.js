const express = require('express');

const Router = express.Router();

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

module.exports = Router;
