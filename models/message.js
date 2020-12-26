const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    authorId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("textMessage", textSchema);