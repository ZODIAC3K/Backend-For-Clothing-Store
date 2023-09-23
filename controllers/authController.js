const { SALT, API_KEY } = require("../config");
const { User } = require("../models");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const uuid = require("uuid");
const CryptoJS = require("crypto-js");
const { default: JwtService } = require("../services/JwtService");

// Register user ( only email and password )
async function registerUser(req, res, next) {
	try {
		const { email, password } = req.body;

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
			pass: CryptoJS.AES.encrypt(password, SALT),
		};

		const user = new User(userData);
		user.save()
			.then((user) => {
				const encryptedUserId = JwtService.sign({
					id: user._id,
				});

				res.cookie("auth-token", encryptedUserId, {
					httpOnly: true,
					maxAge: 7200000,
				});

				return res.status(200).json({
					message: "Successfully Registered!",
					redirectTo: "/",
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

			const encryptedPass = CryptoJS.AES.encrypt(password, SALT).toString();

			if (!user.password === encryptedPass) {
				next(CustomErrorHandler.wrongCredentials());
				return;
			}

			const encryptedUserId = JwtService.sign({ id: user._id });
			res.cookie("auth-token", encryptedUserId, {
				httpOnly: true,
				maxAge: 7200000,
			});

			return res
				.status(200)
				.json({ message: "Logged in sucessfully!", redirectTo: "/" });
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
