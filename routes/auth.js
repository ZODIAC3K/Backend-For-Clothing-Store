const express = require('express')
const router = express.Router();
const authController = require("../controllers/authController");
const CustomErrorHandler = require('../services/CustomErrorHandler');

// ================= Register ======================

router.post('/reg',authController.register);
router.all('/reg',()=>{ throw CustomErrorHandler.badRequest(); });

// ================= Login =========================

router.post('/login',authController.login);
router.all('/login',()=>{ throw CustomErrorHandler.badRequest(); });

module.exports = router;