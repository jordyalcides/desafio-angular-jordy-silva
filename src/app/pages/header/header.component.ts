import { Component, Input } from "@angular/core";

interface headerButton {
	name: string,
	url: string
}

@Component({
	selector: 'marvel-header',
	templateUrl: 'header.component.html',
	styleUrls: ['header.component.scss']
})

export class HeaderComponent {
	homeimg = 'assets/svg/marvel.svg'
	@Input() buttons: Array<headerButton> = []
}