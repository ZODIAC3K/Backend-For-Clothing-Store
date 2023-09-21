const { SALT, API_KEY } = require('../config');
const { User } = require('../models');
const CustomErrorHandler = require('../services/CustomErrorHandler');
const uuid = require('uuid');
const CryptoJS = require('crypto-js');

// Register user ( only email and password )
async function registerUser(req, res, next) {
    const { email, password } = req.body;

    const userRec = await User.findOne({
        email: email
    })

    if(userRec){
        next(CustomErrorHandler.alreadyExist("Already Exists: User already exists!"));
        return;
    }

    const user_id = "UID_" + uuid.v4();

    const userData = {
        user_id: user_id,
        email: email,
        pass: CryptoJS.AES.encrypt(password, SALT)
    }

    const user = new User(userData);
    user.save()
    .then(()=> {
        const encryptedUserId = CryptoJS.AES.encrypt(user_id, API_KEY).toString();
        res.cookie('auth-token', encryptedUserId, { httpOnly: true });

        return res.status(200).json({ message: "Successfully Registered!", redirectTo: "/" });
    });
}

// Log user in based on credentials ( email, password )



// Log user out by deleting cookie on the frontend

module.exports = {
    registerUser
}