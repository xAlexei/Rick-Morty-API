import { Component, OnInit } from '@angular/core';
import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { type } from 'os';


import { filter, take } from 'rxjs/operators';

 type RequestInfo = {
  next: string;
};

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];

  info RequestInfo = {
    next: null,
  };

  private pageNum = 1;
  private query: string;
  private hideScrollHeight = 200;
  private showScrillHeigth = 500;


  constructor(private characterSvc: CharacterService) { }

  ngOnInit(): void {
  }

  private getDataFromService(){
    this.characterSvc.searchCharacters(this.query, this.pageNum)
    .pipe(
      take(1)
    ).subscribe((res: any)=>{
      const { info, results } = res;
      this.characters = [... this.characters, ... results];
      this.info = info;
    });
  }

}
