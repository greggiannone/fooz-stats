const express = require('express');
const router = express.Router();
const dbAccess = require('../util/db_access');
const sql = require('mssql');

router.get('/games/:gameId', function(req, res) 
{
    dbAccess.sendQuery('select * from FoozGames where GameID = @GameID',
    [
        {
            name: 'GameID',
            type: sql.Int,
            value: req.params.gameId
        }
    ], res);
});

router.get('/games/match/:matchId', function(req, res) 
{
    dbAccess.sendQuery('select * from FoozGames where MatchID = @MatchID', 
    [
        {
            name: 'MatchID',
            type: sql.Int,
            value: req.params.matchId
        }
    ], res);
});

module.exports = router;