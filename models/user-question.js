const mongoose = require('mongoose');

const userQuestionSchema = mongoose.Schema({
    _id: { type: String, required: true },
    questions: [{
        _id: { type: String },
        title: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: String, required: true },
        type: { type: String, required: true },
        choices: { type: Object, required: false }
    }]
})

module.exports = mongoose.model('UserQuestion', userQuestionSchema);