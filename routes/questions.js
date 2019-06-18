const express = require('express');

const QuestionsController = require('../controllers/questions');

const router = express.Router();

router.get('/:userId', QuestionsController.getUserQuestions);

router.get('', QuestionsController.getQuestions);

router.put('', QuestionsController.putQuestion);

router.delete('/:userId/:questionId', QuestionsController.removeUserQuestion);

module.exports = router;