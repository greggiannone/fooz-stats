import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../models/player';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

	@Input() player: Player;

	constructor(private nameService:NameService) { }

	ngOnInit() 
	{
	}

}
