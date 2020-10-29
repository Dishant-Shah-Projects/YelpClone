/* eslint-disable no-unused-vars */
const express = require('express');

const Router = express.Router();
const {
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
  getMenu,
} = require('../Functionality/Restaurantfunctionality');
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
// pagination for list of dished
Router.post('/Menu', async (req, res) => {
  const value = await getMenu(req, res);
  return value;
});
// menu add
Router.post('/menuAdd', async (req, res) => {
  const value = await menuAdd(req, res);
  return value;
});
// review view
Router.get('/review', async (req, res) => {
  const value = await getReviews(req, res);
  return value;
});
// orders view pagination
Router.post('/orders', async (req, res) => {
  const value = await getOrders(req, res);
  return value;
});
// orders update status
Router.post('/orderUpdate', async (req, res) => {
  const value = await orderUpdate(req, res);
  return value;
});
// orders customerprofilepage
Router.get('/customer', async (req, res) => {
  const value = await customerProfile(req, res);
  return value;
});
Router.post('/events', async (req, res) => {
  const value = await getEvents(req, res);
  return value;
});
Router.post('/eventsPost', async (req, res) => {
  const value = await eventPost(req, res);
  return value;
});
Router.post('/messagesend', async (req, res) => {
  const value = await messageSend(req, res);
  return value;
});
Router.post('/messageLoad', async (req, res) => {
  const value = await messageLoad(req, res);
  return value;
});

module.exports = Router;
