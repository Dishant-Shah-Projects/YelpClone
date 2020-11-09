/* eslint-disable no-shadow */
/* eslint-disable no-new-require */
/* eslint-disable new-cap */
/* eslint-disable no-console */
/* eslint-disable camelcase */
const connection = new require('./kafka/Connection');
// topics files
// var signin = require('./services/signin.js');
const mongoose = require('mongoose');
const customerroutes = require('./Functionality/customerHandling');
const generalroutes = require('./Functionality/generalHandling');
const restaurantroutes = require('./Functionality/restaurantHandling');
const { mongoDB } = require('./config');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 30,
  bufferMaxEntries: 0,
  useFindAndModify: false,
};
// single connection
// eslint-disable-next-line no-unused-vars
const options2 = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 1,
  bufferMaxEntries: 0,
  useFindAndModify: false,
};

// eslint-disable-next-line no-unused-vars
mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log('MongoDB connection Failed', err);
  } else {
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected');
  }
});

function handleTopicRequest(topic_name, fname) {
  // var topic_name = 'root_topic';
  const consumer = connection.getConsumer(topic_name);
  const producer = connection.getProducer();
  console.log('server is running ');
  consumer.on('message', (message) => {
    console.log(`message received for ${topic_name} `, fname);
    console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);

    fname.handle_request(data.data, (err, res) => {
      console.log(`after handle${res}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, (err, out) => {
        console.log(out);
      });
    });
  });
}
// Add your TOPICs here
// first argument is topic name
// second argument is a function that will handle this topic request
handleTopicRequest('restaurant444', restaurantroutes);
handleTopicRequest('general444', generalroutes);
handleTopicRequest('customer444', customerroutes);
