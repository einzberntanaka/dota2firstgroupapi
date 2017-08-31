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
    listInitHeroDraft: any[] = []

    availableStrHeroes: any[] = [];
    availableAgiHeroes: any[] = [];
    availableIntHeroes: any[] = []

    draggedHeroes: any;
    pickingHeroesList: any[] = ['','','','',''];

    searchingHeroesText: string = '';
    availableCounterHeroes: any[] = [];

    constructor (private Dota2Service: Dota2Service, private DraftService: DraftService){}

    ngOnInit(){
        Promise.all([this.initializeHeroList(), this.initializeHeroTypeList(), this.getHeroDraftList()]).then(values => {
            this.listInitHeroes.forEach(item => {
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
    private initializeHeroList(){
        return this.Dota2Service.getHeroes().toPromise()
            .then((data: any) => {
                data.rows.map(item => {
                    return {
                        hero_id: item.id,
                        hero_name: item.localized_name,
                        hero_img: 'http://cdn.dota2.com/apps/dota2/images/heroes/'+item.name.replace('npc_dota_hero_','')+'_sb.png',
                        hero_large_img: 'http://cdn.dota2.com/apps/dota2/images/heroes/'+item.name.replace('npc_dota_hero_','')+'_hphover.png',
                        isSearchingResult: true
                    }
                }).forEach(item => this.listInitHeroes.push(item));
            })
            .catch(err => {});
    }
    private initializeHeroTypeList(){
        return this.Dota2Service.getListHeroesType().toPromise().then((data: any) => {
                this.listInitHeroType = data;
            })
            .catch(err => {});
    }
    private getHeroDraftList(){
        return this.Dota2Service.getListHeroesDraft().toPromise().then((data: any) => {
                this.listInitHeroDraft = data;
            })
        .catch(err => {});
    }
    private updateCounterHeroes(){
        let listDraftByPickingHeroes: any[] = [];
        this.listInitHeroDraft.forEach(item => {
            if(this.pickingHeroesList.filter(i => i.hero_id == item.hero_id).length === 1){
                listDraftByPickingHeroes.push(item);
            }
        })
        listDraftByPickingHeroes.forEach((item, index) => {
            item.counter_heroes.forEach(i => {
                if(this.availableCounterHeroes.length === 0 || this.availableCounterHeroes.filter(i => i == item.hero_id).length == 0){
                    let hero = this.listInitHeroes.find(p => p.hero_id === i);
                    this.availableCounterHeroes.push({
                        hero_id: hero.hero_id,
                        hero_name: hero.hero_name,
                        hero_img: hero.hero_img,
                        hero_large_img: hero.hero_large_img,
                        point: 0, 
                    });
                }
                else {
                    console.log(this.availableCounterHeroes[index]);
                    //this.availableCounterHeroes[index].popular++;
                }
         
            })
           
        })
        console.log(this.availableCounterHeroes);

    }
    dragStart(event, hero: any) {
        this.draggedHeroes = hero;
    }
    dragEnd(event) {
        this.draggedHeroes = null;
    }
    drop(event) {
        this.availableCounterHeroes = [];
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
        this.updateCounterHeroes();
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
    findHeroesByText(){
        this.availableStrHeroes.forEach((item, index) =>  {
            if(item.hero_name.toLowerCase().includes(this.searchingHeroesText.toLowerCase())){
                this.availableStrHeroes[index].isSearchingResult = true;
            } else {
                this.availableStrHeroes[index].isSearchingResult = false;
            }
        })
        this.availableAgiHeroes.forEach((item, index) =>  {
            if(item.hero_name.toLowerCase().includes(this.searchingHeroesText.toLowerCase())){
                this.availableAgiHeroes[index].isSearchingResult = true;
            } else {
                this.availableAgiHeroes[index].isSearchingResult = false;
            }
        })
        this.availableIntHeroes.forEach((item, index) =>  {
            if(item.hero_name.toLowerCase().includes(this.searchingHeroesText.toLowerCase())){
                this.availableIntHeroes[index].isSearchingResult = true;
            } else {
                this.availableIntHeroes[index].isSearchingResult = false;
            }
        })
    }
    resetSearchingResult(){
        this.searchingHeroesText = '';
        this.findHeroesByText();
    }
}