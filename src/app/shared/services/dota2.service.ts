import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class Dota2Service {
    private baseUrl: string;
    private topMatchesQuery: string;

    constructor(private http: Http) {
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
    }
    getTopMatches(){
        console.log('Get list of matches');
        return this.http.get(this.baseUrl+this.topMatchesQuery)
            .map((res:Response) => res.json());
    }
}