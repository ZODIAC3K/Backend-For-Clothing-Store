const authRouter = require('./auth');
const emailVerificationRouter = require('./email');
const userRouter = require('./user')
const productRouter = require('./products')
const adminRouter = require('./admin')
const orderRouter = require('./orders')

module.exports = {
    authRouter,
    emailVerificationRouter,
    userRouter,
    productRouter,
    adminRouter,
    orderRouter,
}