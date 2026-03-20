const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

// Mock database for demonstration purposes
let users = [];

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User created' });
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ username: user.username }, 'secret_key');  // replace 'secret_key' with an environment variable
    res.json({ token });
});

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, 'secret_key', (err, user) => {  // replace 'secret_key' with an environment variable
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Verify token route
router.get('/verify', authenticateJWT, (req, res) => {
    res.json({ message: 'Token is valid', user: req.user });
});

module.exports = router;