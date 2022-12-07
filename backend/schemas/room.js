const mongoose = require('mongoose');
const Message = require('./message');
const Schema = mongoose.Schema;

// This will also serve our as private DM rooms
const RoomSchema = new Schema({
    title: {
        type: String,
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
});

RoomSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Message.deleteMany({
            _id: {
                $in: doc.messages
            }
        })
    }
});

RoomSchema.post('deleteMany', async function (doc) {
    if (doc) {
        await Message.deleteMany({
            _id: {
                $in: doc.messages
            }
        })
    }
})

// Channels don't have a reference to the server that they're in, so clean up has to happen at the route-level

module.exports = mongoose.model("Room", RoomSchema);