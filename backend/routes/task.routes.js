const express = require("express");
const router = express.Router();

const {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  updateStatus,
  deleteTask,
  searchTasks
} = require("../controllers/task.controller");

router.get("/", getTasks);
router.get("/search", searchTasks);
router.get("/:id", getSingleTask);
router.post("/", createTask);
router.put("/:id", updateTask);
router.patch("/:id/status", updateStatus);
router.delete("/:id", deleteTask);

module.exports = router;