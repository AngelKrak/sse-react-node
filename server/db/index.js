const mongoose = require('mongoose');
const config = require('../config');
const { mongodbUrl } = config;
const connect = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('error: ', err.message);
    // make the process fail
    process.exit(1);
  }
};
module.exports = connect;
