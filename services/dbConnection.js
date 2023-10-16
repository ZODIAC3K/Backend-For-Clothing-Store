const mongoose = require("mongoose");
const { DB_URL } = require("../config");

function dbConnect(){
    mongoose.set("strictQuery", true); // Telling mongo to follow schemas strictly. for mongo V7+
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", () => {
        console.log("Database Connected...");
    });
}



module.exports = dbConnect;