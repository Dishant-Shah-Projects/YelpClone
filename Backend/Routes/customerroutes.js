/* eslint-disable no-unused-vars */
const express = require('express');

const Router = express.Router();

const {
  getProfile,
  profileUpdate,
  messageLoad,
  messageSend,
  updateAbout,
  restaurantProfile,
  restaurantOrder,
  restaurantRatingAdd,
  restaurantRating,
  getMenu,
  customerFollow,
  eventsRegister,
  customerProfile,
  getEvents,
  getOrders,

} = require('../Functionality/customerFunctionality');
// loadprofile
Router.get('/profile', async (req, res) => {
  const value = await getProfile(req, res);
  return value;
});
// update profile
Router.post('/profileUpdate', async (req, res) => {
  const value = await profileUpdate(req, res);
  return value;
});
Router.post('/profilePicture', async (req, res) => {

});
Router.post('/profileAbout', async (req, res) => {
  const value = await updateAbout(req, res);
  return value;
});
Router.post('/restaurantSearch', async (req, res) => {

});

// Components for restaurant page
Router.post('/restaurantProfile', async (req, res) => {
  const value = await restaurantProfile(req, res);
  return value;
});

Router.post('/restaurantaddOrder', async (req, res) => {
  const value = await restaurantOrder(req, res);
  return value;
});
Router.post('/restaurantMenu', async (req, res) => {
  const value = await getMenu(req, res);
  return value;
});
Router.post('/restaurantRatings', async (req, res) => {
  const value = await restaurantRating(req, res);
  return value;
});
Router.post('/restaurantRatingsAdd', async (req, res) => {
  console.log(req.body);
  const value = await restaurantRatingAdd(req, res);
  return value;
});

// compoents for orders page
// orders view pagination
Router.post('/orders', async (req, res) => {
  const value = await getOrders(req, res);
  return value;
});

// orders customerprofilepage
Router.post('/customerProfile', async (req, res) => {
  const value = await customerProfile(req, res);
  return value;
});
Router.post('/events', async (req, res) => {
  const value = await getEvents(req, res);
  return value;
});
Router.post('/eventsregister', async (req, res) => {
  console.log(req.body);
  const value = await eventsRegister(req, res);
  return value;
});
Router.post('/customerSearch', async (req, res) => {
});
Router.post('/customerFollow', async (req, res) => {
  const value = await customerFollow(req, res);
  return value;
});
Router.post('/Messagesend', async (req, res) => {
  const value = await messageSend(req, res);
  return value;
});
Router.post('/Messageload', async (req, res) => {
  const value = await messageLoad(req, res);
  return value;
});
module.exports = Router;
