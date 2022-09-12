const Channel = require('../schemas/channel');
const Server = require('../schemas/server');
const {isLoggedIn, isAuthor} = require('../middleware');
const express = require('express');
const router = express.Router();

router.get('/index/:id', isLoggedIn, async(req, res) => {
    const serverID = req.params.id;
    const server = await Server.findById(serverID).populate('channels');
    res.send(server.channels);
});

router.post('/create', isLoggedIn, isAuthor, async (req, res) => {
    const {id, channelTitle} = req.body;
    const server = await Server.findById(id);
    const channel = new Channel({
        title: `#${channelTitle}`,
    });
    server.channels.push(channel._id);
    await channel.save();
    await server.save();
    res.send(channel);
});

router.put('/edit', isLoggedIn, isAuthor, async (req, res) => {
    const {id, edits, deletes} = req.body;
    deletes.forEach(async(delAction) => {
        console.log(delAction);
        await Server.findByIdAndUpdate(id, {$pull: {channels: delAction.payload.id}});
        await Channel.findByIdAndDelete(delAction.payload.id);
    });
    edits.forEach(async (editAction) => {
        console.log(editAction);
        await Channel.findByIdAndUpdate(editAction.payload.id, {title: editAction.payload.title});
    });

    res.send('Channels edited');
})

module.exports = router;