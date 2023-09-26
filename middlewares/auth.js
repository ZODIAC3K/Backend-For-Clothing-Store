const { API_KEY } = require('../config');
const CustomErrorHandler = require('../services/CustomErrorHandler');
const CryptoJS = require('crypto-js');
const { default: JwtService } = require('../services/JwtService');
const { User } = require('../models');

// Add cryto part for the api key auth

const apiKeyAuth = (req, res, next) => {
    
    if(!req.headers['x-api-key'])
        throw CustomErrorHandler.unAuthorized();

    const message = CryptoJS.AES.decrypt(req.headers['x-api-key'],API_KEY).toString(CryptoJS.enc.Utf8);
    if (!message === API_KEY)
        throw CustomErrorHandler.unAuthorized();

    next()
}

// User JWT verification

function jwtVerification ( req, res, next ) {

    if (!req.headers['authorization'])
        throw CustomErrorHandler.unAuthorized();
    try{
        JwtService.verify(req.headers['authorization'])
    } catch ( err ) {
        if ( err.name === "TokenExpiredError" ) {
            throw CustomErrorHandler.unAuthorized(err.name+": "+err.message);
        } else if ( err.name === "JsonWebToken" && err.message === "invalid token" ) {
            throw CustomErrorHandler.unAuthorized( err.name+": "+err.message );
        } else {
            throw CustomErrorHandler.serverError(err.name+": "+err.message);
        }
    }
    
    next();
}

// Check user email verification status

async function emailStatusVerification ( req, res, next) {
    
    const user = JwtService.verify(req.headers['authorization'])

    await User.findOne({
        _id: user.id
    }).then(user => {
        if (!user.email_verification){
            return res.status(300).message({ message: "Email ID not verified", redirectTo: "/email-verification"})
        } else {
            next();
        }
    })

}

const authMiddleware = {
    apiKey: apiKeyAuth,
    jwtAuth: jwtVerification,
    emailStatus: emailStatusVerification
}

module.exports = authMiddleware;