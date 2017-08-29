import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()

export class Dota2Service {
    private baseUrl: string;
    private topMatchesQuery: string;
    private listHeroesQuery: string;
    public heroInfoList: any[] = [];
    //todos$: FirebaseListObservable<any[]>;

    constructor(private http: Http/*, private af: AngularFireDatabase*/) {
        this.baseUrl = 'https://api.opendota.com/api/explorer?sql=';
        this.topMatchesQuery = `SELECT
                                matches.match_id,
                                matches.start_time,
                                ((player_matches.player_slot < 128) = matches.radiant_win) win,
                                player_matches.hero_id,
                                player_matches.account_id,
                                leagues.name leaguename
                                FROM matches
                                JOIN match_patch using(match_id)
                                JOIN leagues using(leagueid)
                                JOIN player_matches using(match_id)
                                JOIN heroes on heroes.id = player_matches.hero_id
                                LEFT JOIN notable_players ON notable_players.account_id = player_matches.account_id AND notable_players.locked_until = (SELECT MAX(locked_until) FROM notable_players)
                                LEFT JOIN teams using(team_id)
                                WHERE TRUE
                                ORDER BY matches.match_id DESC NULLS LAST
                                LIMIT 200`;
       this.listHeroesQuery = 'SELECT * FROM heroes';
       
        this.getHeroes().subscribe(data => {
            data.rows.map(item => {
                return {
                    hero_id: item.id,
                    hero_name: item.localized_name,
                    hero_img: 'http://cdn.dota2.com/apps/dota2/images/heroes/'+item.name.replace('npc_dota_hero_','')+'_sb.png'
                }
            }).forEach(item => this.heroInfoList.push(item));
        })
    }
    getTopMatches(){
        return this.http.get(this.baseUrl+this.topMatchesQuery)
            .map((res:Response) => res.json());
    }
    private getHeroes(): Observable<any> {
        return this.http.get(this.baseUrl+this.listHeroesQuery)
            .map((res:Response) => res.json())
    }
    /*getHeroes(): Observable<any> {
         return this.http.get("/assets/data/heroes.json")
                         .map((res:any) => res.json());

    }*/
    getHeroImageById(id: string){
        if(this.heroInfoList.filter(x => x.hero_id == id)[0] !== 'undefined')
            return this.heroInfoList.filter(x => x.hero_id == id)[0].hero_img;
        return null;
    }
    getHeroNameById(id: string){
        if(this.heroInfoList.filter(x => x.hero_id == id)[0] !== 'undefined')
            return this.heroInfoList.filter(x => x.hero_id == id)[0].hero_name;
        return null;
    }
    /*getListHeroes(){
        return this.todos$ = this.af.list('/todos', {
            query: {
                limitToFirst: 200
            }
        });
    }*/
}