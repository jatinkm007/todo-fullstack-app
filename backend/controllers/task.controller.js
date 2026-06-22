const taskService = require("../services/task.service");

async function getTasks(req, res, next) {
  try {
    const search = req.query.search || "";
    const tasks = await taskService.findTasks(search);

    res.status(200).json({
      success: true,
      total: tasks.length,
      tasks: tasks
    });
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const title = req.body.title;
    const description = req.body.description;

    if (!title || title.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please enter a task title with at least 2 characters"
      });
    }

    const newTask = await taskService.addTask({
      title: title.trim(),
      description: description
    });

    res.status(201).json({
      success: true,
      message: "Task added",
      task: newTask
    });
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const id = req.params.id;

    if (!req.body.title || req.body.title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title cannot be empty"
      });
    }

    const task = await taskService.editTask(id, {
      title: req.body.title.trim(),
      description: req.body.description || ""
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      message: "Task updated",
      task: task
    });
  } catch (err) {
    next(err);
  }
}

async function updateTaskStatus(req, res, next) {
  try {
    const id = req.params.id;
    const completed = req.body.completed;

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "completed value must be true or false"
      });
    }

    const task = await taskService.changeStatus(id, completed);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      message: "Status changed",
      task: task
    });
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const deletedTask = await taskService.removeTask(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      message: "Task deleted"
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
};