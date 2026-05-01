const express = require("express");
const { addMember, createProject, getProjects, removeMember } = require("../controllers/projectController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", getProjects);
router.post("/", authorize("admin"), createProject);
router.post("/:id/add-member", authorize("admin"), addMember);
router.patch("/:id/members/remove", authorize("admin"), removeMember);

module.exports = router;
