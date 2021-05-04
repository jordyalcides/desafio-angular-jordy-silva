import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../shared/character.service';

@Component({
  selector: 'marvel-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  character: Character = {}
  comic: Comic = {}

  constructor(
    private Activatedroute: ActivatedRoute,
    private CharacterService: CharacterService
  ) {
    const id = this.Activatedroute.snapshot.paramMap.get("id")!

    CharacterService
      .fetchCharacter(id)
      .subscribe(response => {
        this.character = response.data.results[0]
      })
    CharacterService
      .fetchCharacterComics(id)
      .subscribe(response => {
        let bestComic = [0, 0]
        response.data.results.forEach((comic, comicIndex) => {
          comic.prices?.forEach(price => {
            bestComic = bestComic[0] < price.price!
              ? [price.price!, comicIndex]
              : bestComic
          })
        })
        this.comic = response.data.results[bestComic[1]]
      })
  }

  ngOnInit(): void {
  }

}
