const express = require('express');
const router = express.Router();
const dbAccess = require('../util/db_access');
const sql = require('mssql');

router.get('/players/:playerName/matchstats', function(req, res) 
{
	dbAccess.sendQuery(`select @playerName as PlayerName,
	count(case when ((BlackTeamCaptain = @playerName or BlackTeamPlayer = @playerName) and BlackTeamScore > YellowTeamScore or
	(YellowTeamCaptain = @playerName or YellowTeamPlayer = @playerName) and BlackTeamScore < YellowTeamScore)
	then BlackTeamScore else null end) as MatchWins,
	count(case when ((BlackTeamCaptain = @playerName or BlackTeamPlayer = @playerName) and BlackTeamScore < YellowTeamScore or
	(YellowTeamCaptain = @playerName or YellowTeamPlayer = @playerName) and BlackTeamScore > YellowTeamScore)
	then BlackTeamScore else null end) as MatchLosses, 
	sum (case when BlackTeamCaptain = @playerName or BlackTeamPlayer = @playerName then BlackTeamScore else null end) +
	sum (case when YellowTeamCaptain = @playerName or YellowTeamPlayer = @playerName then YellowTeamScore else null end) as GameWins,
	sum (case when BlackTeamCaptain = @playerName or BlackTeamPlayer = @playerName then YellowTeamScore else null end) +
	sum (case when YellowTeamCaptain = @playerName or YellowTeamPlayer = @playerName then BlackTeamScore else null end) as GameLosses 
	from FoozMatches`,
    [
        {
            name: 'playerName',
            type: sql.NVarChar,
            value: req.params.playerName
        }
    ], res);
});

module.exports = router;