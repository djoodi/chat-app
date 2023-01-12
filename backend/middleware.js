const passport = require('passport');
const Server = require('./schemas/server');

module.exports.isLoggedIn = (req, res, next) => {
    console.log("Checking if logged in");
    if(!req.isAuthenticated()){
        // req.session.returnTo = req.originalUrl;
        // console.log('the returnTo url is',req.session.returnTo);
        // req.flash('error', 'You must be logged in.');
        console.log("Not logged in");
        return res.send(false);
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const {id} = req.body;
    const server = await Server.findById(id);
    if(!server.author.equals(req.user._id)) {
        return res.send('You do not have permission to do that.');
    }
    next();
}

module.exports.isMember = async (req, res, next) =>{
    const {id} = req.body;
    const server = await Server.findById(id);
    if (!server.members.includes(req.user._id)) {
        throw("User is not a member of server ", server.title);
    }
    next();
}