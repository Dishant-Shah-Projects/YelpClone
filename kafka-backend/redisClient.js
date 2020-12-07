/* eslint-disable */
const redis = require("redis");
const { redisPort, redisHost } = require("./redis-config");
//const redisClient = redis.createClient({ port: redisPort, host: redisHost });
//redisClient.on('connect', (err) => {
//  if (err) {
//    console.log('Error while connecting to Redis server');
//  } else {
//    console.log('Redis Server Connected');
//  }
//});

const redisClient = require("redis-connection-pool")("myRedisPool", {
  host: "54.193.50.216", // default
  port: 6379, //default
  max_clients: 200, // default
  perform_checks: false, // checks for needed push/pop functionality
});

module.exports = redisClient;
