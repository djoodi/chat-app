const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const mongoSanitize = require('express-mongo-sanitize');
const localStrategy = require('passport-local');
const helmet = require('helmet');
const cors = require('cors');

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/chat-app";

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console.error, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

const secret = 'thisshouldbeabettersecret';

const store = new MongoStore({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 3600 //24 hours
});

store.on('error', function(e){
    console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true, TODO
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store
}

app.use(session(sessionConfig));

// const scriptSrcUrls = [
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://api.mapbox.com/",
//     "https://kit.fontawesome.com/",
//     "https://cdnjs.cloudflare.com/",
//     "https://cdn.jsdelivr.net/",
//     "https://res.cloudinary.com/du6ttebo3/"
// ];
// const styleSrcUrls = [
//     "https://kit-free.fontawesome.com/",
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.mapbox.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://fonts.googleapis.com/",
//     "https://use.fontawesome.com/",
//     "https://cdn.jsdelivr.net/",
//     "https://res.cloudinary.com/du6ttebo3/"
// ];
// const connectSrcUrls = [
//     "https://*.tiles.mapbox.com",
//     "https://api.mapbox.com",
//     "https://events.mapbox.com",
//     "https://res.cloudinary.com/du6ttebo3/"
// ];
// const fontSrcUrls = [ "https://res.cloudinary.com/du6ttebo3/" ];
 
// app.use(
//     helmet({
//         contentSecurityPolicy: {
//             directives : {
//                 defaultSrc : [],
//                 connectSrc : [ "'self'", ...connectSrcUrls ],
//                 scriptSrc  : [ "'unsafe-inline'", "'self'", ...scriptSrcUrls ],
//                 styleSrc   : [ "'self'", "'unsafe-inline'", ...styleSrcUrls ],
//                 workerSrc  : [ "'self'", "blob:" ],
//                 objectSrc  : [],
//                 imgSrc     : [
//                     "'self'",
//                     "blob:",
//                     "data:",
//                     "https://res.cloudinary.com/du6ttebo3/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
//                     "https://images.unsplash.com/"
//                 ],
//                 fontSrc    : [ "'self'", ...fontSrcUrls ],
//                 mediaSrc   : [ "https://res.cloudinary.com/du6ttebo3/" ],
//                 childSrc   : [ "blob:" ]
//             }
//         },
//         crossOriginEmbedderPolicy: false
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new localStrategy(User.authenticate()));

app.get('/', (req, res) => {
    const pathname = path.join(__dirname, 'build', 'index.html');
    console.log(pathname);
    res.sendFile(pathname);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});