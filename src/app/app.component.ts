import { Component, OnInit } from '@angular/core';
import { Match } from "./models/match";
import { MatchesService } from "./matches.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fooz-stats';

  match: Match;

  constructor(private matchesService:MatchesService)
  {

  }

  ngOnInit()
  {
    this.matchesService.getMatch(5).subscribe(match => 
      {
        this.match = match;
      });
  }
}
