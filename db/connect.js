const mongoose = require("mongoose");

//object inside connect function to remove warnings in console
//not needed if using v6 of mongoose
//this returns a promise
const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
