// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const game = require('./routes/game');
const match = require('./routes/match');
const player = require('./routes/player');

const app = express();

console.log("started");

app.use(function(req, res, next) 
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/games/:gameId', game);
app.get('/games/match/:matchId', game);
app.get('/matches/id/:matchId', match);
app.get('/matches/all', match);
app.get('/players/:playerName/matchstats', player);
app.get('/', function(req, res) { res.end("Welcome to the fooz api") });
app.get('/*', function(req, res) { res.end("Invalid request") });

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));