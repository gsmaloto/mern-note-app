const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Db connected!");
  } catch (err) {
    console.log("DB ERROR: ", err.message);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = connectToDb;
