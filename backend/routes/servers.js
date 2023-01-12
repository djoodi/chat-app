const Server = require('../schemas/server');
const Room = require('../schemas/room');
const User = require('../schemas/user');
const express = require('express');
const router = express.Router();
const {isLoggedIn, isAuthor, isMember} = require('../middleware');

router.get('/index', isLoggedIn, async(req, res)=> {
    const {_id} = req.user;
    const user = await User.findById(_id).populate('servers');
    //console.log(user.servers);
    res.send(user.servers);
});

router.post('/create', isLoggedIn, async (req, res)=>{
    const {title, id} = req.body;
    const user = await User.findById(id);
    const room = new Room({title:"#general"});
    await room.save();
    const server = new Server({
        title,
        author: user._id,
        members: [user._id],
        rooms: [room._id]
    });
    user.servers.push(server._id);
    await user.save();
    await server.save();
    res.send({server, room});
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
    // channels + messages are deleted thru mongoose middleware
    await Server.findByIdAndDelete(id);
    res.send('Server Deleted');
});

router.post('/sendInvite', isLoggedIn, isMember, async(req, res) => {
    const {serverID, friendID} = req.body;
    // Verify that the friend is actually a friend
    const friend = User.findById(friendID);
    if (!friend.friends.includes(req.user._id)) {
        throw ('User being invited to server is not a friend of invite sender');
    }
    const server = Server.findById(serverID);
    const invite = {sender: req.user._id, invitee: friendID};
    server.invitees.push(invite);
    //server.save();

    req.io.emit('serverInvite', `${friend.username} is being invited to server ${server.title}`);
    
})

module.exports = router;