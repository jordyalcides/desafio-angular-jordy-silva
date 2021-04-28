import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../characters/character/character.service'

@Component({
  selector: 'marvel-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  characters: Character[] = []

  constructor(CharacterService: CharacterService) {
    CharacterService
      .fetchCharacters()
      .subscribe(response => {
        this.characters = response.data.results
      })
  }

  ngOnInit(): void {
  }

}
