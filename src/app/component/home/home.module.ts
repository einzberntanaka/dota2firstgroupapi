import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../shared/modules/common.module';
import { HomeComponent } from './home.component';
import { IntroComponent } from './intro/intro.component';
import { MatchesListComponent } from '../shared/matches/matcheslist.component';

import { Dota2Service } from '../../shared/services/dota2.service';
import { DraftService } from '../../shared/services/draft.service';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule
    ],
    declarations:[
        HomeComponent,
        IntroComponent,
        MatchesListComponent
    ],
    providers:[
        Dota2Service,
        DraftService
    ]
})

export class HomeModule {}