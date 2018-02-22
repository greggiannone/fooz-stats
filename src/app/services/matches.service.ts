import { Injectable } from '@angular/core';
import { Match } from '../models/match';
import { MatchesDataAccessService } from './matches-data-access.service'

@Injectable()
export class MatchesService 
{
	allMatches: Match[];
	filteredMatches: Match[];

	private nameFilter: string;

	constructor(private matchesDataAccess: MatchesDataAccessService) 
	{ 

	}

	loadMatches()
	{
		this.matchesDataAccess.getMatches().subscribe(matches => 
		{
			this.allMatches = matches;
			this.refreshFilter();
		}); 
	}

	filterName(name: string)
	{
		this.nameFilter = name;
		this.refreshFilter();
	}

	private refreshFilter()
	{
		// Filter out matches based on the criteria we have cached
		this.filteredMatches = this.allMatches.filter(match =>
		{
			if (this.nameFilter != null && this.nameFilter != '')
			{
				return match.BlackTeamCaptain.includes(this.nameFilter) || match.BlackTeamPlayer.includes(this.nameFilter) ||
					match.YellowTeamCaptain.includes(this.nameFilter) || match.YellowTeamPlayer.includes(this.nameFilter);
			}
			else
			{
				return true;
			}
		});
	}
}
