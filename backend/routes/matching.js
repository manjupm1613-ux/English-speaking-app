// smart matching algorithm based on skill level, timezone, learning goals, user interests

const redis = require('redis');
const client = redis.createClient();

class User {
    constructor(id, skillLevel, timezone, learningGoals, interests) {
        this.id = id;
        this.skillLevel = skillLevel;
        this.timezone = timezone;
        this.learningGoals = learningGoals;
        this.interests = interests;
    }
}

const usersQueue = [];

function addUserToQueue(user) {
    usersQueue.push(user);
}

function findMatch(user) {
    return usersQueue.find(candidate =>
        candidate.skillLevel === user.skillLevel &&
        candidate.timezone === user.timezone &&
        candidate.learningGoals === user.learningGoals &&
        candidate.interests.some(interest => user.interests.includes(interest))
    );
}

function processQueue() {
    while (usersQueue.length > 0) {
        const user = usersQueue.shift();
        const match = findMatch(user);
        if (match) {
            console.log(`Match found for User ID ${user.id}: User ID ${match.id}`);
            // Logic to notify users of their match
        } else {
            console.log(`No match found for User ID ${user.id}.`);
            // Add logic for users who don't have a match yet
        }
    }
}

client.on('connect', function() {
    console.log('Connected to Redis...');
});

// Assume some users are added to the queue
const user1 = new User(1, 'intermediate', 'UTC', 'improve speaking', ['travel', 'culture']);
const user2 = new User(2, 'intermediate', 'UTC', 'improve speaking', ['culture', 'food']);
addUserToQueue(user1);
addUserToQueue(user2);

// Process the queue
processQueue();
