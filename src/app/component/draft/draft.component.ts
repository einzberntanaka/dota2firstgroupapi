import { Component, OnInit } from '@angular/core';
import { Dota2Service } from '../../shared/services/dota2.service';
import { DraftService } from '../../shared/services/draft.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: 'draft.component.html',
    styleUrls: ['draft.component.css']
})

export class DraftComponent implements OnInit{
    
    listInitHeroes:  any[] = [];
    listInitHeroType: any[] = [];

    availableStrHeroes: any[] = [];
    availableAgiHeroes: any[] = [];
    availableIntHeroes: any[] = []

    availableHeroes: any[] = [];
    selectedHeroes: any[] = [];
    draggedHeroes: any;

    pickingHeroesList: any[] = ['','','','',''];

    constructor (private Dota2Service: Dota2Service, private DraftService: DraftService){}

    ngOnInit(){
        Promise.all([this.InitializeHeroList(), this.InitializeHeroTypeList()]).then(values => { 
            this.availableHeroes.forEach(item => {
                console.log(item);
                if(this.listInitHeroType[0].includes(item.hero_id)){
                    this.availableStrHeroes.push(item);
                }
                if(this.listInitHeroType[1].includes(item.hero_id)){
                    this.availableAgiHeroes.push(item);
                }
                if(this.listInitHeroType[2].includes(item.hero_id)){
                    this.availableIntHeroes.push(item);
                }
            })
        }).catch(reason => { 
                
        });
    }
    private InitializeHeroList(){
        return this.Dota2Service.getHeroes().toPromise()
            .then((data: any) => {
                data.rows.map(item => {
                    return {
                        hero_id: item.id,
                        hero_name: item.localized_name,
                        hero_img: 'http://cdn.dota2.com/apps/dota2/images/heroes/'+item.name.replace('npc_dota_hero_','')+'_sb.png'
                    }
                }).forEach(item => this.availableHeroes.push(item));
            })
            .catch(err => {});
    }
    private InitializeHeroTypeList(){
        return this.Dota2Service.getListHeroesType().toPromise().then((data: any) => {
                this.listInitHeroType = data;
            })
            .catch(err => {});
    }




    testDrag(){
        console.log('drag');
    }
    dragStart(event, hero: any) {
        console.log('drag start');
        this.draggedHeroes = hero;
    }

    dragEnd(event) {
        console.log('drag end');
        this.draggedHeroes = null;
    }
    drop(event) {
        console.log('drag drop');
        if(this.draggedHeroes) {
            let draggedHeroesIndex = this.findIndex(this.draggedHeroes);
            this.selectedHeroes = [...this.selectedHeroes, this.draggedHeroes];
            this.availableHeroes = this.availableHeroes.filter((val,i) => i!=draggedHeroesIndex);
            this.draggedHeroes = null;
        }
    }
    findIndex(hero: any) {
        let index = -1;
        for(let i = 0; i < this.availableHeroes.length; i++) {
            if(hero.hero_id === this.availableHeroes[i].hero_id) {
                index = i;
                break;
            }
        }
        return index;
    }
}