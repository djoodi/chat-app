const Server = require('../schemas/server');
const User = require('../schemas/user');
const express = require('express');
const router = express.Router();
const {isLoggedIn, isAuthor} = require('../middleware');

router.get('/app', isLoggedIn, (req, res) => {
    
});

router.get('/index', isLoggedIn, async(req, res)=> {
    const {_id} = req.user;
    const user = await User.findById(_id).populate('servers');
    console.log(user.servers);
    res.send(user.servers);
});

router.post('/create', isLoggedIn, async (req, res)=>{
    const {title, id} = req.body;
    const user = await User.findById(id);
    const server = new Server({
        title,
        author: user._id,
        members: [user._id]
    });
    user.servers.push(server._id);
    await user.save();
    await server.save();
    res.send(req.user);
});

module.exports = router;