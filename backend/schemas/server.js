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

module.exports = mongoose.model("Server", ServerSchema);