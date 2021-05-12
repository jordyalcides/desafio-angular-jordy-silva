import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../shared/character.service';

@Component({
  selector: 'marvel-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  imageNotFound: Image[] = [
    {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
    },
    {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708'
    }
  ]

  defaultImage: Image = {
    path: 'assets/img/media-no-img',
    extension: 'jpg'
  }
  character: Character = {}
  comic: Comic = {}
  comicButton: Button = {
    name: 'See this Comic',
    link: {
      type: 'internal',
      url: ''
    }
  }
  hasFailedConnection: boolean = false
  error: any

  constructor(
    private Activatedroute: ActivatedRoute,
    private Router: Router,
    private CharacterService: CharacterService
  ) {
    const id = this.Activatedroute.snapshot.params.id as number

    CharacterService
      .fetchCharacter(id)
      .subscribe(
        response => {
          this.character = response.data.results[0]

          this.character.thumbnail =
            this.imageNotFound.some(image => {
              return this.character.thumbnail?.path === image.path
            })
              ? this.defaultImage
              : this.character.thumbnail
        },
        error => {
          this.error = error as HttpErrorResponse
          this.hasFailedConnection = true
        })
    CharacterService
      .fetchCharacterComics(id)
      .subscribe(
        response => {
          let bestComic = [0, 0]
          response.data.results.forEach((comic, comicIndex) => {
            comic.prices?.forEach(priceItem => {
              bestComic = bestComic[0] < priceItem.price!
                ? [priceItem.price!, comicIndex]
                : bestComic
            })
          })
          this.comic = response.data.results[bestComic[1]]
          this.comicButton.link.url = `/comics/${this.comic.id}`
        },
        error => {
          this.comic.thumbnail = {
            path: 'assets/img/media-no-img',
            extension: 'jpg'
          }
        })
  }

  ngOnInit(): void {
  }

}
