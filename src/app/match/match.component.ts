import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../models/match';
import { Game } from '../models/game';
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})

export class MatchComponent implements OnInit 
{
	@Input() match: Match;
	@Input() games: Game[];
	gameVisibility = [false, false, false];
	date: Date;

	constructor() 
	{ 
	}

	ngOnInit() 
	{
		this.date = new Date(this.match.MatchDateTime);
	}

	toggleGame(gameNum: number)
	{
		this.gameVisibility[gameNum] = !this.gameVisibility[gameNum];
	}
}
