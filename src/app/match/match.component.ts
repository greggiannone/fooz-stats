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

	constructor() 
	{ 

	}

	ngOnInit() 
	{
	}
}
