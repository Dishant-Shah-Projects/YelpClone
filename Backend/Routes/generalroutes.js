const express = require('express');

const Router = express.Router();

const {
  userSignup,
} = require('../Functionality/generalFunctionalities');

Router.post('/signup', async (req, res) => {
  const value = await userSignup(req, res);
  return value;
});

module.exports = Router;
