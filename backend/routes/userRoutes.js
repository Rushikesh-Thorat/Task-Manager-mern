const express = require("express");
const { adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, getUserById);
router.delete("/:id", protect, adminOnly, deleteUsers);

module.exports = router;