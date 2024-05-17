const User = require("../models/User");
const transporter = require("../config/email");
const emailService = require("../services/emailService");

exports.sendEmailToList = async (req, res) => {
  try {
    const { listId, emailBody } = req.body;
    const result = await emailService.sendEmails(listId, emailBody);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
