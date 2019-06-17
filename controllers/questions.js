const Question = require('../models/question');
const UserQuestion = require('../models/userquestion');

exports.getQuestions = (req, res, next) => {
    const questionQuery = Question.find()
    let fetchedQuestions;

    questionQuery
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
        });
};

exports.putQuestion = (req, res, next) => {
    const question = new UserQuestion({
        _id: req.body.userId,
        questions: {
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content
        }
    });

    UserQuestion.findOne({_id: req.body.userId})
        .then(user => {
            if (user == null) {
                question.save().then(() => {
                    console.log('Added');
                });
            } else {
                let result = user.questions.some(question => {
                    console.log('loop', question.id, req.body.id);
                    if (question.id == req.body.id) {
                        return true;
                    }
                });
                if (!result) {
                    console.log('Updating array');
                    user.questions.push(
                        {
                            _id: req.body.id,
                            title: req.body.title,
                            content: req.body.content
                        }
                    );
                    user.save()
                        .then(addedQuestion => {
                            res.status(201).json({
                                message: 'Question added successfully to existing array',
                                question: {...addedQuestion}
                            });
                            console.log('Added question to array', addedQuestion);
                        })
                        .catch(error => {
                            res.status(500).json({
                                message: 'Adding question to array failed'
                            });
                        });
                } else {
                    console.log('Already exists');
                };
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Adding question to array failed'
            });
        });
}