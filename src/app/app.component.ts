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
      url: '/characters'
    },
    {
      name: 'Comics',
      url: '/comics'
    }
  ]

  constructor() {
  }
}
