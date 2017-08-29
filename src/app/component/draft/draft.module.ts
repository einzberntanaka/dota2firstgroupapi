import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../shared/modules/common.module';
import { DraftComponent } from './draft.component';
import { Dota2Service } from '../../shared/services/dota2.service';
import { DraftService } from '../../shared/services/draft.service';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { DragDropModule } from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        DataTableModule,
        SharedModule,
        DragDropModule
    ],
    declarations:[
        DraftComponent
    ],
    providers:[
        Dota2Service,
        DraftService
    ]
})

export class DraftModule {}