const express = require("express");
const { createTask, deleteTask, getTasks, updateTask } = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", getTasks);
router.post("/", authorize("admin"), createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
