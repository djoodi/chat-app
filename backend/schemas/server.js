const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Room = require('./room');

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

// TODO, delete channels when server is deleted

ServerSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Room.deleteMany({
            _id: {
                $in: doc.rooms
            }
        })
    }
})

ServerSchema.post('deleteMany', async function (doc) {
    if (doc) {
        await Room.deleteMany({
            _id: {
                $in: doc.rooms
            }
        })
    }
})

module.exports = mongoose.model("Server", ServerSchema);