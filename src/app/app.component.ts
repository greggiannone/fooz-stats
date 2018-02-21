import { Component, OnInit } from '@angular/core';
import { Match } from "./models/match";
import { Game } from "./models/game";
import { MatchesService } from "./services/matches.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	title = 'fooz-stats';

	matches: Match[];
	match: Match;

	constructor(private matchesService:MatchesService)
	{

	}

	ngOnInit()
	{
		this.matchesService.getMatches().subscribe(matches => 
		{
			this.matches = matches;
		});
	}

	selectionChanged(match: Match)
	{
		this.match = match;
	}
}
