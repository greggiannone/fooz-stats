const express = require('express');
const sql = require('mssql');
const router = express.Router();

var config = {
    user: 'foozapi',
    password: 'f00zstats',
    server: 'ONE-017054',
    database: 'HMCTFS',
    options: {
        instanceName: 'ALACRITY'
    }
}

router.get('/matches/id/:matchId', function(req, res) 
{
    const pool = new sql.ConnectionPool(config, err =>
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            var request = new sql.Request(pool);
            var stringRequest = 'select * from FoozMatches where MatchId = ' + req.params.matchId;
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

router.get('/matches/all', function(req, res)
{
    const pool = new sql.ConnectionPool(config, err =>
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            var request = new sql.Request(pool);
            var stringRequest = 'select top 100 * from FoozMatches order by MatchId desc';
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
                    res.end(JSON.stringify(recordset.recordset));
                }
            });
        }
    });
})

module.exports = router;