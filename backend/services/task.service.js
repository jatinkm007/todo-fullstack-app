const Task = require("../models/task.model");

async function findTasks(searchText) {
  let filter = {};

  if (searchText) {
    filter = {
      $or: [
        { title: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } }
      ]
    };
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  return tasks;
}

async function addTask(taskData) {
  const task = new Task({
    title: taskData.title,
    description: taskData.description || ""
  });

  return await task.save();
}

async function editTask(id, data) {
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      title: data.title,
      description: data.description
    },
    {
      new: true,
      runValidators: true
    }
  );

  return updatedTask;
}

async function changeStatus(id, completedValue) {
  return await Task.findByIdAndUpdate(
    id,
    { completed: completedValue },
    { new: true }
  );
}

async function removeTask(id) {
  return await Task.findByIdAndDelete(id);
}

module.exports = {
  findTasks,
  addTask,
  editTask,
  changeStatus,
  removeTask
};