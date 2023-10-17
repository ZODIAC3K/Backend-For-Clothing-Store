const express = require('express')
const router = express.Router();
const { adminController, brandController, couponController, categoryController } = require("../controllers");
const { CustomErrorHandler, upload } = require('../services');
const { auth } = require('../middlewares');
const { route } = require('./admin');

router.post('/login',adminController.loginAdmin);
router.use( auth.jwtAuth ) 
router.use( auth.adminCheck )


// brand create, update, delete
router.get('/brand', brandController.getBrand);
router.post('/brand', upload.single('image'), brandController.createBrand);
router.patch('/brand/:id', upload.single('image'), brandController.updateBrand);
router.delete('/brand/:id', brandController.deleteBrand);

// coupon create, update, delete
router.get('/coupon', couponController.getCoupon);
router.post('/coupon', couponController.createCoupon);
router.patch('/coupon/:id', couponController.updateCoupon);
router.delete('/coupon/:id', couponController.deleteCoupon);


// catagory create, update, delete
router.get('/category', categoryController.getCategory);
router.post('/category', categoryController.createCategory);
router.patch('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

// // product create, update,delete // ------------------->>>>>>>> WORKING ON IT
// router.post('/product', upload.single('productImage'), productController.createProduct);
// router.patch('/product/:id', upload.single('productImage'), productController.updateProduct);
// router.delete('/product/:id', productController.deleteProduct);




module.exports = router;