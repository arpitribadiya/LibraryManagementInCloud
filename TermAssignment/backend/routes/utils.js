const express = require("express");
const utils_router = express.Router();

const utils_controller = require('../controller/UtilsController');


utils_router.get('/', utils_controller.get_aws_secret);
utils_router.post('/uploadImage', utils_controller.post_upload_img_to_s3);

module.exports = utils_router;