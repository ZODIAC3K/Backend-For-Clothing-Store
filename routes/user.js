// Write user detail fetching
const express = require('express');
const { auth } = require('../middlewares');
const { CustomErrorHandler, upload } = require('../services');
const { userController } = require('../controllers');
const router = express.Router();

router.use( auth.jwtAuth )
router.use( auth.userCheck )

// GET request
router.get('/', userController.fetchUser)

// PATCH request
router.patch('/', upload.single('image'), userController.updateUser)

// DELETE request
router.delete('/', userController.deleteUser)

// Classify all other requests to this route as bad requests
router.all('/',(req,res, next)=>{next(CustomErrorHandler.badRequest()); return;})

module.exports = router;