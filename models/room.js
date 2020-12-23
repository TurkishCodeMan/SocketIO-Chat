const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: String,
    users: [
        {
            type: Object,
            ref: "User", required: false,
            expires: 3600
        }
    ]

});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;