const List = require("../models/List");

exports.createList = async (req, res) => {
  try {
    const { title, customProperties } = req.body;
    const list = new List({ title, customProperties });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
