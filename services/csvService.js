const csvParser = require("../utils/csvParser");
const User = require("../models/User");
const List = require("../models/List");

exports.handleCSVUpload = async (csvFile, listId) => {
  const list = await List.findById(listId);
  if (!list) throw new Error("List not found");

  const csvData = await csvParser.parseCSV(csvFile);
  const errors = [];
  let successCount = 0;

  for (let row of csvData) {
    const { name, email, ...properties } = row;
    const userProps = {};

    for (let prop of list.customProperties) {
      userProps[prop.title] = properties[prop.title] || prop.fallbackValue;
    }

    try {
      await User.create({
        name,
        email,
        listId,
        properties: userProps,
      });
      successCount++;
    } catch (error) {
      errors.push({ row, error: error.message });
    }
  }

  const totalUsers = await User.countDocuments({ listId });

  return {
    successCount,
    errorCount: errors.length,
    totalUsers,
    errors,
  };
};
