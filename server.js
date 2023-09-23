const express = require('express');
const mongoose = require('mongoose');
const {
  APP_PORT,
  DEBUG_MODE,
  DB_URL,
  JWT_SECRET,
  APP_URL,
} = require('./config');
const path = require('path');
const { apiAuth, errorHandler } = require("./middlewares");
const { authRouter } = require('./routes')

const app = express();
// Database Connection
mongoose.set("strictQuery", true); // Telling mongo to follow schemas strictly. for mongo V7+
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Database Connected...');
});
app.use(express.urlencoded({ extended: true })); // leave it true because we are dealing with nested json object not the flat json sometime.
app.use(express.json());
app.use(apiAuth);

// Routes....

app.use('/api/v1/auth', authRouter);






app.use(errorHandler);

// Display Listening Port
app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}`);
});

// Gracefully handle application shutdown
process.on('SIGINT', () => {
  console.log('----------------- Interruption Detected On Server!!! ---------------------------------- Closing Database Connection... -----------------'); // server operations intrupted so close the db connection manually.
  db.close(() => {
    console.log('Database Connection Closed. Exiting...');
    process.exit(0);
  });
});