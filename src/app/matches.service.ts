import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Match } from './models/match';
import { Game } from './models/game';
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
		return this.http.get<Match>(url);
	}

	getGame(matchId: number): Observable<Game[]>
	{
		const url = `${this.statsUrl}/games/match/${matchId}`;
		return this.http.get<Game[]>(url);
	}
}
