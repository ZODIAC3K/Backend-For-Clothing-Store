const authRouter = require('./auth');
const emailVerificationRouter = require('./email');
const userRouter = require('./user')

module.exports = {
    authRouter,
    emailVerificationRouter,
    userRouter
}