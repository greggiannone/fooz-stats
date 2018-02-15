// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./routes/api');

const app = express();

console.log("started");

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', api);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

const sql = require('mssql');

var config = {
    user: 'foozapi',
    password: 'f00zstats',
    server: 'ONE-017054',
    database: 'HMCTFS',
    options: {
        instanceName: 'ALACRITY'
    }
}

app.get('/games/:gameId', function(req, res) {
    const pool = new sql.ConnectionPool(config, err =>
    {
        if (err) console.log(err);
        var request = new sql.Request(pool);
        var stringRequest = 'select * from FoozGames where GameID = ' + req.params.gameId;
        request.query(stringRequest, function(err, recordset) {
            if (err) console.log(err);
            res.end(JSON.stringify(recordset.recordset));
        });
    });
});

app.get('/matches/:year/:matchId', function(req, res) {
    const pool = new sql.ConnectionPool(config, err =>
    {
        if (err) console.log(err);
        var request = new sql.Request(pool);
        var stringRequest = '';
        if (req.params.year == '2018') stringRequest = 'select * from FoozMatches where MatchId = ' + req.params.matchId;
        if (req.params.year == '2017') stringRequest = 'select * from FoozMatches2017 where MatchId = ' + req.params.matchId;
        request.query(stringRequest, function(err, recordset) {
            if (err) console.log(err);
            res.end(JSON.stringify(recordset.recordset));
        });
    });
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));