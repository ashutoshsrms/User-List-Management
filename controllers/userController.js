const User = require("../models/User");
const List = require("../models/List");
const csvParser = require("../utils/csvParser");
const { handleCSVUpload } = require("../services/csvService");

exports.addUsers = async (req, res) => {
  try {
    const { listId } = req.params;
    const csvFile = req.file;

    const result = await handleCSVUpload(csvFile, listId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
