const express = require('express');
const sql = require('mssql');
const router = express.Router();
const dbAccess = require('../util/db_access');

var config = {
    user: 'foozapi',
    password: 'f00zstats',
    server: 'ONE-017054',
    database: 'HMCTFS',
    options: {
        instanceName: 'ALACRITY'
    }
}

router.get('/games/:gameId', function(req, res) {
    const pool = new sql.ConnectionPool(config, err =>
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            var request = new sql.Request(pool);
            var stringRequest = 'select * from FoozGames where GameID = ' + req.params.gameId;
            console.log(stringRequest);
            request.query(stringRequest, function(err, recordset) 
            {
                if (err)
                {
                    res.end("Invalid request");
                    console.log(err);
                }
                else
                {
                    res.end(JSON.stringify(recordset.recordset[0]));
                }
            });
        }
    });
});

router.get('/games/match/:matchId', function(req, res) 
{
    var result = dbAccess.sendQuery('select * from FoozGames where MatchId = @MatchId', 
    [
        {
            name: 'MatchId',
            type: sql.Int,
            value: req.params.matchId
        }
    ], res)
});

module.exports = router;