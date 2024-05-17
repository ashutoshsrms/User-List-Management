const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

router.post("/emails", emailController.sendEmailToList);

module.exports = router;
