const authRouter = require('./auth');
const emailVerificationRouter = require('./email');
const userRouter = require('./user')
const productRouter = require('./products')

module.exports = {
    authRouter,
    emailVerificationRouter,
    userRouter,
    productRouter
}