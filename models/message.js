const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    msg: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '60m' },
    },
})


const Message = mongoose.model("Message", messageSchema);
module.exports = Message;