const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });


const studentusers  = [
    {
      "username" : "Student1@abc.ca",
      "password" : "Student1",
      "id" : "1"
    },
    {
      "username" : "Student2@xyz.ca",
      "password": "Student2",
      "id" : "2"
    }
  ]
  
exports.get_student_list = async (request, response) => {
  try {
    return response.status(200).json({
      message: "Students Retrived",
      admins: studentusers,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.post_student_login = async (request, response) => {
  try {
    const userIndex = studentusers.findIndex(currUser => currUser.username.toString() === request.body.username.toString() &&  currUser.password.toString() === request.body.password.toString());

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


exports.post_student_register = async (request, response) => {
    try {
        const newUser = request.body;
        const newUserPosition = studentusers.length + 1;
        newUser.id = newUserPosition;
        studentusers.push(newUser);
        return response.json({
            message: "Student added",
            success: true,
        })
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: "Internal Server Error",
      });
    }
  };