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

module.exports = router;