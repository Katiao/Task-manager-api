const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const createCustomError = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  //empty object to get everything from database
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  //according to docs task is null when id doesn't match anything in database
  if (!task) {
    return next(createCustomError(`No task with id ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task with id ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    // this ensures the new value is returned in the res
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id ${taskId}`, 404));
  }

  req.status(200).json({ id: taskId, data: req.body });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
