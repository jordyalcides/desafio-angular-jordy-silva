import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'marvel-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input() name: string = ''
  @Input() img: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
