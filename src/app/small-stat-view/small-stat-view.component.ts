import { Component, OnInit, Input } from '@angular/core';
import { Stats } from '../models/stats';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-small-stat-view',
  templateUrl: './small-stat-view.component.html',
  styleUrls: ['./small-stat-view.component.css']
})
export class SmallStatView implements OnInit {

	@Input() stats: Stats

	constructor(private nameService:NameService) { }

	ngOnInit() 
	{
	}

}
