const User = require('../schemas/user');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn} = require('../middleware');
const Server = require('../schemas/server');

// routes
router.get('/user', isLoggedIn, (req, res) => {
    res.send(req.user);
});

router.get('/app', isLoggedIn, (req, res) => {
    // this route only exists to check if user is logged in
});

router.get('/members/:id', isLoggedIn, async(req, res)=> {
    const {id} = req.params;
    const server = await Server.findById(id).populate('members', '_id username');
})

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send('No User Exists');
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send(true);
                console.log('logging in', req.user.username);
            });
        }
    })(req, res, next);
});

router.post('/register', (req, res) => {
    const {username, password} = req.body;
    User.findOne({
        username
    }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send('User Already Exists');
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


router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut((err) => {
        if (err) throw err;
        console.log('Logged out successfully');
        res.send('Logged out successfully');
    })
});

module.exports = router;
