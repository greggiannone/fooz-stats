import { Injectable } from '@angular/core';
import { Match } from '../models/match';
import { MatchesDataAccessService } from './matches-data-access.service'
import { NameService } from './name.service'

@Injectable()
export class MatchesService 
{
	allMatches: Match[];
	filteredMatches: Match[];
	error: boolean;

	private nameFilter: string;
	private seasonFilter: string;

	constructor(private matchesDataAccess: MatchesDataAccessService, private nameService: NameService) 
	{ 
		this.error = false;
	}

	loadMatches()
	{
		this.matchesDataAccess.getMatches().subscribe(matches => 
		{
			this.allMatches = matches;
			this.refreshFilter();
			if (this.allMatches == null || this.allMatches.length == 0)
			{
				console.log("error");
				this.error = true;
			}
			else
			{
				this.error = false;
			}
		}); 
	}

	filterName(name: string)
	{
		this.nameFilter = name;
		this.refreshFilter();
	}

	filterSeason(season: string)
	{
		this.seasonFilter = season;
		this.refreshFilter();
	}

	private refreshFilter()
	{
		// Filter out matches based on the criteria we have cached
		this.filteredMatches = this.allMatches.filter(match =>
		{
			var matchesName = true, matchesSeason = true;
			if (this.nameFilter != null && this.nameFilter != '')
			{
				matchesName = this.checkName(match.BlackTeamCaptain, this.nameFilter) || 
					this.checkName(match.BlackTeamPlayer, this.nameFilter) ||
					this.checkName(match.YellowTeamCaptain, this.nameFilter) || 
					this.checkName(match.YellowTeamPlayer, this.nameFilter);
			}
			if (this.seasonFilter != null && this.seasonFilter != '')
			{
				matchesSeason = match.Season.toString() == this.seasonFilter;
			}

			return matchesName && matchesSeason;
		});
	}

	private checkName(username: string, search: string): boolean
	{
		return this.nameService.name(username).toLowerCase().includes(search)
	}
}
