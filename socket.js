const socketio = require('socket.io');
const io = socketio();
let eventEmitter = require("./config/event");
const Message = require("./models/message")
const User = require("./models/user");
const Room = require("./models/Room");

const socketApi = { io };

io.on("connection", (socket) => {
    console.log("Connected")

    socket.on("userJoin", async (data) => {
        //Messages in room

        let _room = await Room.findOne({ name: data.room })
        let user = await User.findOne({ username: data.username });


        socket.join(_room._id)
        socket.joinedRoom = _room;
        console.log(_room._id+" roomId");
        console.log(socket.joinedRoom._id+" socket roonİd")


        if (user) {
            _room.users.push(user._id);
            io.to(socket.joinedRoom._id).emit("welcomeMessage", { msg: `Kanalımıza hoşgeldiniz ${_room.name}`, room: _room, user:user});


        } else {
            let userr = new User({
                username: username,
            })

            await userr.save();

            _room.users.push(userr._id);
            io.to(socket.joinedRoom._id).emit("welcomeMessage", { msg: `Kanalımıza hoşgeldiniz ${_room.name}`, room: _room, user:userr});

        }

    
        //Room Users
        Room.findOne({ name: data.room }).populate({ path: "users", model: "User" }).then(room => {

            io.to(socket.joinedRoom._id).emit("users", room.users);
        })

        Message.find({ roomId: socket.joinedRoom._id }).then(messages => {

            io.to(socket.joinedRoom._id).emit("oldMessages", messages)
        })



    })


    socket.on("chatMessage", async (data) => {

        try {

            let user = await User.findOne({ _id: data.user._id });
            let message = new Message({
                msg: data.message,
                userId: data.user._id,
                roomId: data.room._id,

            })
            await message.save();

            await user.messages.push(message._id)

            await user.save();

            io.to(socket.joinedRoom._id).emit("newMessage", message);


        } catch (error) {
            return error;
        }
    });

    socket.on("message", async () => {

        let messages = await Message.find({ roomId: socket.joinedRoom._id });
 
        io.to(socket.joinedRoom._id).emit("allMessage", messages)
    })


    socket.on("disconnect", async (data) => {
        console.log("User LEFT")
        let room = await Room.findOne({ _id: socket.joinedRoom._id });
        await room.save();

    })







})




module.exports = socketApi;