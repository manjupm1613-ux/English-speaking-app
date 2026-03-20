// competitive league system

// Define the tiers
const tiers = ['Gold', 'Silver', 'Bronze'];

// Define a class for players in the league
class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.tier = 'Bronze'; // Default tier
    }
}

// League class to manage players and leaderboards
class League {
    constructor() {
        this.players = [];
    }

    addPlayer(name) {
        const player = new Player(name);
        this.players.push(player);
    }

    accumulatePoints(playerName, points) {
        const player = this.players.find(p => p.name === playerName);
        if (player) {
            player.points += points;
            this.updateTier(player);
        }
    }

    updateTier(player) {
        // Update tier based on points
        if (player.points >= 1000) {
            player.tier = 'Gold';
        } else if (player.points >= 500) {
            player.tier = 'Silver';
        } else {
            player.tier = 'Bronze';
        }
    }

    getLeaderboard() {
        // Sort players by points
        return this.players.sort((a, b) => b.points - a.points);
    }
}

// Example usage
const league = new League();
league.addPlayer('Alice');
league.addPlayer('Bob');

league.accumulatePoints('Alice', 600);
league.accumulatePoints('Bob', 1200);

console.log(league.getLeaderboard()); // Displays the leaderboard