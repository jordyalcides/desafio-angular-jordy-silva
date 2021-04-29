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
        const result = response.data.results
        this.characters = result.filter(character => {
          return character.thumbnail?.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
            ? false
            : true
        })
      })
  }

  ngOnInit(): void {
  }

}
