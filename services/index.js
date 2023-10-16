const JwtService = require('./JwtService');
const upload = require('./fileUpload');
const CustomErrorHandler = require('./CustomErrorHandler');
const dbConnect = require('./dbConnection');
const sendEmail = require('./emailVerification');
const populateAllAttributes = require('./populateDocs')

module.exports = {
    JwtService,
    upload,
    CustomErrorHandler,
    dbConnect,
    sendEmail,
    populateAllAttributes
}