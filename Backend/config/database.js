const mongoose = require("mongoose")
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    )
        .then(() => { console.log("Database is connected") })
        .catch(() => {
            console.log("Database connection error", error);
            process.exit(1);
        })
}