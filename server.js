const express = require("express");
const mongoose = require("mongoose");
const {
	APP_PORT,
	DB_URL,
} = require("./config");

const path = require("path");
// This auth contains middlewares that check if the user that is requested has valid credentials or not
const { auth, errorHandler } = require("./middlewares");
const { authRouter, emailVerificationRouter } = require("./routes");
const app = express();
const cors = require("cors");


// ================= Cors =================
app.use(cors()); // allows api call from all origin. {remove it in deployment}
// {uncomment below 3 lines in deployment}
// app.use(cors({
//   origin: "localhost:3000" // change it to required URL on deployment.
// }));

// ================= Database Connection =================
mongoose.set("strictQuery", true); // Telling mongo to follow schemas strictly. for mongo V7+
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
	console.log("Database Connected...");
});
app.use(express.urlencoded({ extended: true })); // leave it true because we are dealing with nested json object not the flat json sometime.
app.use(express.json());




// ================= Email Verification  =================
app.use(emailVerificationRouter);

// ================ API KEY AUTH CHECK ================
app.use(auth.apiKey);

// ================ Routes ================
app.use('/api/v1/auth', authRouter);
app.post("/api/v1/test",auth.jwtAuth,(req,res)=>{res.send("hi!")});

// ================ Error Handling middleware ================
app.use(errorHandler);

// ================ Display Listening Port ================
app.listen(APP_PORT, () => {
	console.log(`Listening on port ${APP_PORT}`);
});

// ================ Handling Application Shutdown ================
process.on("SIGINT", () => {
	console.log(
		"----------------- Interruption Detected On Server!!! ==> Closing Database Connection... -----------------"
	);
	db.close(() => {
		console.log("Database Connection Closed. Exiting...");
		process.exit(0);
	});
});
