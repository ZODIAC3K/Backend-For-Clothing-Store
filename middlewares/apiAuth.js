const { API_KEY } = require('../config');
const CustomErrorHandler = require('../services/CustomErrorHandler');
const CryptoJS = require('crypto-js');

// Add cryto part for the api key auth

const apiAuth = (req, res, next) => {
    
    if(!req.headers['x-api-key'])
        throw CustomErrorHandler.unAuthorized();

    const message = CryptoJS.AES.decrypt(req.headers['x-api-key'],API_KEY).toString(CryptoJS.enc.Utf8);
    if (!message === API_KEY)
        throw CustomErrorHandler.unAuthorized();

    next()
}


module.exports = apiAuth;