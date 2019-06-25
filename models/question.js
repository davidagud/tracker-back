const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    choices: { type: Object, required: true }
})

module.exports = mongoose.model('Question', questionSchema);