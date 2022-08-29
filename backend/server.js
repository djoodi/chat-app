const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocalStrategy = require('passport-local').Strategy;
const cookieParsrer = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const http = require('http');
const User = require('./schemas/user');
const Message = require('./schemas/message');

const app = express();

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
});

mongoose.connect('mongodb://localhost:27017/chat-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected to db');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true // <-- location of the react app we are connecting to
}));

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParsrer("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// end of middleware

// routes
app.post('/login', (req, res, next)=> {
    passport.authenticate("local", (err,user,info)=> {
        if (err) throw err;
        if (!user) res.send ('No User Exists');
        else {
            req.logIn(user, err=> {
                if (err) throw err;
                res.send('Successfully Authenticated');
                console.log(req.user);
            });
        }
    })(req, res, next);
});
// 
app.post('/register', (req, res)=> {

    const {username, password} = req.body;

    User.findOne({username}, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send('User Already Exists');
        if (!doc) {
            const newUser = new User({username});
            const registeredUser = await User.register(newUser, password);
            await newUser.save();
            res.send('User Created'); 
        }
    })
    console.log(req.body);
});

app.get('/user', (req, res)=> {
    res.send(req.user);
});

app.get('/logout', (req, res) => {
    if (req.user) req.logOut((err)=> {
        if (err) throw err;
        res.send('Logged out successfully');
    })
})


// socket.io events
io.on('connection', (socket)=> {
    console.log('a user connected', socket.id);

    socket.on("message", (msg)=> {
        console.log(msg);
    })
});

server.listen(4000, ()=> {
    console.log('listening on 4000');
});
