const JwtService = require('./JwtService');
const upload = require('./fileUpload');
const CustomErrorHandler = require('./CustomErrorHandler');
const sendEmail = require('./emailVerification');
const populateAllAttributes = require('./populateDocs');
const DatabaseConnection = require('./dbConnection');


module.exports = {
    JwtService,
    upload,
    CustomErrorHandler,
    DatabaseConnection,
    sendEmail,
    populateAllAttributes
}