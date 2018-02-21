import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { MatchComponent } from './match/match.component';
import { MatchesService } from './services/matches.service';
import { NameService } from './services/name.service';

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        MatchComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        MatchesService,
        NameService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
