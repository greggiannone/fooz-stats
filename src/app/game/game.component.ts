import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../models/game';
import { Match } from '../models/match';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

	@Input() game: Game;
	@Input() match: Match;
	players = {};

	constructor(private nameService:NameService) { }

	ngOnInit() 
	{
		this.createPlayersObject();
  	}

	private createPlayersObject()
	{
		var blackBack, yellowBack, blackFront, yellowFront;
		if (this.game.BlackCaptainPosition == "back")
		{
			blackBack = this.match.BlackTeamCaptain;
			blackFront = this.match.BlackTeamPlayer
		}
		else if (this.game.BlackCaptainPosition == "front")
		{
			blackBack = this.match.BlackTeamPlayer;
			blackFront = this.match.BlackTeamCaptain;
		}

		if (this.game.YellowCaptainPosition == "back")
		{
			yellowBack = this.match.YellowTeamCaptain;
			yellowFront = this.match.YellowTeamPlayer
		}
		else if (this.game.YellowCaptainPosition == "front")
		{
			yellowBack = this.match.YellowTeamPlayer;
			yellowFront = this.match.YellowTeamCaptain;
		}

		this.players = 
		{
			blackBack: this.nameService.name(blackBack),
			yellowBack: this.nameService.name(yellowBack),
			blackFront: this.nameService.name(blackFront),
			yellowFront: this.nameService.name(yellowFront)
		};
	}

}
