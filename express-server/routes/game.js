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

router.get('/games/:gameId', function(req, res) {
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

module.exports = router;