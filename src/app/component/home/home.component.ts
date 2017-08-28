import { Component, OnInit } from '@angular/core';
import { Dota2Service } from '../../shared/services/dota2.service';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    matchList: any[] = [];
    constructor(private Dota2Service: Dota2Service){

    }
    ngOnInit() {
        this.getTopMatches();
    }
    getTopMatches(){
        this.Dota2Service.getTopMatches().subscribe(data => {
            data.rows.map(item => {
                return {
                    account_id: item.account_id,
                    match_id: item.match_id,
                    hero_id: item.hero_id,
                    leaguename: item.leaguename,
                    win: item.win,
                    start_time: item.start_time
                }
            }).forEach(item => this.matchList.push(item));
        })
    }
}