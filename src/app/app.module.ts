import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './app.routing';
import { HomeModule } from './component/home/home.modules';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    HomeModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
