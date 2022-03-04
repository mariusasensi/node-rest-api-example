const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
      await mongoose.connect(process.env.MONGODB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      console.log('MongoDB connected!');
  } catch (error) {
    console.error(error);
    throw new Error('MongoDB is down.');
  }
}

module.exports = { dbConnection }