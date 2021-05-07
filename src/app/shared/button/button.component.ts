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
  isInternalRoute: Boolean = false

  constructor() { }

  ngOnChanges(): void {
    if (this.button.link.type === 'internal') this.isInternalRoute = true
  }

}
