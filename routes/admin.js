const express = require('express')
const router = express.Router();
const { adminController } = require("../controllers");
const { CustomErrorHandler, upload } = require('../services');
const { auth } = require('../middlewares');

router.post('/login',adminController.loginAdmin);
router.use( auth.jwtAuth ) 
router.use( auth.adminCheck )



module.exports = router;