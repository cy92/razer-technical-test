const mongoose = require("mongoose");
mongoose.Promise = Promise;

const connect = async function () {
  await mongoose.connect(process.env.MONGODB);
};

module.exports = async function initDb() {
  // Mongoose database connection with 5 times of retry
  const maxRetry = 5;
  console.log("Connecting database");
  for (let i = 0; i < maxRetry; i++) {
    try {
      if (i > 0) console.log("Database connection retry :" + (i + 1));
      await connect();
      console.log("Database connected");
      return;
    } catch (error) {
      console.log(error.message || error);
      if (i >= maxRetry - 1) {
        throw error;
      }
    }
  }
};
