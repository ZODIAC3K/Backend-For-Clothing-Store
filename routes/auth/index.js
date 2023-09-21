const express = require('express')
const router = express.Router();
const { registerUser } = require("../../controllers/authController");
const CustomErrorHandler = require('../../services/CustomErrorHandler');

// ================= Register ======================

router.post('/reg',registerUser);
router.all('/reg',()=>{ throw CustomErrorHandler.badRequest(); })

module.exports = router;