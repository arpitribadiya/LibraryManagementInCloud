const express = require("express");
const admin_router = express.Router();

const admin_controller = require('../controller/AdminController');


admin_router.get('/', admin_controller.get_admin_list);
admin_router.post('/loginAdmin', admin_controller.post_admin_login);

module.exports = admin_router;