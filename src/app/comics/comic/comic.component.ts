import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'marvel-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss']
})
export class ComicComponent implements OnInit {

  @Input() title: string = ''
  @Input() img: string = ''
  @Input() url: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
