import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { MatchComponent } from './match/match.component';
import { MatchesDataAccessService } from './services/matches-data-access.service';
import { MatchesService } from './services/matches.service';
import { NameService } from './services/name.service';
import { MatchListComponent } from './match-list/match-list.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { SmallStatView } from './small-stat-view/small-stat-view.component';
import { MatchStatsComponent } from './match-stats/match-stats.component';

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        MatchComponent,
        MatchListComponent,
        FilterBarComponent,
        SmallStatView,
        MatchStatsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        MatchesDataAccessService,
        NameService,
        MatchesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
