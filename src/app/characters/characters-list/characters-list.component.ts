import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../shared/character.service';

@Component({
  selector: 'marvel-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  allCharacters: Character[] = []
  characters: Character[] = []

  constructor(CharacterService: CharacterService) {
    CharacterService
      .fetchCharacters()
      .subscribe(response => {
        this.allCharacters = response.data.results
        this.characters = this.allCharacters.map(character => {
          if (character.thumbnail?.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
            || character.thumbnail?.path === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708') {
            const thumbnail: Image = {
              path: 'assets/img/media-no-img',
              extension: 'jpg'
            }
            const characterFiltered = {
              ...character,
              thumbnail
            }
            return characterFiltered
          }
          return character
        })
      })
  }

  ngOnInit(): void {
  }

}
