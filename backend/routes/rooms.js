const Room = require('../schemas/room');
const Server = require('../schemas/server');
const {isLoggedIn, isAuthor} = require('../middleware');
const express = require('express');
const router = express.Router();

router.get('/index/:id', isLoggedIn, async(req, res) => {
    const serverID = req.params.id;
    const server = await Server.findById(serverID).populate('rooms');
    res.send(server.rooms);
});

router.post('/create', isLoggedIn, isAuthor, async (req, res) => {
    const {id, channelTitle} = req.body;
    const server = await Server.findById(id);
    const room = new Room({
        title: `#${channelTitle}`,
    });
    server.rooms.push(room._id);
    await room.save();
    await server.save();
    res.send(room);
});

router.put('/edit', isLoggedIn, isAuthor, async (req, res) => {
    const {id, edits, deletes} = req.body;
    deletes.forEach(async(delAction) => {
        console.log(delAction);
        await Server.findByIdAndUpdate(id, {$pull: {rooms: delAction.payload.id}});
        await Room.findByIdAndDelete(delAction.payload.id);
    });
    edits.forEach(async (editAction) => {
        console.log(editAction);
        await Room.findByIdAndUpdate(editAction.payload.id, {title: editAction.payload.title});
    });

    res.send('Rooms edited');
})

module.exports = router;