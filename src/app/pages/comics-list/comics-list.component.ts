import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/comics/comic/comic.service';

@Component({
  selector: 'marvel-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent implements OnInit {

  comics: Comic[] = []

  constructor(ComicService: ComicService) {
    ComicService
      .fetchComics()
      .subscribe(response => {
        this.comics = response.data.results.filter(character => {
          return character.thumbnail?.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
            ? false
            : true
        })
      })
  }

  ngOnInit(): void {
  }

}
