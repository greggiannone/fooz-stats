import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatchesService } from '../services/matches.service';
import { NameService } from '../services/name.service';
import { Match } from '../models/match';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

	@Input() matches: Match[];
	@Output() onSelectionChanged = new EventEmitter();

	selectedMatch: Match;
	dates = {};

	constructor(private matchesService: MatchesService, private nameService: NameService) 
	{ 
	
	}

	ngOnInit() 
	{
		// Assign a map of dates so we can have Dates instead of strings
		this.matches.forEach(match => 
		{
			this.dates[match.MatchId] = new Date(match.MatchDateTime);
		});
	}

	onSelect(match: Match)
	{
		this.onSelectionChanged.emit(match);
		this.selectedMatch = match;
	}
}
