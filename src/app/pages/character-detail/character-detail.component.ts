import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../characters/character/character.service'

@Component({
  selector: 'marvel-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  character: Character = {}

  constructor(
    private _Activatedroute: ActivatedRoute,
    private CharacterService: CharacterService
  ) {

    const id = this._Activatedroute.snapshot.paramMap.get("id")!

    CharacterService
      .fetchCharacter(id)
      .subscribe(response => {
        this.character = response.data.results[0]
      })
  }

  ngOnInit(): void {
  }

}
