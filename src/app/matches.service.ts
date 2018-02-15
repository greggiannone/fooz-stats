import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Match } from './match';
import { Observable } from 'rxjs/Rx';
import { map, tap } from 'rxjs/operators';

const httpOptions = 
{
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MatchesService 
{
	private statsUrl = 'http://ONE-022661:3000'
	constructor(private http: HttpClient) 
	{
		
	}

	getMatch(id: number): Observable<Match>
	{
		const url = `${this.statsUrl}/matches/2018/${id}`;
		console.log(url);
		return this.http.get<Match>(url)
			.pipe(
				map(matches => 
					{
						var match = matches[0];
						var matchNew: Match =
						{
							id: match.MatchId,
							yellowScore: match.YellowTeamScore,
							blackScore: match.BlackTeamScore,
							yellowTeamPlayers: [match.YellowTeamCaptain, match.YellowTeamPlayer],
							blackTeamPlayers: [match.BlackTeamCaptain, match.BlackTeamPlayer],
							season: match.Season,
							games: []
						};
						return matchNew;
					}),
				tap(m => {
					const outcome = m ? 'fetches': 'did not find';
					console.log(`${outcome} match id=${id}`);
				}));
	}
}
