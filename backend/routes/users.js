const User = require('../schemas/user');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn} = require('../middleware');

// routes
router.get('/user', isLoggedIn, (req, res) => {
    console.log(`user is authenticated, session is ${
        req.session.id
    }`);
    res.send(req.user);
});

router.get('/app', isLoggedIn, (req, res) => {
    
});

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
