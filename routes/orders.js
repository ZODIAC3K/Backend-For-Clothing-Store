const express = require('express');
const { auth } = require('../middlewares');
const { CustomErrorHandler, upload } = require('../services');
const { orderController } = require('../controllers');
const router = express.Router();

router.use( auth.jwtAuth )
router.use( auth.userCheck)

// Create Order
router.post('/', orderController.createOrder)

// Classify all other requests to this route as bad requests
router.all('/',(req,res, next)=>{next(CustomErrorHandler.badRequest()); return;})

module.exports = router;