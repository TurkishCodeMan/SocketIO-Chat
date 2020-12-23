const Message=require("../models/message")

let formatMessage= async (message)=>{
    let m=await Message.findOne({_id:message._id}).populate("userId")
    return m;
}

module.exports=formatMessage;