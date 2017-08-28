import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from './component/home/home.component';

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
        path: '**',
        component: HomeComponent
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
