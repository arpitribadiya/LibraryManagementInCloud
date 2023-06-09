const express = require("express");
const student_router = express.Router();

const student_controller = require('../controller/StudentController');


student_router.get('/', student_controller.get_student_list);
student_router.post('/loginStudent', student_controller.post_student_login);
student_router.post('/registerStudent', student_controller.post_student_register);

module.exports = student_router;