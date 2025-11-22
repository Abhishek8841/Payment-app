const mongoose = require("mongoose")
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => { console.log("Database is connected") })
        .catch((error) => {
            console.log("Database connection error", error);
            process.exit(1);
        })
}