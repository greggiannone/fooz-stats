const express = require('express');
const router = express.Router();
const dbAccess = require('../util/db_access');
const sql = require('mssql');

router.get('/matches/id/:matchId', function(req, res) 
{
    dbAccess.sendQuery('select * from FoozMatches where MatchID = @MatchID',
    [
        {
            name: 'MatchID',
            type: sql.Int,
            value: req.params.matchId
        }
    ], res);
});

router.get('/matches/all', function(req, res) 
{
    dbAccess.sendQuery('select top 100 * from FoozMatches order by MatchID desc', [], res);
});

module.exports = router;