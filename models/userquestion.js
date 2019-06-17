const mongoose = require('mongoose');

const userQuestionSchema = mongoose.Schema({
    _id: { type: String, required: true },
    questions: [{
        _id: { type: String },
        title: { type: String, required: true },
        content: { type: String, required: true },
    }]
})

module.exports = mongoose.model('UserQuestion', userQuestionSchema);