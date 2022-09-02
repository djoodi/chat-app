const Server = require('../schemas/server');
const Channel = require('../schemas/channel');
const User = require('../schemas/user');
const express = require('express');
const router = express.Router();
const {isLoggedIn, isAuthor} = require('../middleware');

router.get('/index', isLoggedIn, async(req, res)=> {
    const {_id} = req.user;
    const user = await User.findById(_id).populate('servers');
    console.log(user.servers);
    res.send(user.servers);
});

router.post('/create', isLoggedIn, async (req, res)=>{
    const {title, id} = req.body;
    const user = await User.findById(id);
    const channel = new Channel({title:"#general"});
    await channel.save();
    const server = new Server({
        title,
        author: user._id,
        members: [user._id],
        channels: [channel._id]
    });
    user.servers.push(server._id);
    await user.save();
    await server.save();
    res.send(server);
});

router.put('/edit', isLoggedIn, isAuthor, async(req, res) => {
    const {id, title} = req.body;
    const server = await Server.findByIdAndUpdate(id, {title});
    await server.save();
    res.send('Renamed Server');
})

router.delete('/delete', isLoggedIn, isAuthor, async(req, res)=>{
    const {id} = req.body;
    await User.findByIdAndUpdate(req.user._id, {$pull:{servers: id}})
    const server = await Server.findById(id);
    server.channels.forEach(async (channelID) => {
        await Channel.findByIdAndDelete(channelID);
    })
    await Server.findByIdAndDelete(id);
    res.send('Server Deleted');
});

module.exports = router;