import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CharacterComponent } from "./character/character.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		CharacterComponent
	],
	exports: [
		CharacterComponent
	]
})

export class CharactersModule { }