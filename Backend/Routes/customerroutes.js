/* eslint-disable no-unused-vars */
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
const upload = multer({ storage: multerStorage }).single('profileImage');
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
  profilePictureUpdate,
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
Router.post('/profilePicture', upload, async (req, res) => {
  const value = await profilePictureUpdate(req,res);
  return value;
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
