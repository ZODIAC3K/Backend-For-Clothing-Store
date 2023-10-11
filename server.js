const express = require("express");
const mongoose = require("mongoose");
const { CustomErrorHandler } = require("./services");
const { User } = require("./models");
const {
	APP_PORT,
	DB_URL,
	F_APP_URL,
} = require("./config");
const Token = require("./models/verification_tokens");
const path = require("path");
// This auth contains middlewares that check if the user that is requested has valid credentials or not
const { auth, errorHandler } = require("./middlewares");
const { authRouter } = require("./routes");
const app = express();
const cors = require("cors");

app.use(cors()); // allows api call from all origin. {remove it in deployment}
// {uncomment below 3 lines in deployment}
// app.use(cors({
//   origin: "localhost:3000" // change it to required URL on deployment.
// }));

// Database Connection
mongoose.set("strictQuery", true); // Telling mongo to follow schemas strictly. for mongo V7+
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
	console.log("Database Connected...");
});
app.use(express.urlencoded({ extended: true })); // leave it true because we are dealing with nested json object not the flat json sometime.
app.use(express.json());


// ================= Email Verification =========================
app.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link -- user issue" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link -- token issue" });
		await User.updateOne({ _id: user._id}, {email_verification: true });
		await token.remove();
		res.redirect(302, `${F_APP_URL}`);
	
	} catch (error) {
		res.status(400).send({ message: "Invalid link -- internal server issue" });
	}
});
app.all('/:id/verify/:token/',()=>{ throw CustomErrorHandler.badRequest(); });

// API KEY AUTH CHECK
app.use(auth.apiKey);

// Routes....
app.use('/api/v1/auth', authRouter);
app.post("/api/v1/test",auth.jwtAuth,(req,res)=>{res.send("hi!")});

// Error Handling middleware
app.use(errorHandler);

// Display Listening Port
app.listen(APP_PORT, () => {
	console.log(`Listening on port ${APP_PORT}`);
});

// Gracefully handle application shutdown
process.on("SIGINT", () => {
	console.log(
		"----------------- Interruption Detected On Server!!! ---------------------------------- Closing Database Connection... -----------------"
	); // server operations intrupted so close the db connection manually.
	db.close(() => {
		console.log("Database Connection Closed. Exiting...");
		process.exit(0);
	});
});
