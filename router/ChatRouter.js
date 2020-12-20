const express = require("express");

const router = express.Router();

const User = require("../models/user");
const Room = require("../models/Room");
const Message = require("../models/message");

router.post("/login", async (req, res, next) => {
    try {

        const { username, room } = req.body;
        //Messages in room
        let _room = await Room.findOne({ name: room })


        const userControl = await User.findOne({ username: username });

        if (userControl) {
            _room.users.push(userControl._id);

            return res.json({ user: userControl, })
        }
        let user = new User({
            username: username,
        })

        await user.save();

        _room.users.push(user._id);

        return res.json({ user });

    } catch (error) {
        return error;
    }
})


module.exports = router;