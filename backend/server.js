const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocalStrategy = require('passport-local').Strategy;
const cookieParsrer = require('cookie-parser');

const session = require('express-session');
const bodyParser = require('body-parser');
const http = require('http');
const User = require('./schemas/user');
const Message = require('./schemas/message');
const userRoutes = require('./routes/users');
const serverRoutes = require('./routes/servers');
const roomRoutes = require('./routes/rooms');
const Server = require('./schemas/server');

const app = express();
const server = http.createServer(app);


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
    origin: "http://localhost:3000", // <-- location of the react app we are connecting to
    credentials: true
}));

const sessionMiddleware = session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
});

app.use(sessionMiddleware);

app.use(cookieParsrer("secretcode"));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// end of middleware

// routes
app.use('/', userRoutes);
app.use('/servers', serverRoutes);
app.use('/rooms', roomRoutes);


// socket.io events
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      
      credentials: true
    }
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next)=>{
    
    console.log('checking authorization')

    if (socket.request.user) {
        console.log(user.username);
        next();
    } else {
        console.log('not authorized');
        next(new Error("unauthorized"));
    }
})

io.on('connection', (socket)=> {
    console.log('new connection', socket.id);

    socket.on('disconnect', () => {
        console.log('disconnected', socket.id);
    })

    const session = socket.request.session;
    console.log(`saving sid ${socket.id} in session ${session.id}`);
    session.socketId = socket.id;
    session.save();
    
    // socket.on("message", async (data)=> {
    //     console.log(data);
    //     const newMessage = new Message({
    //         timestamp: Date(),
    //         message: data.message,
    //         author: socket.request.user._id
    //     });
    //     const server = await Server.findById(data.serverID);
    //     server.messages.push(newMessage._id);
    //     await newMessage.save();
    //     await server.save();
    // })
});

server.listen(4000, ()=> {
    console.log('listening on 4000');
});
