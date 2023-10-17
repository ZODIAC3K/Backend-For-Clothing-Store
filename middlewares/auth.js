const { API_KEY } = require("../config");
const CryptoJS = require("crypto-js");
const { UserDetail, Admin } = require("../models");
const { JwtService, CustomErrorHandler } = require("../services");

// Add cryto part for the api key auth

const apiKeyAuth = (req, res, next) => {
	if (!req.headers["x-api-key"]) throw CustomErrorHandler.unAuthorized();

	const message = CryptoJS.AES.decrypt(
		req.headers["x-api-key"],
		API_KEY
	).toString(CryptoJS.enc.Utf8);
	if (!message === API_KEY) throw CustomErrorHandler.unAuthorized();

	next();
};

// User JWT verification

async function jwtVerification(req, res, next) {
	if (!req.headers["authorization"]) {
		next(CustomErrorHandler.unAuthorized());
		return;
	}
	try {
		const token = JwtService.verify(req.headers["authorization"]);

		if (await UserDetail.findById({ id: token.id })) {
			req.__auth = {
				role: "user",
			};
		} else if (await Admin.findById({ id: token.id })) {
			req.__auth = {
				role: "admin",
			};
		} else {
			next(
				CustomErrorHandler.unAuthorized("Invalid authentication token")
			);
			return;
		}
	} catch (err) {
		if (err.name === "TokenExpiredError") {
			next(
				CustomErrorHandler.unAuthorized(err.name + ": " + err.message)
			);
			return;
		} else if (
			err.name === "JsonWebToken" &&
			err.message === "invalid token"
		) {
			next(
				CustomErrorHandler.unAuthorized(err.name + ": " + err.message)
			);
			return;
		} else {
			next(CustomErrorHandler.serverError(err.name + ": " + err.message));
			return;
		}
	}

	next();
}

// Check user email verification status

async function emailStatusVerification(req, res, next) {
	const user = JwtService.verify(req.headers["authorization"]);

	await UserDetail.findOne({
		_id: user.id,
	}).then((user) => {
		if (!user.email_verification) {
			return res.status(300).message({
				message: "Email ID not verified",
				button_link: `/send-email-verification/${user._id}`,
			}); // in front end call button link and it will send confirmation link on email.
		} else {
			next();
		}
	});
}

const authMiddleware = {
	apiKey: apiKeyAuth,
	jwtAuth: jwtVerification,
	emailStatus: emailStatusVerification,
};

module.exports = authMiddleware;
