const User = require('../schemas/user');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn} = require('../middleware');
const Server = require('../schemas/server');
const user = require('../schemas/user');

// routes
router.get('/user', isLoggedIn, async (req, res) => {
    const user = await User.findById(req.user._id).populate('friends', '_id username').populate('friendRequests', '_id username');
    console.log(user);
    res.send(user);
});

router.get('/app', isLoggedIn, (req, res) => { // this route only exists to check if user is logged in
});

router.get('/members/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const server = await Server.findById(id).populate('members', '_id username');
})

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) 
            throw err;
        

        if (! user) 
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

const validateUsername = (input) => {
    const regularExpression = /^[A-Za-z][A-Za-z0-9]{3,23}$/;
    return regularExpression.test(input);
};

const validatePassword = (input) => {
    const regularExpression = /.{8,24}/;
    return regularExpression.test(input);
};

router.post('/friendRequest', isLoggedIn, async (req, res) => {
    // user id
    // recipient id
    const recipient = await User.findByUsername(req.body.recipient);
    if (recipient != null) {
        const request = recipient.friendRequests.includes(req.user.id);
        console.log(request);
        if (request) {
            console.log('friend request already exists');
            res.send(true);
        } else {
            recipient.friendRequests.push(req.user.id);
            console.log('sending new friend request');
            await recipient.save();
            res.send(true);
        }
    } else {
        res.send(false);
    }
    // check if recipient already has a friend request from the user
    // if not, then send friend request
    // if yes, do nothing

});

router.post('/acceptFriendRequest', isLoggedIn, async (req, res) => {
    console.log('accepted friend request from', req.body.id);
    const friend = await User.findById(req.body.id);
    // update both users friend lists
    req.user.friends.push(friend._id);
    friend.friends.push(req.user._id);

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

router.get('/logout', isLoggedIn, async (req, res) => {
    req.logOut((err) => {
        if (err) 
            throw err;
        

        req.user.online = false;
        req.user.save();
        console.log('Logged out successfully');
        res.send('Logged out successfully');
    })
});

router.put('/connect', isLoggedIn, async (req, res) => {
    req.user.online = true;
    await req.user.save();
    res.send("User connected to socket");
});

router.put('/disconnect', async (req, res) => {
    req.user.online = false;
    await req.user.save();
    res.send("User disconnected from socket");
})

module.exports = router;
