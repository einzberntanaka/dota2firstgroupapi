import { Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()

export class DraftService {
    public draftList: any[] = [];
    draft$: FirebaseListObservable<any[]>;

    constructor(private http: Http, private db: AngularFireDatabase) {
        this.db.list('/HeroDraft').subscribe(data => {
            data.map(item => {
                return {
                    hero_id: item.hero_id,
                    counter_heroes: item.counter_heroes,
                    allied_heroes: item.allied_heroes,
                }
            }).forEach(item => this.draftList.push(item));
        })
    }
    getCounterHeroesByHeroId(id: string){
        if(this.draftList.filter(x => x.hero_id == id)[0] !== 'undefined')
            return this.draftList.filter(x => x.hero_id == id)[0].counter_heroes;
    }
    getAlliedHeroesByHeroId(id: string){
        if(this.draftList.filter(x => x.hero_id == id)[0] !== 'undefined')
            return this.draftList.filter(x => x.hero_id == id)[0].allied_heroes;
    }
}