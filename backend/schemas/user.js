const { Server } = require('http');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = Schema({
    servers: [{
        type: Schema.Types.ObjectId,
        ref: 'Server'
    }],
    friends: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
            },
        roomID: {
            type: String,
            required: true
        }
    }],
    friendRequests: [{
        type: Schema.Types.ObjectId,
        ref:'User'
    }]
    // online:{
    //     type: Boolean,
    //     required: true
    // }
});

UserSchema.plugin(passportLocalMongoose);

// TODO delete servers where user is the author...? or do we just pass authorship to the next person?
// for simplicty's sake lets just delete the entire server >.>

UserSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Server.deleteMany({
            _id: {
                $in: doc.servers
            }
        })
        doc.friends.foreach(async (friend) => {
            await Member.findByIdAndUpdate(friend_id, {$pull: {friends: doc._id}});
        })
    }
})

module.exports = mongoose.model("User", UserSchema);