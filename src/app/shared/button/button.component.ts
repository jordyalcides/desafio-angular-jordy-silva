import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'marvel-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges {

  @Input() button: Button = {
    name: '',
    link: {
      type: '',
      url: ''
    }
  }
  href: string = ''
  path: string = ''

  constructor() { }

  ngOnChanges(): void {
    if (this.button.link.type === 'external') this.href = this.button.link.url!
    else this.path = this.button.link.url!
  }

}
