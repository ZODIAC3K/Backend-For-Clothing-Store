const { SALT, API_KEY, APP_URL, APP_PORT } = require("../config");
const { User } = require("../models");
const { JwtService, CustomErrorHandler } = require("../services");
const CryptoJS = require("crypto-js");
// const sendEmail = require("../controllers/emailVarification");
const { emailVarification: sendEmail } = require("../controllers");
const Token = require("../models/verification_tokens");

// Register user ( only email and password )
async function registerUser(req, res, next) {
	try {
		const { email, password, fname, lname, mobile } = req.body;

		const userRec = await User.findOne({
			email: email,
		}).catch((error) => {
			next(error);
			return;
		});

		if (userRec) {
			next(
				CustomErrorHandler.alreadyExist(
					"Already Exists: User already exists!"
				)
			);
			return;
		}

		const userData = {
			email: email,
			password: CryptoJS.AES.encrypt(password, SALT),
			fname: fname,
			lname: lname,
			mobile: mobile,
		};

		const user = new User(userData);
		user.save()
			.then((user) => {
				const encryptedUserId = JwtService.sign({
					id: user._id,
				});

				const verificationToken = new Token({
					userId: user._id,
					token: JwtService.sign({ userId: user._id }, "1h", API_KEY),
				});
				verificationToken.save().then((token) => {
					const verificationLink = `${APP_URL}:${APP_PORT}/${user._id}/verify/${token.token}`;

					// Send verification email
					const subject = "Email Verification";
					const text = `Click the following link to verify your email: ${verificationLink}`;
					sendEmail(email, subject, text);
				});

				res.cookie("auth-token", encryptedUserId, {
					httpOnly: true,
					maxAge: 7200000,
				});

				const userDetails = {
					email: user.email,
					fname: user.fname,
					lname: user.lname,
					mobile: user.mobile,
					created_at: user.created_at,
					savedAddress: user.savedAddress,
					email_verification: user.email_verification,
					coupon_used: user.coupon_used,
				};

				return res.status(200).json({
					message: "Successfully Registered!",
					redirectTo: "/",
					userDetails,
				});
			})
			.catch((err) => {
				next(err);
				return;
			});
	} catch (err) {
		next(err);
	}
}

// Log user in based on credentials ( email, password )
async function loginUser(req, res, next) {
	try {
		const { email, password } = req.body;

		User.findOne({
			email: email,
		}).then((user) => {
			if (!user) {
				next(CustomErrorHandler.notFound());
				return;
			}

			const encryptedPass = CryptoJS.AES.encrypt(
				password,
				SALT
			).toString();

			if (!user.password === encryptedPass) {
				next(CustomErrorHandler.wrongCredentials());
				return;
			}

			const encryptedUserId = JwtService.sign({ id: user._id });
			res.cookie("auth-token", encryptedUserId, {
				httpOnly: true,
				maxAge: 7200000,
			});

			const userDetails = {
				email: user.email,
				fname: user.fname,
				lname: user.lname,
				mobile: user.mobile,
				created_at: user.created_at,
				savedAddress: user.savedAddress,
				email_verification: user.email_verification,
				coupon_used: user.coupon_used,
			};

			return res
				.status(200)
				.json({
					message: "Logged in sucessfully!",
					redirectTo: "/",
					userDetails,
				});
		});
	} catch (err) {
		next(err);
	}
}

const authController = {
	register: registerUser,
	login: loginUser,
};

module.exports = authController;
