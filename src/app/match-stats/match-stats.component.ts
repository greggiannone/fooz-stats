import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { Match } from '../models/match'
import { Stats } from '../models/stats'
import { MatchesDataAccessService } from '../services/matches-data-access.service'
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.css']
})
export class MatchStatsComponent implements OnInit {

	@Input() match: Match;

	stats = {};

	constructor(private matchesDA: MatchesDataAccessService, private nameService: NameService) { }

	ngOnInit() 
	{
		this.refreshStats();
	}

	ngOnChanges(changes: SimpleChange)
	{
		// Make sure the change event is from the match input
		if (changes["match"])
		{
			this.refreshStats();
		}
	}

	private refreshStats()
	{
		this.stats = {};
		this.addTeam("Black Team", this.match.BlackTeamCaptain, this.match.BlackTeamPlayer)
		this.addPlayer(this.match.BlackTeamCaptain);
		this.addPlayer(this.match.BlackTeamPlayer);
		this.addTeam("Yellow Team", this.match.YellowTeamCaptain, this.match.YellowTeamPlayer)
		this.addPlayer(this.match.YellowTeamCaptain);
		this.addPlayer(this.match.YellowTeamPlayer);
	}

	private addPlayer(playerName: string)
	{
		this.matchesDA.getPlayerStats(playerName).subscribe(player =>
		{
			// Get the full name for the small stats viewer
			player.Name = this.nameService.name(player.Name);
			this.stats[playerName] = player
		});
	}

	private addTeam(teamName: string, playerOne: string, playerTwo: string)
	{
		this.matchesDA.getTeamStats(playerOne, playerTwo).subscribe(team => 
		{
			// User the team color name rather than the API generated one
			team.Name = teamName;
			this.stats[teamName] = team;
		});
	}

}
