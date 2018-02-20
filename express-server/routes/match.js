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

router.get('/matches/:year/:matchId', function(req, res) {
    const pool = new sql.ConnectionPool(config, err =>
    {
        if (err) console.log(err);
        var request = new sql.Request(pool);
        var stringRequest = '';
        if (req.params.year == '2018') stringRequest = 'select * from FoozMatches where MatchId = ' + req.params.matchId;
        if (req.params.year == '2017') stringRequest = 'select * from FoozMatches2017 where MatchId = ' + req.params.matchId;
        request.query(stringRequest, function(err, recordset) {
            if (err) console.log(err);
            res.end(JSON.stringify(recordset.recordset[0]));
        });
    });
});

module.exports = router;