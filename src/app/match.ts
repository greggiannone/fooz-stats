import { Game } from './game';

export class Match
{
    id: number;
    yellowScore: number;
    blackScore: number;
    yellowTeamPlayers: string[];
    blackTeamPlayers: string[];
    season: number;
    games: Game[];
}