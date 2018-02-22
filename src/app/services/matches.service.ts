import { Injectable } from '@angular/core';
import { Match } from '../models/match';
import { MatchesDataAccessService } from './matches-data-access.service'
import { NameService } from './name.service'

@Injectable()
export class MatchesService 
{
	allMatches: Match[];
	filteredMatches: Match[];

	private nameFilter: string;

	constructor(private matchesDataAccess: MatchesDataAccessService, private nameService: NameService) 
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
				return this.checkName(match.BlackTeamCaptain, this.nameFilter) || 
					this.checkName(match.BlackTeamPlayer, this.nameFilter) ||
					this.checkName(match.YellowTeamCaptain, this.nameFilter) || 
					this.checkName(match.YellowTeamPlayer, this.nameFilter);
			}
			else
			{
				return true;
			}
		});
	}

	private checkName(username: string, search: string): boolean
	{
		return this.nameService.name(username).toLowerCase().includes(search)
	}
}
