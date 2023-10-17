const authRouter = require('./auth');
const emailVerificationRouter = require('./email');
const userRouter = require('./user')
const adminRouter = require('./admin')

module.exports = {
    authRouter,
    emailVerificationRouter,
    userRouter,
    adminRouter
}