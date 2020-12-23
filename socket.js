const socketio = require('socket.io');
const io = socketio();
let eventEmitter = require("./config/event");
const Message = require("./models/message")
const User = require("./models/user");
const Room = require("./models/Room");
const formatMessage = require('./config/formatMessage');

const socketApi = { io };

io.on("connection", (socket) => {
    console.log("Connected")


    socket.on("userJoin", async (data) => {
        //Messages in room

        let _room = await Room.findOne({ name: data.room })
        let user = await User.findOne({ username: data.username });



        socket.join(_room.name)
        socket.joinedRoom = _room;
        if (user) {

            if (user.isOnline) {
                console.log("Burada")
                return socket.emit("sameUser", "Lütfen Farklı Bir Nickname Bulunuz !")
            }
            console.log("Buraya Geçmezz")
            user.isOnline = true;
            await user.save();

            let index = _room.users.findIndex(u => u._id == user._id);
            if (index < 0) {
                _room.users.push(user);
            }
            socket.userId = user._id; //Sockette tutalım leave olurken
            await _room.save();


            //new User
            io.to(socket.joinedRoom.name).emit("welcomeMessage", { msg: `Kanalımıza hoşgeldiniz ${_room.name}`, room: _room, user: user });

            io.to(socket.joinedRoom.name).emit("users", _room.users)

        } else {
            let userr = new User({
                username: data.username,
            })
            userr.isOnline = true
            await userr.save();


            socket.userId = userr._id; //Sockette tutalım leave olurken
            let index = _room.users.findIndex(u => u._id == userr._id);
            if (index < 0) {
                _room.users.push(userr);
            }
            socke


            await _room.save();

            //new User

            io.to(socket.joinedRoom.name).emit("welcomeMessage", { msg: `Kanalımıza hoşgeldiniz ${_room.name}`, room: _room, user: userr });

            io.to(socket.joinedRoom.name).emit("users", userr)


        }

        let message = await Message.find({ roomId: socket.joinedRoom._id }).populate({ path: "userId", model: "User" });
        io.to(socket.joinedRoom.name).emit("oldMessages", message)


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

            io.to(socket.joinedRoom.name).emit("newMessage", await formatMessage(message));

        } catch (error) {
            return error;
        }
    });

    socket.on("leave", async (data) => {
        console.log("Leave Room")

        let user = await User.findOne({ _id: socket.userId });
        let room = await Room.findOne({ _id: socket.joinedRoom._id });

        let index = room.users.findIndex(u => { u._id.toString() == user._id.toString() });

        room.users.splice(index, 1);

        io.to(socket.joinedRoom.name).emit("users", room.users)
        user.isOnline = false;
        await user.save();
        await room.save();

    })

    socket.on("disconnect", async (data) => {
        console.log("Disconnect Room")

        let user = await User.findOne({ _id: socket.userId });
        let room = await Room.findOne({ _id: socket.joinedRoom._id });

        let index = room.users.findIndex(u => { u._id.toString() == user._id.toString() });

        room.users.splice(index, 1);

        io.to(socket.joinedRoom.name).emit("users", room.users)

        user.isOnline = false;
        await user.save();
        await room.save();

    })







})




module.exports = socketApi;