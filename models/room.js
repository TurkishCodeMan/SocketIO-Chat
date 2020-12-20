const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: String,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", required: false
        }
    ]

});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;