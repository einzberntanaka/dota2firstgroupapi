import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { IntroComponent } from './intro/intro.component';
import { MatchesListComponent } from '../shared/matches/matcheslist.component';

import { Dota2Service } from '../../shared/services/dota2.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations:[
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        NavbarComponent,
        IntroComponent,
        MatchesListComponent
    ],
    providers:[
        Dota2Service
    ]
})

export class HomeModule {}