const express = require('express');
const router = express.Router();
const dbAccess = require('../util/db_access');
const sql = require('mssql');

router.get('/players/:playerName/matchstats', function(req, res) 
{
	dbAccess.sendQuery(`select @playerName as Name,
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

router.get('/players/team/:playerOneName/:playerTwoName', function(req, res)
{
	dbAccess.sendQuery(`select @playerOneName + '/' + @playerTwoName as Name,
	count(case when ((BlackTeamCaptain = @playerOneName and BlackTeamPlayer = @playerTwoName or BlackTeamPlayer = @playerOneName and BlackTeamCaptain = @playerTwoName) 
	and BlackTeamScore > YellowTeamScore
	or (YellowTeamCaptain = @playerOneName and YellowTeamPlayer = @playerTwoName or YellowTeamPlayer = @playerOneName and YellowTeamCaptain = @playerTwoName) 
	and BlackTeamScore < YellowTeamScore)
	then BlackTeamScore else null end) as MatchWins,
	count(case when ((BlackTeamCaptain = @playerOneName and BlackTeamPlayer = @playerTwoName or BlackTeamPlayer = @playerOneName and BlackTeamCaptain = @playerTwoName) 
	and BlackTeamScore < YellowTeamScore
	or (YellowTeamCaptain = @playerOneName and YellowTeamPlayer = @playerTwoName or YellowTeamPlayer = @playerOneName and YellowTeamCaptain = @playerTwoName) 
	and BlackTeamScore > YellowTeamScore)
	then BlackTeamScore else null end) as MatchLosses,
	sum (case when BlackTeamCaptain = @playerOneName and BlackTeamPlayer = @playerTwoName or BlackTeamPlayer = @playerOneName and BlackTeamCaptain = @playerTwoName 
	then BlackTeamScore else null end) +
	sum (case when YellowTeamCaptain = @playerOneName and YellowTeamPlayer = @playerTwoName or YellowTeamPlayer = @playerOneName and YellowTeamCaptain = @playerTwoName 
	then YellowTeamScore else null end) as GameWins,
	sum (case when BlackTeamCaptain = @playerOneName and BlackTeamPlayer = @playerTwoName or BlackTeamPlayer = @playerOneName and BlackTeamCaptain = @playerTwoName 
	then YellowTeamScore else null end) +
	sum (case when YellowTeamCaptain = @playerOneName and YellowTeamPlayer = @playerTwoName or YellowTeamPlayer = @playerOneName and YellowTeamCaptain = @playerTwoName 
	then BlackTeamScore else null end) as GameLosses 
	from FoozMatches`,
	[
		{
			name: 'playerOneName',
			type: sql.NVarChar,
			value: req.params.playerOneName
		},
		{
			name: 'playerTwoName',
			type: sql.NVarChar,
			value: req.params.playerTwoName
		}
	], res);
});

module.exports = router;