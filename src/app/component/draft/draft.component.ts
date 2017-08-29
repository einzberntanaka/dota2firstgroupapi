import { Component, OnInit } from '@angular/core';
import { Dota2Service } from '../../shared/services/dota2.service';
import { DraftService } from '../../shared/services/draft.service';

@Component({
    templateUrl: 'draft.component.html',
    styleUrls: ['draft.component.css']
})

export class DraftComponent {
    
    listInitHeroes:  any[] = [];

    availableHeroes: any[] = [];
    selectedHeroes: any[] = [];
    draggedHeroes: any;
    
    constructor (private Dota2Service: Dota2Service, private DraftService: DraftService){
        this.listInitHeroes = Dota2Service.heroInfoList;
        this.availableHeroes = Dota2Service.heroInfoList;
    }

    ngOnInit(){
        
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