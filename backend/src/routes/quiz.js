// quiz.js

const express = require('express');
const router = express.Router();

let quizzes = {};

// Join a live quiz
router.post('/join', (req, res) => {
    const { quizId, userId } = req.body;
    if (!quizzes[quizId]) {
        return res.status(404).json({ message: 'Quiz not found' });
    }
    quizzes[quizId].participants.push(userId);
    res.json({ message: 'User joined quiz', quizId, participants: quizzes[quizId].participants });
});

// Create a new quiz
router.post('/create', (req, res) => {
    const quizId = Date.now();
    quizzes[quizId] = {
        questions: [],
        participants: [],
        scores: {},
    };
    res.json({ message: 'Quiz created', quizId });
});

// Add a question to the quiz
router.post('/:quizId/question', (req, res) => {
    const { quizId } = req.params;
    const { question, options, correctAnswer } = req.body;
    if (!quizzes[quizId]) {
        return res.status(404).json({ message: 'Quiz not found' });
    }
    quizzes[quizId].questions.push({ question, options, correctAnswer });
    res.json({ message: 'Question added', quizId });
});

// Submit an answer
router.post('/:quizId/submit', (req, res) => {
    const { quizId } = req.params;
    const { userId, answer } = req.body;
    if (!quizzes[quizId]) {
        return res.status(404).json({ message: 'Quiz not found' });
    }
    const quiz = quizzes[quizId];
    const questionIndex = quiz.questions.length - 1; // Last question for simplicity
    if (quiz.questions[questionIndex].correctAnswer === answer) {
        quiz.scores[userId] = (quiz.scores[userId] || 0) + 1;
    }
    res.json({ message: 'Answer submitted', score: quiz.scores[userId] || 0 });
});

module.exports = router;