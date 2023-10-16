const authController = require('./authController');
const imageController = require('./imageController')
const sendEmail = require('./emailVarification')

module.exports = {
    authController,
    imageController,
    sendEmail
}