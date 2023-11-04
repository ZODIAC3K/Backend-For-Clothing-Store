const express = require('express');
const router = express.Router();

// GET banners ( based on type -> optional)
router.get('/:type');

// GET banner by Id
router.get('/:id');