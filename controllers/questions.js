const Question = require('../models/question');
const UserQuestion = require('../models/user-question');
const UserSubmission = require('../models/user-submission');

exports.getQuestions = (req, res, next) => {
    let fetchedQuestions;

    Question.find()
        .then(questions => {
            fetchedQuestions = questions;
            res.status(200).json({
                message: 'Questions fetched successfully',
                questions: fetchedQuestions
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching posts failed'
            });
        })
};

exports.putQuestion = (req, res, next) => {
    const question = new UserQuestion({
        _id: req.body.userId,
        questions: {
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            type: req.body.type,
            choices: req.body.choices
        }
    });

    UserQuestion.findOne({_id: req.body.userId})
        .then(user => {
            if (user == null) {
                question.save().then(() => {
                    res.status(200).json({message: 'Saved response successfully'});
                })
                .catch(error => {
                    res.status(500).json({message: 'Saving resposne failed'});
                });
            } else {
                let result = user.questions.some(question => {
                    if (question.id == req.body.id) {
                        return true;
                    }
                });
                if (!result) {
                    user.questions.push(
                        {
                            _id: req.body.id,
                            title: req.body.title,
                            content: req.body.content,
                            category: req.body.category,
                            type: req.body.type,
                            choices: req.body.choices
                        }
                    );
                    user.save()
                        .then(addedQuestion => {
                            res.status(201).json({
                                message: 'Question added successfully to existing array',
                                question: {...addedQuestion}
                            });
                        })
                        .catch(error => {
                            res.status(500).json({
                                message: 'Adding question to array failed'
                            });
                        });
                }
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Adding question to array failed'
            });
        });
}

exports.getUserQuestions = (req,res,next) => {
    let fetchedQuestions;
    UserQuestion.findOne({_id: req.params.userId})
        .then(questions => {
            fetchedQuestions = questions;
            res.status(200).json({
                message: 'Questions fetched successfully',
                questionsArray: fetchedQuestions
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching posts failed'
            });
        });
}

exports.removeUserQuestion = (req,res,next) => {
    UserQuestion.updateOne({_id: req.params.userId}, { $pull: { 'questions': { _id: req.params.questionId}}})
        .then(result => {
            res.status(200).json({message: 'Deletion successful'});
        })
        .catch(error => {
            res.status(500).json({message: 'Deletion failed'});
        });
}

exports.putFormSubmission = (req,res,next) => {
    parsedDate = Date.parse(req.body.date);
    userSubmission = new UserSubmission({
        _id: req.body.userId,
        [parsedDate]: req.body.questions
    });

    UserSubmission.findOne({_id: req.body.userId})
        .then(user => {
            if (user) {
                user = user.toObject();
            }
            if (user == null) {
                userSubmission.save()
                    .then(() => {
                        res.status(200).json({message: 'Saved new entry successfully'});
                    })
                    .catch(error => {
                        res.status(500).json({message: 'Saving new entry failed'});
                    });
            }  else {
                userSubmission.update({ [parsedDate]: req.body.questions })
                    .then(() => {
                        res.status(200).json({message: 'Updated day entry successfully'});
                    })
                    .catch(error => {
                        res.status(500).json({message: 'Updating day entry failed'});
                    });
            }
        });
}

exports.getDayResponse = (req,res,next) => {
    UserSubmission.findOne( {_id: req.params.userId, [req.params.date]: { $exists: true}}, {[req.params.date]: true, _id: false })
        .then(date => {
            if (date !== null) {
                res.status(200).json({message: 'Successfully searched for and found date', day: date});
            } else {
                res.status(200).json({message: 'Successfully searched for date, none found', day: date });
            }
        })
        .catch(error => {
            res.status(500).json({message: 'Could not complete search'});
        });
}