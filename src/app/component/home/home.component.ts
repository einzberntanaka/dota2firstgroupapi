import { Component, OnInit } from '@angular/core';
import { Dota2Service } from '../../shared/services/dota2.service';
import { DraftService } from '../../shared/services/draft.service';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    matchList: any[] = [];
    draftList: any[] = [];
    constructor(private Dota2Service: Dota2Service, private DraftService: DraftService){
    }
    ngOnInit() {
        this.getTopMatches();

        console.log(this.DraftService.draftList);
    }
    getTopMatches(){
        this.Dota2Service.getTopMatches().subscribe(data => {
            data.rows.map(item => {
                return {
                    account_id: item.account_id,
                    match_id: item.match_id,
                    hero_id: item.hero_id,
                    hero_name: this.Dota2Service.getHeroNameById(item.hero_id),
                    leaguename: item.leaguename,
                    win: item.win,
                    start_time: item.start_time,
                    hero_img: this.Dota2Service.getHeroImageById(item.hero_id)
                }
            }).forEach(item => this.matchList.push(item));
        })
    }
}