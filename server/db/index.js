const mongoose = require('mongoose');
const config = require('../config');
const { mongodbUrl } = config;

const connect = async () => {
  try {
    mongoose.set('strictQuery', false);
    const response = await mongoose.connect(mongodbUrl);
    console.log('MongoDB Connected...');

    return response;
  } catch (err) {
    console.error('error: ', err?.message || err);
    return error;
  }
};

module.exports = connect;
