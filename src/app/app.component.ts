import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterService } from './characters/character/character.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Marvel Heroes'
  characters: Character[] = []

  constructor(CharacterService: CharacterService) {

    CharacterService
      .fetchCharacters()
      .subscribe(response => {
        this.characters = response.data.results
      })
    // .subscribe(response => {
    //   console.log(response)

    //   // this.heroes = response
    // })
  }
}
