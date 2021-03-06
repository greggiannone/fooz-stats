import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Match } from '../models/match';
import { Game } from '../models/game';
import { NameService } from '../services/name.service';
import { MatchesDataAccessService } from '../services/matches-data-access.service';
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})

export class MatchComponent implements OnInit
{
	@Input() match: Match;
	@Output() onPlayerSelected = new EventEmitter();

	games: Game[];
	gameVisibility = [false, false, false];
	date: Date;

	constructor(private nameService:NameService, private matchesDataAccessService:MatchesDataAccessService) 
	{ 
	}

	ngOnInit() 
	{
	}

	ngOnChanges(changes: SimpleChange)
	{
		// Make sure the change event is from the match input
		if (changes["match"])
		{
			this.matchChanged();
		}
	}

	matchChanged()
	{
		this.date = new Date(this.match.MatchDateTime);
		this.matchesDataAccessService.getGame(this.match.MatchId).subscribe(games => this.games = games);
		this.gameVisibility = [false, false, false];
	}

	toggleGame(gameNum: number)
	{
		this.gameVisibility[gameNum] = !this.gameVisibility[gameNum];
	}
}
