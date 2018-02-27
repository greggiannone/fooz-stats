import { Component, OnInit } from '@angular/core';
import { Match } from "./models/match";
import { Game } from "./models/game";
import { Player } from "./models/player"
import { MatchesDataAccessService } from "./services/matches-data-access.service";
import { MatchesService } from './services/matches.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	title = 'fooz-stats';

	match: Match;
	player: Player;

	constructor(private matchesService: MatchesService, private matchesDAService: MatchesDataAccessService)
	{

	}

	ngOnInit()
	{
		this.matchesService.loadMatches();
		this.matchesDAService.getPlayerStats('ggiannone').subscribe(player => this.player = player);
	}

	selectionChanged(match: Match)
	{
		this.match = match;
	}
}
