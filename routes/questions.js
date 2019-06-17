const express = require('express');

const QuestionsController = require('../controllers/questions');

const router = express.Router();

router.get('', QuestionsController.getQuestions);

router.put('', QuestionsController.putQuestion);

module.exports = router;