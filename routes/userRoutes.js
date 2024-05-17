const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/lists/:listId/users",
  upload.single("file"),
  userController.addUsers
);

module.exports = router;
