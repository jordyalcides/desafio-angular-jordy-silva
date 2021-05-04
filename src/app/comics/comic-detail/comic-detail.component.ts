import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../shared/comic.service';

@Component({
  selector: 'marvel-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss']
})
export class ComicDetailComponent implements OnInit {

  comic: Comic = {}
  characters: CharacterSummary[] = []
  price: number = 0

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private ComicService: ComicService
  ) {
    const id = this.ActivatedRoute.snapshot.paramMap.get("id")!

    ComicService
      .fetchComic(id)
      .subscribe(response => {
        this.comic = response.data.results[0]
        this.characters = response.data.results[0].characters?.items!
        this.price = response.data.results[0].prices?.find(() => true)?.price!
      })
  }

  ngOnInit(): void {
  }

}
