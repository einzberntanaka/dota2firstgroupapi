import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './app.routing';
import { HomeModule } from './component/home/home.module';
import { DraftModule } from './component/draft/draft.module';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HomeModule,
    DraftModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
