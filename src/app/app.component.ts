import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  headerButtons = [
    {
      name: 'Characters',
      link: {
        type: 'internal',
        url: '/characters'
      }
    },
    {
      name: 'Comics',
      link: {
        type: 'internal',
        url: '/comics'
      }
    }
  ]

  constructor() {
  }
}
