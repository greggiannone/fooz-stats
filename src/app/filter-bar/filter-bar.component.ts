import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../services/matches.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

	constructor(private matchesService: MatchesService) { }

	ngOnInit()
	{
	}

	onKeyFilter(value: string)
	{
		this.matchesService.filterName(value)
	}

	onSeasonFilterChange(value: string)
	{
		// Set filter to be any season if they pick the any option
		if (value == "any") 
		{
			this.matchesService.filterSeason('');
		}
		else
		{
			this.matchesService.filterSeason(value);
		} 
	}
}
