const mongoose=require("mongoose");

const connectDB=async ()=>{
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true});
    const db=mongoose.connection;
    db.on("error",console.error.bind(console, 'Connection error:'))
    db.once("open",()=>{
        console.log("Connected Database")
    })
}

module.exports=connectDB;