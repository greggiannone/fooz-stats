import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Match } from '../models/match';
import { Game } from '../models/game';
import { Observable } from 'rxjs/Rx';
import { map, tap } from 'rxjs/operators';

const httpOptions = 
{
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MatchesDataAccessService 
{
	private statsUrl = 'http://ONE-022661:3000'
	constructor(private http: HttpClient) 
	{
		
	}

	getMatch(id: number): Observable<Match>
	{
		const url = `${this.statsUrl}/matches/id/${id}`;
		return this.http.get<Match>(url);
	}

	getMatches(): Observable<Match[]>
	{
		const url = `${this.statsUrl}/matches/all`;
		return this.http.get<Match[]>(url);
	}

	getGame(matchId: number): Observable<Game[]>
	{
		const url = `${this.statsUrl}/games/match/${matchId}`;
		return this.http.get<Game[]>(url);
	}
}
