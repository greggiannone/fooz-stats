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
            res.end(JSON.stringify(recordset.recordset[0]));
        });
    });
});

router.get('/games/match/:matchId', function(req, res) {
    const pool = new sql.ConnectionPool(config, err =>
    {
		console.log('get by matchid');
		if (err) 
		{
			console.log(err);
		}
		else
		{
			var request = new sql.Request(pool);
			var stringRequest = 'select * from FoozGames where MatchID = ' + req.params.matchId;
			console.log(stringRequest);
			request.query(stringRequest, function(err, recordset) 
			{
				if (err) console.log(err);
				else res.end(JSON.stringify(recordset.recordset));
			});
		}
	});
});

module.exports = router;