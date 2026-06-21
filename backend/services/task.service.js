const Task = require("../models/task.model");

const getAllTasks = async () => {
  return await Task.find().sort({ createdAt: -1 });
};

const getTaskById = async (id) => {
  return await Task.findById(id);
};

const createTask = async (data) => {
  return await Task.create(data);
};

const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

const updateTaskStatus = async (id, completed) => {
  return await Task.findByIdAndUpdate(
    id,
    { completed },
    { new: true }
  );
};

const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

const searchTasks = async (keyword) => {
  return await Task.find({
    title: { $regex: keyword, $options: "i" }
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  searchTasks
};