const express = require("express");
const test_router = express.Router();

const test_controller = require('../controller/TestController');


test_router.get('/', test_controller.get_Test_list);

module.exports = test_router;