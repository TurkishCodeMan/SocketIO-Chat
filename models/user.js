const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        reqired: true
    },

    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message", required: false
        }
    ]

});

const User = mongoose.model("User", userSchema);

module.exports = User;