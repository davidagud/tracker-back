const mongoose = require('mongoose');

const userSubmissionSchema = mongoose.Schema({
    _id: { type: String, required: true }
}, { strict: false });

module.exports = mongoose.model('UserSubmission', userSubmissionSchema);