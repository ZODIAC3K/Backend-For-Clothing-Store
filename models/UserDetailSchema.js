const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true, // Ensures uniqueness
		lowercase: true, // Converts email to lowercase
		validate: {
			validator: function (value) {
				// Define a regular expression pattern for a valid email address
				const pattern =
					/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

				// Test the value against the pattern
				return pattern.test(value);
			},
			message: "Invalid email address format",
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: function (value) {
				// Define a regular expression pattern for a strong password
				const pattern =
					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!(){}[\]:;"'<>,.?/~\\-_]).{8,}$/;
				// Test the value against the pattern
				return pattern.test(value);
			},
			message:
				"Password must contain at least 8 characters, including one lowercase letter, one uppercase letter, one number, and one special character",
		},
	}, // Store hashed password
	status: { type: Boolean, default: true },
	fname: { type: String, required: true },
	lname: { type: String, required: true },
	mobile: {
		type: String,
		required: true,
		validate: {
			validator: function (value) {
				// Define a regular expression pattern for a valid mobile number
				const pattern = /^\d{10}$/; // For a 10-digit number (adjust as needed)

				// Test the value against the pattern
				return pattern.test(value);
			},
			message: "Invalid mobile number format",
		},
	},
	email_verification: { type: Boolean, default: false },
	profile_picture: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "ImageDetail",
	},
	created_at: { type: Date, default: Date.now() },
	modified_at: { type: Date, default: Date.now() },
	coupon_used: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coupon" }],
	savedAddress: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }]
});

const UserDetail = mongoose.model("UserDetail", UserDetailSchema);

module.exports = UserDetail;
