import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Match } from '../models/match';
import { Game } from '../models/game';
import { Stats } from '../models/stats'
import { Observable } from 'rxjs/Rx';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

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
	
	getMatches(): Observable<Match[]>
	{
		const url = `${this.statsUrl}/matches/all`;
		return this.http.get<Match[]>(url)
		.pipe(
			catchError(this.handleError('getMatches', []))
		);
	}

	getGame(matchId: number): Observable<Game[]>
	{
		const url = `${this.statsUrl}/games/match/${matchId}`;
		return this.http.get<Game[]>(url)
		.pipe(
			catchError(this.handleError('getGame', []))
		);
	}

	getPlayerStats(playerName: string): Observable<Stats>
	{
		const url = `${this.statsUrl}/players/${playerName}/matchstats`;
		return this.http.get<Stats>(url)
		.pipe(
			catchError(this.handleError('getPlayerStats', null))
		);
	}

	getTeamStats(playerOne: string, playerTwo: string): Observable<Stats>
	{
		const url = `${this.statsUrl}/players/team/${playerOne}/${playerTwo}`;
		return this.http.get<Stats>(url)
		.pipe(
			catchError(this.handleError('getTeamStats', null))
		);
	}

	private handleError<T> (operation = 'operation', result?: T) 
	{
		return (error: any): Observable<T> => {
	  
		  console.error(error);
	  
		  // Let the app keep running by returning an empty result.
		  return of(result as T);
		};
	}
}
