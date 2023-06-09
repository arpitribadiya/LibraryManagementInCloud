const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });


const adminusers  = [
    {
      "username" : "arpit@gmail.com",
      "password" : "arpit1234",
      "id" : "5abf6783"
    },
    {
      "username" : "kirtan@xyz.ca",
      "password": "XYZ",
      "id" : "5abf674563"
  }
  ]
  
exports.get_admin_list = async (request, response) => {
  try {
    return response.status(200).json({
      message: "Admin Retrived",
      admins: adminusers,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.post_admin_login = async (request, response) => {
  try {
    const userIndex = adminusers.findIndex(currUser => currUser.username.toString() === request.body.username.toString() &&  currUser.password.toString() === request.body.password.toString());

    if (userIndex !== -1) {
        return response.json({
            message: "login success!!!",
            success: true,
        })
      } else {
        return response.status(404).send(`User not found.`);
      }
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};
