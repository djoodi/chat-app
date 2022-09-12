const { channel } = require('diagnostics_channel');
const { Server } = require('http');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Channel = require('./channel');

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
    channels: [{
        type: Schema.Types.ObjectId,
        ref: 'Channel',
    }],
});

// TODO, delete channels when server is deleted

ServerSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Channel.deleteMany({
            _id: {
                $in: doc.channels
            }
        })
    }
})

ServerSchema.post('deleteMany', async function (doc) {
    if (doc) {
        await Channel.deleteMany({
            _id: {
                $in: doc.channels
            }
        })
    }
})

module.exports = mongoose.model("Server", ServerSchema);