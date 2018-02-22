import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatchesDataAccessService } from '../services/matches-data-access.service';
import { NameService } from '../services/name.service';
import { Match } from '../models/match';
import { MatchesService } from '../services/matches.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

	@Output() onSelectionChanged = new EventEmitter();

	selectedMatch: Match;
	dates = {};

	constructor(private nameService: NameService, private matchesService: MatchesService) 
	{ 
	
	}

	ngOnInit() 
	{
		// Assign a map of dates so we can have Dates instead of strings
		this.matchesService.filteredMatches.forEach(match => 
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
