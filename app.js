const express = require("express");
const app = express();
const bodyParser=require("body-parser")
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" })
const cors = require("cors")
const http = require("http").createServer(app)

app.set("eventEmitter", require("./config/event"));
//Routes
const chatRouter=require("./router/ChatRouter")

//Global Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({
    origin: ["http://localhost:8080",
        "https://localhost:8080"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
}));

const socketAPI = require("./socket");
socketAPI.io.attach(http);


app.use("/api",chatRouter);

require("./config/db")();

http.listen(3000, process.env.HOST, (err) => {
    if (!err) {
        console.log("Listening " + process.env.PORT);
    }
})