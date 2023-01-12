const User = require('../schemas/user');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn} = require('../middleware');
const Server = require('../schemas/server');
const Room = require('../schemas/room');

router.post('/register', (req, res) => {
    const {username, password} = req.body;

    if (!validateUsername(username)) {
        res.send("Username must contain alphanumeric characters only and be between 4-24 characters long. It cannot begin with a number.");
        return;
    }

    if (!validatePassword(password)) {
        res.send("Password must be 8-24 characters long.");
        return;
    }

    User.findOne({
        username
    }, async (err, doc) => {
        if (err) 
            throw err;
        


        if (doc) 
            res.send('User Already Exists');
        


        if (!doc) {
            const newUser = new User({username});
            const registeredUser = await User.register(newUser, password);
            await newUser.save();
            req.logIn(registeredUser, err => {
                if (err) 
                    throw err;
                


                res.send(true);
                console.log('logging in', req.user.username);
            });
        }
    })
    console.log(req.body);
});

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) 
            throw err;
        
        if (!user) 
            res.send('Wrong username or password');
         else {
            req.logIn(user, err => {
                if (err) 
                    throw err;
                
                res.send(true);
                console.log('logging in', req.user.username);
            });
        }
    })(req, res, next);
});

router.get('/logout', isLoggedIn, async (req, res) => {
    // req.user.online = false;
    // req.user.save();

    req.logOut((err) => {
        if (err) 
            throw err;
        

        console.log('Logged out successfully');
        res.send('Logged out successfully');
    })
});

const validateUsername = (input) => {
    const regularExpression = /^[A-Za-z][A-Za-z0-9]{3,23}$/;
    return regularExpression.test(input);
};

const validatePassword = (input) => {
    const regularExpression = /.{8,24}/;
    return regularExpression.test(input);
};

router.get('/app', isLoggedIn, (req, res) => {
    // this route only exists to check if user is logged in
    // this won't send if isLoggedIn fails
    res.send(true);
});

router.get('/user', isLoggedIn, async (req, res) => {
    const user = await User.findById(req.user._id).populate({path: 'friends', populate: {path: '_id', select: '_id username'}}).populate('friendRequests', '_id username');
    //console.log(user);
    console.log('Getting user');
    res.send(user);
});


router.get('/members/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const server = await Server.findById(id).populate('members', '_id username');
});

router.post('/friendRequest', isLoggedIn, async (req, res) => {
    const recipient = await User.findByUsername(req.body.recipient);
    
    // check if we sent friend request to self
    if (recipient.id === req.user.id) {
        console.log('user sent friend request to self!');
        res.send({message: "You can't add yourself as a friend!", isSuccess: false});
        return;
    }

    if (recipient != null) {
        console.log(recipient);
        // check if they're already friends
        if (recipient.friends.find(x => x.id === req.user.id) != undefined)
        {
            console.log('users are already friends');
            res.send({message: "You're already friends!", isSuccess: false});
        }
        // check if friend request already exists
        else if (recipient.friendRequests.includes(req.user.id)) {
            console.log('friend request already exists');
            res.send({message: "Friend request already sent", isSuccess: false});
        }
        else {
            recipient.friendRequests.push(req.user.id);
            console.log('sent friend request');
            await recipient.save();
            res.send({message: "Sent friend request!", isSuccess: true});
        }
    } else {
        console.log('user does not exist');
        res.send({message: "User does not exist", isSuccess: false});
    }

});

router.post('/acceptFriendRequest', isLoggedIn, async (req, res) => {
    console.log('accepted friend request from', req.body.id);
    const friend = await User.findById(req.body.id);

    // create a room
    const room = new Room();
    await room.save();

    // update both users friend lists
    req.user.friends.push({_id: friend._id, roomID: room._id});
    friend.friends.push({_id: req.user._id, roomID: room._id});

    // remove friend request
    req.user.friendRequests = req.user.friendRequests.filter(x => {
        return x._id.toString() !== friend._id.toString();
    });

    await req.user.save();
    await friend.save();

    console.log(req.user);
    res.send({id: friend._id, username: friend.username});
    // add friend
    // res.send
})

router.post('/declineFriendRequest', isLoggedIn, async (req, res) => {
    console.log('declined friend request from', req.body.id);
    const friend = await User.findById(req.body.id);
    // remove friend request
    req.user.friendRequests = req.user.friendRequests.filter(x => {
        return x._id.toString() !== friend._id.toString();
    });

    await req.user.save();
    res.send({id: friend._id, username: friend.username});
});

router.delete('/deleteFriend', isLoggedIn, async (req, res) => {
    const friend = await User.findById(req.body.id);

    friend.friends = friend.friends.filter(x => {
        return x._id.toString() !== req.user._id.toString();
    })

    req.user.friends = req.user.friends.filter(x => {
        return x._id.toString() !== friend._id.toString();
    });

    await friend.save();
    await req.user.save();

    res.send(friend._id);
})

router.put('/test', (req, res) => {
    req.io.emit('test', 'socket with express router');
})

router.put('/connect', isLoggedIn, async (req, res) => {
    res.send("User connected to socket");
});

router.put('/disconnect', async (req, res) => {
    // req.user.online = false;
    // await req.user.save();
    res.send("User disconnected from socket");
})

module.exports = router;
