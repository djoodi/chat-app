const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Room = require('./room');
const User = require('./user');

const ServerSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    members : [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room',
    }],
});

ServerSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Room.deleteMany({
            _id: {
                $in: doc.rooms
            }
        });
        await User.updateMany({
            _id: {$in: doc.members}}, 
            {$pull: {servers: doc._id}
        });
    }
})

ServerSchema.post('deleteOne', async function (doc) {
    if (doc) {
        await Room.deleteMany({
            _id: {
                $in: doc.rooms
            }
        });
        await User.updateMany({
            _id: {$in: doc.members}}, 
            {$pull: {servers: doc._id}
        });
    }
})

module.exports = mongoose.model("Server", ServerSchema);