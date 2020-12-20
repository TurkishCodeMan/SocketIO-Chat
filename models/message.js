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
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }
})


const Message=mongoose.model("Message",messageSchema);
module.exports=Message;