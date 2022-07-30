const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileName: {type: String, required: true},
    filePath: {type: String, required: true},
    fileSize: {type: Number, required: true},
    UUID: {type: String, required: true},
    senderEmail: {type: String, required: false},
    receiverEmail: {type: String, required: false},
}, {timestamps: true});

module.exports = mongoose.model('File', fileSchema);
