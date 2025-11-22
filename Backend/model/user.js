const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            maxLength: 30,
        },
        firstName: {
            type: String,
            required: true,
            maxLength: 30,
        },
        lastName: {
            type: String,
            required: true,
            maxLength: 30,
        },
        password: {
            type: String,
            required: true,
            minLength: 3,
        },
    }
);

module.exports = mongoose.model("User", userSchema);