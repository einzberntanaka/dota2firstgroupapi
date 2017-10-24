import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from './component/home/home.component';
import { DraftComponent } from './component/draft/draft.component';
import { TestComponent } from './component/test/test.component';

const MainRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'draft',
        component: DraftComponent
    },
    {
        path: 'test',
        component: TestComponent
    }
]

@NgModule({
    imports:[
        RouterModule.forRoot(MainRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class MainRoutingModule {}
