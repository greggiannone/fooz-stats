import { Component, OnInit } from '@angular/core';
import { Match } from "./models/match";
import { Game } from "./models/game";
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

	constructor(private matchesService: MatchesService)
	{

	}

	ngOnInit()
	{
		this.matchesService.loadMatches();
	}

	selectionChanged(match: Match)
	{
		this.match = match;
	}
}
