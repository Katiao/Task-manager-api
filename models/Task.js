const mongoose = require("mongoose");

//set up schema first
//schema defines structure for the document

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name cannot be longer than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

//then set up model: a representation for the collection
//in mongoose, a model is a wrapper for a schema
//model provides interfact to database.

module.exports = mongoose.model("Task", TaskSchema);

//after this we need to go to controllers and start using our model
