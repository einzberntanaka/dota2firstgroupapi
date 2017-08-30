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
                if(this.listInitHeroType[0].includes(item.hero_id)){
                    item.hero_type="agi";
                    this.availableAgiHeroes.push(item);
                }
                if(this.listInitHeroType[1].includes(item.hero_id)){
                    item.hero_type="int";
                    this.availableIntHeroes.push(item);
                }
                if(this.listInitHeroType[2].includes(item.hero_id)){
                    item.hero_type="str";
                    this.availableStrHeroes.push(item);
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
                        hero_img: 'http://cdn.dota2.com/apps/dota2/images/heroes/'+item.name.replace('npc_dota_hero_','')+'_sb.png',
                        hero_large_img: 'http://cdn.dota2.com/apps/dota2/images/heroes/'+item.name.replace('npc_dota_hero_','')+'_hphover.png'
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
    dragStart(event, hero: any) {
        this.draggedHeroes = hero;
    }
    dragEnd(event) {
        this.draggedHeroes = null;
    }
    drop(event) {
        if(this.draggedHeroes) {
            if(this.pickingHeroesList[event.target.id]!=''){
                this.returnHeroToPool(this.pickingHeroesList[event.target.id]);
            }
            this.pickingHeroesList[event.target.id] = this.draggedHeroes;
            this.availableStrHeroes = this.availableStrHeroes.filter(item => item != this.draggedHeroes);
            this.availableAgiHeroes = this.availableAgiHeroes.filter(item => item != this.draggedHeroes);
            this.availableIntHeroes = this.availableIntHeroes.filter(item => item != this.draggedHeroes);
            this.draggedHeroes = null;
        }
    }
    removeHeroFromPickingList(event, hero: any){
        let index = event.target.parentElement.id;
        this.pickingHeroesList[index] = '';
        if(hero.hero_type === 'str'){
            this.availableStrHeroes.push(hero);
        }
        if(hero.hero_type === 'agi'){
            this.availableAgiHeroes.push(hero);
        }
        if(hero.hero_type === 'int'){
            this.availableIntHeroes.push(hero);
        }
    }
    returnHeroToPool(hero){
        if(hero.hero_type === 'str'){
            this.availableStrHeroes.push(hero);
        }
        if(hero.hero_type === 'agi'){
            this.availableAgiHeroes.push(hero);
        }
        if(hero.hero_type === 'int'){
            this.availableIntHeroes.push(hero);
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