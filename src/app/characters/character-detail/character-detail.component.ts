import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../shared/character.service';

@Component({
  selector: 'marvel-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  character: Character = {}
  comic: Comic = {}
  comicButton: Button = {
    name: 'See this Comic',
    link: {
      type: 'internal',
      url: ''
    }
  }

  constructor(
    private Activatedroute: ActivatedRoute,
    private Router: Router,
    private CharacterService: CharacterService
  ) {
    const id = this.Activatedroute.snapshot.paramMap.get("id")!

    CharacterService
      .fetchCharacter(id)
      .subscribe(response => {
        if (response.status !== 'Ok') this.Router.navigateByUrl('/')
        const okResponse = response as CharacterDataWrapper
        this.character = okResponse.data.results[0]
      })
    CharacterService
      .fetchCharacterComics(id)
      .subscribe(response => {
        if (response.status !== 'Ok') this.Router.navigateByUrl('/')
        const okResponse = response as ComicDataWrapper
        let bestComic = [0, 0]
        okResponse.data.results.forEach((comic, comicIndex) => {
          comic.prices?.forEach(priceItem => {
            bestComic = bestComic[0] < priceItem.price!
              ? [priceItem.price!, comicIndex]
              : bestComic
          })
        })
        this.comic = okResponse.data.results[bestComic[1]]
        this.comicButton.link.url = `/comics/${this.comic.id}`
      })
  }

  ngOnInit(): void {
  }

}
