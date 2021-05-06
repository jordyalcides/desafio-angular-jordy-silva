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
  buyButton: Button = {
    name: '',
    link: {
      type: 'external',
      url: ''
    }
  }

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
        let pricey = 0
        response.data.results[0].prices?.forEach(priceItem => {
          pricey = pricey < priceItem.price!
            ? priceItem.price!
            : pricey
        })
        const url = response.data.results[0].urls?.find(Url => Url.type === 'detail')?.url!
        this.buyButton = {
          name: `Buy it now for ${pricey}`,
          link: {
            type: 'external',
            url: url
          }
        }
      })
  }

  ngOnInit(): void {
  }

}
