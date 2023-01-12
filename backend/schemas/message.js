const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    timestamp: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isServerInvite: {
        type: Boolean
    }
});

module.exports = mongoose.model("message", MessageSchema);