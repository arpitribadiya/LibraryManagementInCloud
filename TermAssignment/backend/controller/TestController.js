const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
  
exports.get_Test_list = async (request, response) => {
  try {
    return response.status(200).json({
      message: "Test Success",
    });
  } catch (error) {
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};